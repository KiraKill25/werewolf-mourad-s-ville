import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Cog,
  Eye,
  Flame,
  Moon,
  Quote,
  Sparkles,
  Sun,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { GM_GUIDE } from "@/lib/locales/gm-guide";

const STEPS = [
  { icon: Users, tone: "text-primary" },
  { icon: Eye, tone: "text-accent" },
  { icon: Moon, tone: "text-primary" },
  { icon: Sun, tone: "text-gold" },
  { icon: Flame, tone: "text-destructive" },
  { icon: Trophy, tone: "text-gold" },
] as const;

/** Guide du Meneur : grimoire en 6 chapitres (mécanique, ambiance, phrase rituelle). */
export function GuideModal({ onClose }: { onClose: () => void }) {
  const { t, dir, lang } = useI18n();
  useScrollLock();
  const copy = GM_GUIDE[lang] ?? GM_GUIDE.fr;
  const [i, setI] = useState(0);
  const n = copy.chapters.length;
  const ch = copy.chapters[i];
  const Icon = STEPS[i].icon;

  return (
    <div className="fixed inset-0 z-50 flex w-screen max-w-full items-center justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-md">
      <div className="surface-card neon-ring relative mx-auto my-auto box-border flex max-h-[90vh] w-full max-w-sm flex-col rounded-3xl p-5 sm:max-w-md">
        <button
          type="button"
          onClick={onClose}
          aria-label={t("guideClose")}
          className="absolute end-4 top-4 rounded-full border border-border p-1.5 text-muted-foreground"
        >
          <X className="size-4" />
        </button>

        <p className="text-[11px] tracking-[0.3em] text-primary uppercase">{t("guideTitle")}</p>

        <div className="mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain pe-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: dir === "rtl" ? -24 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir === "rtl" ? 24 : -24 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="text-center">
                <div
                  className={`mx-auto flex size-16 items-center justify-center rounded-3xl border border-border bg-input/40 ${STEPS[i].tone}`}
                >
                  <Icon className="size-8" />
                </div>
                <p className="mt-3 text-[10px] tracking-widest text-muted-foreground uppercase">
                  {copy.labels.chapter} {i + 1}
                </p>
                <h2 className="neon-text mt-1 text-xl font-black">{ch.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground italic">
                  {ch.spirit}
                </p>
              </div>

              <section className="rounded-2xl border border-primary/30 bg-primary/5 p-3">
                <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-primary uppercase">
                  <Cog className="size-3.5" /> {copy.labels.mech}
                </p>
                <ul className="space-y-1.5 text-xs leading-relaxed text-foreground">
                  {ch.mech.map((m) => (
                    <li key={m} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-accent/30 bg-accent/5 p-3">
                <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-accent uppercase">
                  <Sparkles className="size-3.5" /> {copy.labels.tip}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">{ch.tip}</p>
              </section>

              {ch.chant && (
                <section className="animate-pulse-glow rounded-2xl border border-gold/40 bg-gold/10 p-3">
                  <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-gold uppercase">
                    <Quote className="size-3.5" /> {copy.labels.chant}
                  </p>
                  <p className="text-sm leading-relaxed font-semibold text-gold italic">
                    {ch.chant}
                  </p>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          {copy.chapters.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setI(k)}
              aria-label={`${k + 1} / ${n}`}
              className={`h-1.5 rounded-full transition-all ${
                k === i ? "w-6 bg-primary" : "w-1.5 bg-input"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-[10px] tracking-widest text-muted-foreground uppercase">
          {t("guideStepOf", { i: i + 1, n })}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={i === 0}
            onClick={() => setI((v) => Math.max(0, v - 1))}
            className="flex items-center justify-center gap-1 rounded-full border border-border py-3 text-xs font-bold disabled:opacity-40"
          >
            <ChevronLeft className="size-4 rtl:rotate-180" />
            {t("back")}
          </button>
          {i + 1 < n ? (
            <button
              type="button"
              onClick={() => setI((v) => v + 1)}
              className="flex items-center justify-center gap-1 rounded-full bg-primary py-3 text-xs font-bold text-primary-foreground"
            >
              {t("next")}
              <ChevronRight className="size-4 rtl:rotate-180" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="gradient-neon rounded-full py-3 text-xs font-black text-primary-foreground"
            >
              {t("guideStart")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
