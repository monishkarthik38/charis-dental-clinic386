import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  CalendarClock, CheckCircle2, Clock, Loader2, LogOut, Phone, Mail,
  RefreshCw, Stethoscope, XCircle,
} from "lucide-react";

type Status = "new" | "confirmed" | "completed" | "cancelled";

interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferred_date: string;
  department: string;
  message: string | null;
  status: Status;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_META: Record<Status, { label: string; color: string; icon: typeof Clock }> = {
  new:        { label: "New",        color: "bg-primary/10 text-primary border-primary/20",       icon: Clock },
  confirmed:  { label: "Confirmed",  color: "bg-info/10 text-info border-info/20",                icon: CalendarClock },
  completed:  { label: "Completed",  color: "bg-success/10 text-success border-success/20",       icon: CheckCircle2 },
  cancelled:  { label: "Cancelled",  color: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle },
};

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [tab, setTab] = useState<Status | "all">("new");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Appointments • Charis Dental Clinic";
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id);
      const ok = !!roles?.some((r) => r.role === "admin" || r.role === "staff");
      setAuthorized(ok);
      if (ok) await fetchAppointments();
      setLoading(false);
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!session) navigate("/auth", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load", description: error.message, variant: "destructive" });
      return;
    }
    setAppointments((data ?? []) as Appointment[]);
  };

  const updateStatus = async (id: string, status: Status) => {
    setUpdating(id);
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
    setUpdating(null);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    toast({ title: "Status updated", description: `Marked as ${STATUS_META[status].label}` });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  const counts = useMemo(() => {
    const c = { new: 0, confirmed: 0, completed: 0, cancelled: 0 };
    appointments.forEach((a) => { c[a.status] += 1; });
    return c;
  }, [appointments]);

  const filtered = useMemo(
    () => (tab === "all" ? appointments : appointments.filter((a) => a.status === tab)),
    [appointments, tab],
  );

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <XCircle className="h-10 w-10 mx-auto text-destructive mb-4" />
            <h2 className="font-display font-bold text-xl mb-2">Access denied</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Your account doesn't have admin or staff permissions. Ask an administrator to grant access.
            </p>
            <Button variant="outline" onClick={signOut}><LogOut className="h-4 w-4" /> Sign out</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary-gradient grid place-items-center">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-display font-bold text-sm">Charis Dashboard</div>
              <div className="text-[11px] text-muted-foreground -mt-0.5">Appointment requests</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={fetchAppointments}><RefreshCw className="h-4 w-4" /> Refresh</Button>
            <Button variant="outline" size="sm" onClick={signOut}><LogOut className="h-4 w-4" /> Sign out</Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {(Object.keys(STATUS_META) as Status[]).map((s) => {
            const Icon = STATUS_META[s].icon;
            return (
              <Card key={s} className="border-border">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">{STATUS_META[s].label}</div>
                    <div className="text-3xl font-display font-bold mt-1">{counts[s]}</div>
                  </div>
                  <div className={`h-12 w-12 rounded-xl grid place-items-center ${STATUS_META[s].color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as Status | "all")} className="w-full">
          <TabsList className="mb-6 flex-wrap h-auto">
            <TabsTrigger value="new">New ({counts.new})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({counts.confirmed})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({counts.completed})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({counts.cancelled})</TabsTrigger>
            <TabsTrigger value="all">All ({appointments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value={tab}>
            <Card>
              <CardContent className="p-0">
                {filtered.length === 0 ? (
                  <div className="p-12 text-center text-sm text-muted-foreground">No appointments in this view.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Preferred date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell>
                            <div className="font-medium">{a.name}</div>
                            {a.message && <div className="text-xs text-muted-foreground line-clamp-2 max-w-xs mt-1">{a.message}</div>}
                          </TableCell>
                          <TableCell className="text-sm">
                            <div className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-muted-foreground" />{a.phone}</div>
                            <div className="flex items-center gap-1.5 text-muted-foreground"><Mail className="h-3.5 w-3.5" />{a.email}</div>
                          </TableCell>
                          <TableCell className="text-sm">{a.department}</TableCell>
                          <TableCell className="text-sm">{new Date(a.preferred_date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={STATUS_META[a.status].color}>
                              {STATUS_META[a.status].label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-1 justify-end flex-wrap">
                              {a.status !== "confirmed" && a.status !== "completed" && (
                                <Button size="sm" variant="soft" disabled={updating === a.id} onClick={() => updateStatus(a.id, "confirmed")}>
                                  Confirm
                                </Button>
                              )}
                              {a.status !== "completed" && (
                                <Button size="sm" variant="hero" disabled={updating === a.id} onClick={() => updateStatus(a.id, "completed")}>
                                  Complete
                                </Button>
                              )}
                              {a.status !== "cancelled" && a.status !== "completed" && (
                                <Button size="sm" variant="ghost" disabled={updating === a.id} onClick={() => updateStatus(a.id, "cancelled")}>
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
