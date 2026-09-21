import { TicketType } from "@/context/CartContext";

export const TICKETS: TicketType[] = [
  {
    id: "regular-girls-25",
    name: "Girls — ₦25k",
    price: 25000,
    description: "Entry for ladies. Make your own way to the beach house and enjoy the full party experience.",
    perks: [
      "General entry",
      "1 cocktail",
      "Full party access",
    ],
  },
  {
    id: "regular-girls-40",
    name: "Girls — ₦40k",
    price: 40000,
    description: "Entry for ladies. Make your own way to the beach house and enjoy the full party experience.",
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
    description: "Entry for guys. Make your own way to the beach house and enjoy the full party experience.",
    perks: [
      "General entry",
      "1 cocktail",
      "Full party access",
    ],
  },
  {
    id: "regular-guys-60",
    name: "Guys — ₦60k",
    price: 60000,
    description: "Entry for guys. Make your own way to the beach house and enjoy the full party experience.",
    perks: [
      "General entry",
      "1 cocktail",
      "Full party access",
    ],
  },
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

export function formatNaira(amount: number): string {
  if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)}M`;
  if (amount >= 1000) return `₦${(amount / 1000).toFixed(0)}k`;
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function formatNairaFull(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
