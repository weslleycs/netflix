export const GENRES = [
  { label: "Action", value: "ACTION" },
  { label: "Adventure", value: "ADVENTURE" },
  { label: "Comedy", value: "COMEDY" },
  { label: "Drama", value: "DRAMA" },
  { label: "Horror", value: "HORROR" },
  { label: "Thriller", value: "THRILLER" },
  { label: "Romance", value: "ROMANCE" },
  { label: "SciFi", value: "SCIFI" },
  { label: "Fantasy", value: "FANTASY" },
  { label: "Animation", value: "ANIMATION" },
  { label: "Documentary", value: "DOCUMENTARY" },
  { label: "Crime", value: "CRIME" },
  { label: "Mystery", value: "MYSTERY" },
  { label: "Family", value: "FAMILY" },
  { label: "Biography", value: "BIOGRAPHY" },
  { label: "War", value: "WAR" },
  { label: "Musical", value: "MUSICAL" },
] as const;


export type Genre = (typeof GENRES)[number]["value"];