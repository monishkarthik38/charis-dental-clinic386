import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3.23.8';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/airtable';
const BASE_ID = 'appbJ9oAfKP6UYaqB';
const TABLE_ID = 'tblDxZOSAoMFSJK7J';

const BodySchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^[+\d\s-]{7,15}$/),
  email: z.string().trim().email().max(120),
  date: z.string().min(1).max(20),
  department: z.string().min(1).max(80),
  message: z.string().trim().max(500).optional().default(''),
});

const getUnknownAirtableField = (data: unknown): string | null => {
  if (!data || typeof data !== 'object') return null;
  const message = (data as { error?: { message?: unknown } }).error?.message;
  if (typeof message !== 'string') return null;
  return message.match(/Unknown field name: "(.+)"/)?.[1] ?? null;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');
    const AIRTABLE_API_KEY = Deno.env.get('AIRTABLE_API_KEY');
    if (!AIRTABLE_API_KEY) throw new Error('AIRTABLE_API_KEY is not configured');

    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }
    const d = parsed.data;

    const fields: Record<string, string> = {
      Name: d.name,
      Phone: d.phone,
      Email: d.email,
      Date: d.date,
      Department: d.department,
      Message: d.message ?? '',
    };

    let data: { records?: Array<{ id?: string }> } | null = null;
    const skippedFields: string[] = [];
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const res = await fetch(`${GATEWAY_URL}/v0/${BASE_ID}/${TABLE_ID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          'X-Connection-Api-Key': AIRTABLE_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ records: [{ fields }], typecast: true }),
      });

      const responseData = await res.json();
      if (res.ok) {
        data = responseData;
        break;
      }

      const unknownField = res.status === 422 ? getUnknownAirtableField(responseData) : null;
      if (unknownField && unknownField in fields && Object.keys(fields).length > 1) {
        skippedFields.push(unknownField);
        delete fields[unknownField];
        continue;
      }

      console.error('Airtable error', res.status, responseData);
      throw new Error(`Airtable API failed [${res.status}]: ${JSON.stringify(responseData)}`);
    }

    if (!data) throw new Error('Airtable API failed: no record was created');
    if (skippedFields.length) console.warn('Skipped Airtable fields that do not exist:', skippedFields);

    // Persist to Lovable Cloud DB for the admin status page
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, serviceKey);
      const { error: dbErr } = await supabase.from('appointments').insert({
        name: d.name,
        phone: d.phone,
        email: d.email,
        preferred_date: d.date,
        department: d.department,
        message: d.message || null,
      });
      if (dbErr) console.error('DB insert failed:', dbErr);
    } catch (dbCatch) {
      console.error('DB insert exception:', dbCatch);
    }

    // Fire-and-forget Discord notification (don't block on failure)
    const DISCORD_WEBHOOK_URL = Deno.env.get('DISCORD_WEBHOOK_URL');
    if (DISCORD_WEBHOOK_URL) {
      try {
        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'Charis Dental Clinic',
            embeds: [
              {
                title: '🦷 New Appointment Request',
                color: 0x1d6fd6,
                fields: [
                  { name: '👤 Name', value: d.name, inline: true },
                  { name: '📞 Phone', value: d.phone, inline: true },
                  { name: '✉️ Email', value: d.email, inline: false },
                  { name: '📅 Preferred Date', value: d.date, inline: true },
                  { name: '🏥 Department', value: d.department, inline: true },
                  ...(d.message ? [{ name: '📝 Message', value: d.message, inline: false }] : []),
                ],
                timestamp: new Date().toISOString(),
                footer: { text: 'Charis Dental Clinic • Chennai' },
              },
            ],
          }),
        });
      } catch (notifyErr) {
        console.error('Discord notification failed:', notifyErr);
      }
    }

    return new Response(JSON.stringify({ success: true, id: data?.records?.[0]?.id, skippedFields }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('book-appointment error:', msg);
    return new Response(
      JSON.stringify({ success: false, error: 'Appointment submission failed. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
