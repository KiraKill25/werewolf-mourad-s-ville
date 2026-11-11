import { ROLES, roleImage } from "@/data/roles";

let started = false;

/** Précharge en arrière-plan les visuels et vidéos des rôles (une seule fois). */
export function preloadRoleMedia(roleIds?: string[]) {
  if (typeof window === "undefined" || started) return;
  started = true;

  const ids = roleIds?.length ? roleIds : ROLES.map((r) => r.id);

  // Images : immédiat, léger.
  for (const id of ids) {
    const src = roleImage(id);
    if (src) {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    }
  }

  // Vidéos : chargées à la demande uniquement (évite de saturer la WebView Android).
}
