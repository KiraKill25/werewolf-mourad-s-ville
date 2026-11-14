const keys = ["selfTarget", "alreadyProtected", "alreadyDoused", "nonWolf", "packMember", "alreadyMuted", "immune", "unavailable", "protectedStatus"] as const;
const rows = {
  fr: ["Soi-même interdit", "Déjà protégé", "Déjà imbibé", "Non-loup", "Membre de la meute", "Déjà muselé", "Immunisé", "Non sélectionnable", "Protégé"],
  en: ["Cannot target self", "Already protected", "Already doused", "Not a wolf", "Pack member", "Already muted", "Immune", "Not selectable", "Protected"],
  ar: ["لا يمكن استهداف النفس", "محمي سابقاً", "مبلل بالوقود سابقاً", "ليس ذئباً", "عضو القطيع", "أُسكت سابقاً", "محصّن", "غير قابل للاختيار", "محمي"],
  es: ["No puedes elegirte", "Ya protegido", "Ya rociado", "No es lobo", "Miembro de la manada", "Ya silenciado", "Inmune", "No seleccionable", "Protegido"],
  pt: ["Não pode escolher-se", "Já protegido", "Já encharcado", "Não é lobo", "Membro da alcateia", "Já silenciado", "Imune", "Não selecionável", "Protegido"],
  de: ["Kein Selbstziel", "Bereits geschützt", "Bereits übergossen", "Kein Wolf", "Rudelmitglied", "Bereits stumm", "Immun", "Nicht wählbar", "Geschützt"],
  ru: ["Нельзя выбрать себя", "Уже защищён", "Уже облит", "Не волк", "Член стаи", "Уже лишён речи", "Неуязвим", "Недоступен для выбора", "Защищён"],
  zh: ["不能选择自己", "已保护过", "已浇油", "非狼人", "狼群成员", "已禁言", "免疫", "不可选择", "受保护"],
};
export type NightPickerKey = typeof keys[number];
export const NIGHT_PICKER_LOCALES = Object.fromEntries(Object.entries(rows).map(([lang, values]) => [lang, Object.fromEntries(keys.map((key, i) => [key, values[i]]))])) as Record<keyof typeof rows, Record<NightPickerKey, string>>;