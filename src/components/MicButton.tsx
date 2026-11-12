import { useEffect, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { toast } from "sonner";
import { isMicOn, startMic, stopMic, subscribeMic } from "@/lib/mic";
import { useI18n } from "@/lib/i18n";

/** Tap-to-toggle live mic. Closes automatically when unmounted (end of turn / step). */
export function MicButton({ large = false }: { large?: boolean }) {
  const { t } = useI18n();
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(isMicOn());
    const off = subscribeMic(setOn);
    return () => {
      off();
      stopMic();
    };
  }, []);

  const toggle = async () => {
    if (on) return stopMic();
    if (!(await startMic())) toast.error(t("micDenied"));
  };

  if (large) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition active:scale-95 ${
          on
            ? "animate-pulse bg-destructive text-destructive-foreground"
            : "border border-primary/60 text-primary"
        }`}
      >
        {on ? <Mic className="size-4" /> : <MicOff className="size-4" />}
        {on ? t("micLive") : t("micOn")}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? t("micOff") : t("micOn")}
      title={on ? t("micOff") : t("micOn")}
      className={`grid size-10 place-items-center rounded-full transition active:scale-95 ${
        on ? "animate-pulse bg-destructive text-destructive-foreground" : "glass-neon-btn text-primary"
      }`}
    >
      {on ? <Mic className="size-4" /> : <MicOff className="size-4" />}
    </button>
  );
}
