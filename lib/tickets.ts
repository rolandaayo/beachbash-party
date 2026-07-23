import { TicketType } from "@/context/CartContext";

export const TICKETS: TicketType[] = [
  {
    id: "general",
    name: "General Access",
    price: 50000,
    description: "Full access to the main party grounds, live performances, and beach area.",
    perks: [
      "Main stage access",
      "Beach area entry",
      "Live DJ sets all night",
      "Bar access",
    ],
  },
  {
    id: "vip",
    name: "VIP Access",
    price: 100000,
    description: "Premium experience with exclusive lounge, dedicated bar, and priority entry.",
    perks: [
      "Everything in General",
      "VIP lounge access",
      "Dedicated bar + 2 free drinks",
      "Priority entry (no queue)",
      "VIP viewing deck",
    ],
  },
  {
    id: "vvip",
    name: "VVIP Table",
    price: 250000,
    description: "The full experience. Private table, bottle service, and exclusive backstage access.",
    perks: [
      "Everything in VIP",
      "Private table for 4",
      "1 bottle of your choice",
      "Backstage access",
      "Personal host",
      "Complimentary merch pack",
    ],
  },
];

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
