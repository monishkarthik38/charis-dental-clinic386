import { MessageCircle, CalendarPlus } from "lucide-react";

export const FloatingActions = () => (
  <div className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-40 flex flex-col gap-3">
    <a
      href="https://wa.me/919876543210?text=Hi%20Charis%20Hospital%2C%20I'd%20like%20to%20book%20an%20appointment."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp us"
      className="h-14 w-14 rounded-full grid place-items-center text-white shadow-elegant hover:scale-105 transition-transform"
      style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
    <a
      href="#appointment"
      aria-label="Book appointment"
      className="h-14 w-14 rounded-full grid place-items-center bg-primary-gradient text-primary-foreground shadow-elegant hover:scale-105 transition-transform"
    >
      <CalendarPlus className="h-6 w-6" />
    </a>
  </div>
);
