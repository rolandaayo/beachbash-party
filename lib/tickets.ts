import { TicketType } from "@/context/CartContext";

export const TICKETS: TicketType[] = [
  // ── Basic entry — self-transport ──────────────────────────────────────────
  {
    id: "regular-girls-25",
    name: "Girls — ₦25k",
    price: 25000,
    description: "Ladies' entry. Find your own way to the beach house — no transport included.",
    perks: [
      "General entry",
      "1 cocktail",
      "Full party access",
    ],
  },
  {
    id: "regular-guys-40",
    name: "Guys — ₦40k",
    price: 40000,
    description: "Guys' entry. Find your own way to the beach house — no transport included.",
    perks: [
      "General entry",
      "1 cocktail",
      "Full party access",
    ],
  },

  // ── Premium entry — boat ride + safari included ───────────────────────────
  {
    id: "regular-girls-40",
    name: "Girls — ₦40k",
    price: 40000,
    description: "Premium ladies' entry with to & fro boat ride and safari jeep ride included.",
    perks: [
      "General entry",
      "To & fro boat ride 🚢",
      "Safari jeep ride 🚙",
      "1 cocktail",
      "Full party access",
    ],
  },
  {
    id: "regular-guys-60",
    name: "Guys — ₦60k",
    price: 60000,
    description: "Premium guys' entry with to & fro boat ride and safari jeep ride included.",
    perks: [
      "General entry",
      "To & fro boat ride 🚢",
      "Safari jeep ride 🚙",
      "1 cocktail",
      "Full party access",
    ],
  },

  // ── Tables ────────────────────────────────────────────────────────────────
  {
    id: "table-700",
    name: "Table 700K",
    price: 700000,
    description: "Standing table for 2–4 people with premium spirits.",
    perks: [
      "2–4 people",
      "Standing table",
      "Hennessy VSOP",
      "1 Champagne",
      "3 Coke",
      "1 Food platter",
    ],
  },
  {
    id: "table-1m",
    name: "Table 1M",
    price: 1000000,
    description: "Premium table for 2–6 people with top-shelf spirits and full experience.",
    perks: [
      "2–6 people",
      "Casamigos",
      "2 Champagne",
      "1 Shisha",
      "1 Chivita",
      "1 Food platter",
    ],
  },
  {
    id: "table-1.5m",
    name: "Table 1.5M",
    price: 1500000,
    description: "Ultimate VIP experience for 2–8 people. Private cabana and full bottle service.",
    perks: [
      "2–8 people",
      "Don Julio",
      "2 Champagne",
      "1 Shisha",
      "2 Chivita",
      "Private cabana",
      "1 Food platter",
      "₦500k drinks + ₦400k room + ₦500k boat",
    ],
  },
];

// ── Per-ticket display metadata (not stored in cart) ──────────────────────
// Used by the tickets page for visual differentiation and the detail popup.
export type TicketMeta = {
  icon: string;
  tierLabel: string;
  capacity: string;
  isPremium?: boolean;      // boat + safari included — gets gold accent
  highlights?: string[];    // short bullet points shown prominently in popup
  badge?: string;           // small badge text on the card
};

export const TICKET_META: Record<string, TicketMeta> = {
  "regular-girls-25": {
    icon: "👩🏽",
    tierLabel: "General Entry",
    capacity: "per person",
    highlights: ["General entry to the party", "1 complimentary cocktail", "Self-transport to venue"],
  },
  "regular-guys-40": {
    icon: "👨🏽",
    tierLabel: "General Entry",
    capacity: "per person",
    highlights: ["General entry to the party", "1 complimentary cocktail", "Self-transport to venue"],
  },
  "regular-girls-40": {
    icon: "👩🏽",
    tierLabel: "Premium Entry",
    capacity: "per person",
    isPremium: true,
    badge: "🚢 Boat + Safari",
    highlights: [
      "General entry to the party",
      "To & fro boat ride included",
      "Safari jeep ride included",
      "1 complimentary cocktail",
    ],
  },
  "regular-guys-60": {
    icon: "👨🏽",
    tierLabel: "Premium Entry",
    capacity: "per person",
    isPremium: true,
    badge: "🚢 Boat + Safari",
    highlights: [
      "General entry to the party",
      "To & fro boat ride included",
      "Safari jeep ride included",
      "1 complimentary cocktail",
    ],
  },
  "table-700": {
    icon: "🥃",
    tierLabel: "Standing Table",
    capacity: "2–4 people",
    highlights: ["Standing table for 2–4", "Hennessy VSOP", "1 Champagne + 3 Coke", "1 Food platter"],
  },
  "table-1m": {
    icon: "⭐",
    tierLabel: "Premium Table",
    capacity: "2–6 people",
    badge: "🔥 Popular",
    highlights: ["Seated table for 2–6", "Casamigos tequila", "2 Champagne + 1 Shisha", "1 Food platter"],
  },
  "table-1.5m": {
    icon: "👑",
    tierLabel: "Private Cabana",
    capacity: "2–8 people",
    highlights: ["Private cabana for 2–8", "Don Julio tequila", "2 Champagne + 1 Shisha", "Private area", "1 Food platter"],
  },
};

export function formatNaira(amount: number): string {
  if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)}M`;
  if (amount >= 1000) return `₦${(amount / 1000).toFixed(0)}k`;
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function formatNairaFull(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
