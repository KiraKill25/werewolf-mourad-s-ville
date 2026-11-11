import { createFileRoute, Link } from "@tanstack/react-router";
import { ROLES } from "@/data/roles";
import { RoleCard } from "@/components/RoleCard";
import { NarratorCard } from "@/components/NarratorCard";
import { TopBar } from "@/components/TopBar";
import { useI18n } from "@/lib/i18n";

const TITLE = "Grimoire des rôles — Nightfall Oracle";
const DESC =
  "Découvre tous les rôles du village : portraits mystiques, description et pouvoir de chaque carte.";

export const Route = createFileRoute("/roles")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RolesPage,
});

type GroupKey = "wolves" | "night" | "day" | "solo";

const GROUPS: { key: GroupKey; emoji: string; ids: string[] }[] = [
  {
    key: "wolves",
    emoji: "🐺",
    ids: ["loup-garou", "loup-noir", "loup-rouge", "loup-bavard", "loup-matriarche", "bébé-loup"],
  },
  {
    key: "night",
    emoji: "🔮",
    ids: [
      "voyante",
      "sorciere",
      "salvateur",
      "renard",
      "geolier",
      "cupidon",
      "petite-fille",
      "enfant-sauvage",
      "marionnettiste",
      "mime",
      "trois-faces",
    ],
  },
  {
    key: "day",
    emoji: "🛡️",
    ids: [
      "simple-villageois",
      "chasseur",
      "ancien",
      "idiot-du-village",
      "corbeau",
      "general",
      "montreur-dours",
      "tavernier",
      "juge",
      "chaperon-rouge",
    ],
  },
  {
    key: "solo",
    emoji: "⚔️",
    ids: ["pyromaniac", "alien", "loup-blanc", "joueur-de-flute", "ange", "maniaque", "voleur"],
  },
];

const GROUP_TITLES: Record<string, Record<GroupKey, string>> = {
  fr: {
    wolves: "La Meute des Loups-Garous",
    night: "Le Village — Pouvoirs nocturnes",
    day: "Le Village — Pouvoirs diurnes & passifs",
    solo: "Rôles solitaires",
  },
  en: {
    wolves: "The Werewolf Pack",
    night: "The Village — Night powers",
    day: "The Village — Day & passive powers",
    solo: "Solo roles",
  },
  es: {
    wolves: "La Manada de Hombres Lobo",
    night: "La Aldea — Poderes nocturnos",
    day: "La Aldea — Poderes diurnos y pasivos",
    solo: "Roles solitarios",
  },
  pt: {
    wolves: "A Matilha de Lobisomens",
    night: "A Aldeia — Poderes noturnos",
    day: "A Aldeia — Poderes diurnos e passivos",
    solo: "Papéis solitários",
  },
  de: {
    wolves: "Das Werwolfrudel",
    night: "Das Dorf — Nachtkräfte",
    day: "Das Dorf — Tages- & passive Kräfte",
    solo: "Einzelgänger-Rollen",
  },
  ru: {
    wolves: "Стая оборотней",
    night: "Деревня — ночные способности",
    day: "Деревня — дневные и пассивные способности",
    solo: "Одиночные роли",
  },
  zh: {
    wolves: "狼人阵营",
    night: "村庄 — 夜间能力",
    day: "村庄 — 白天与被动能力",
    solo: "独立角色",
  },
  ar: {
    wolves: "قطيع المستذئبين",
    night: "القرية — قدرات ليلية",
    day: "القرية — قدرات نهارية وسلبية",
    solo: "الأدوار المنفردة",
  },
};

function RolesPage() {
  const { t, lang } = useI18n();
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl box-border overflow-x-hidden overflow-y-auto px-4 py-4 pb-10">
      <TopBar
        left={
          <Link to="/" className="text-sm text-muted-foreground">
            {t("back")}
          </Link>
        }
      />
      <h1 className="neon-text mt-4 text-2xl font-black">{t("grimoireTitle")}</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">{t("grimoireHint")}</p>

      <div className="mb-8">
        <NarratorCard
          title={t("narratorTitle")}
          text={t("narratorIntro")}
          guideLabel={t("villageLegend")}
        />
      </div>

      {GROUPS.map((g) => {
        const roles = g.ids
          .map((id) => ROLES.find((r) => r.id === id))
          .filter((r): r is (typeof ROLES)[number] => !!r);
        return (
          <section key={g.key} className="mb-8">
            <h2 className="mb-3 border-b border-border pb-2 text-lg font-bold text-primary">
              {g.emoji} {(GROUP_TITLES[lang] ?? GROUP_TITLES.fr)[g.key]}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {roles.map((role, i) => (
                <RoleCard key={role.id} role={role} index={i} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
