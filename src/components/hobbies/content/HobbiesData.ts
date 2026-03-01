export type Hobby = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  stats?: Array<{ label: string; value: string }>;
  links?: Array<{ label: string; href: string }>;
  media?: Array<{ type: "image" | "video"; src: string; caption?: string }>;
};

export const hobbies: Hobby[] = [
  {
    slug: "chess",
    title: "Chess",
    summary:
      "Strategic thinking under pressure. This project tracks game data from Lichess and Chess.com, generates dashboards, and surfaces coaching insights.",
    description: "",
    tags: ["Data", "Analytics", "AI Coach"],
    stats: [
      { label: "Focus", value: "Rapid + Tactics" },
      { label: "Tracking", value: "Lichess + Chess.com" },
    ],
    links: [{ label: "Chess Profile", href: "#" }],
    media: [],
  },
];

export const hobbyBySlug = new Map(hobbies.map((hobby) => [hobby.slug, hobby]));
