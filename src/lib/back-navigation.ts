/**
 * Retour système Android (bouton physique / geste) : pile de gestionnaires.
 * Le dernier gestionnaire enregistré (écran ou modal le plus haut) reçoit le
 * retour ; s'il renvoie false, on passe au suivant, puis au retour par défaut.
 */
import { useEffect, useRef } from "react";

type Handler = () => boolean;
const stack: { fn: { current: Handler } }[] = [];
let fallback: (() => void) | null = null;

export function setBackFallback(fn: () => void) {
  fallback = fn;
}

export function handleBack() {
  for (let i = stack.length - 1; i >= 0; i--) {
    try {
      if (stack[i].fn.current()) return;
    } catch (e) {
      console.error(e);
    }
  }
  fallback?.();
}

/** Enregistre un gestionnaire de retour tant que le composant est monté. */
export function useBackHandler(handler: Handler, enabled = true) {
  const ref = useRef(handler);
  ref.current = handler;
  useEffect(() => {
    if (!enabled) return undefined;
    const entry = { fn: ref };
    stack.push(entry);
    return () => {
      const i = stack.indexOf(entry);
      if (i >= 0) stack.splice(i, 1);
    };
  }, [enabled]);
}

/** Branche le bouton retour natif Android (no-op sur le web). */
export async function installNativeBack(exit: () => boolean) {
  try {
    const { Capacitor } = await import("@capacitor/core");
    if (!Capacitor.isNativePlatform()) return;
    const { App } = await import("@capacitor/app");
    await App.addListener("backButton", () => {
      if (exit()) App.exitApp();
      else handleBack();
    });
  } catch (e) {
    console.error(e);
  }
}
