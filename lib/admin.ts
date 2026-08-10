import { API_BASE } from "@/lib/api";

export { API_BASE };

export const ADMIN_SECRET =
  process.env.NEXT_PUBLIC_ADMIN_SECRET || "beachbash_admin_2026";

export const adminHeaders = {
  "Content-Type": "application/json",
  "x-admin-secret": ADMIN_SECRET,
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
};

export type OrderTicket = {
  ticketId?: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  orderId: string;
  userId?: string | null;
  status: string;
  total: number;
  paidAt: string | null;
  paystackRef?: string | null;
  paystackChannel?: string | null;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  tickets: OrderTicket[];
  createdAt: string;
};

export type Message = {
  _id: string;
  sender: "user" | "admin";
  text: string;
  createdAt: string;
};

export type Conversation = {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
  messages?: Message[];
};

export type CreateUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role?: "user" | "admin";
};

export async function fetchUsers(): Promise<User[]> {
  const r = await fetch(`${API_BASE}/api/users`, { headers: adminHeaders });
  if (!r.ok) throw new Error("Failed to load users");
  const d = await r.json();
  return d.users;
}

export async function fetchOrders(): Promise<Order[]> {
  const r = await fetch(`${API_BASE}/api/orders`, { headers: adminHeaders });
  if (!r.ok) throw new Error("Failed to load orders");
  const d = await r.json();
  return d.orders;
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const r = await fetch(`${API_BASE}/api/users`, {
    method: "POST",
    headers: adminHeaders,
    body: JSON.stringify(payload),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error || "Failed to create user");
  return d.user;
}

export async function updateUser(
  id: string,
  payload: Partial<CreateUserPayload>,
): Promise<User> {
  const r = await fetch(`${API_BASE}/api/users/${id}`, {
    method: "PATCH",
    headers: adminHeaders,
    body: JSON.stringify(payload),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error || "Failed to update user");
  return d.user;
}

export async function deleteUser(id: string): Promise<void> {
  const r = await fetch(`${API_BASE}/api/users/${id}`, {
    method: "DELETE",
    headers: adminHeaders,
  });
  if (!r.ok) throw new Error("Failed to delete user");
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
): Promise<Order> {
  const r = await fetch(`${API_BASE}/api/orders/${orderId}/status`, {
    method: "PATCH",
    headers: adminHeaders,
    body: JSON.stringify({ status }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error || "Failed to update order");
  return d.order;
}

export async function fetchConversations(): Promise<Conversation[]> {
  const r = await fetch(`${API_BASE}/api/chat/admin/conversations`, {
    headers: adminHeaders,
  });
  if (!r.ok) throw new Error("Failed to load conversations");
  const d = await r.json();
  return d.conversations;
}

export async function fetchConversation(id: string): Promise<Conversation> {
  const r = await fetch(`${API_BASE}/api/chat/admin/conversations/${id}`, {
    headers: adminHeaders,
  });
  if (!r.ok) throw new Error("Failed to load conversation");
  const d = await r.json();
  return d.conversation;
}

export async function sendAdminReply(
  conversationId: string,
  text: string,
): Promise<Message> {
  const r = await fetch(`${API_BASE}/api/chat/admin/reply`, {
    method: "POST",
    headers: adminHeaders,
    body: JSON.stringify({ conversationId, text }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error || "Failed to send reply");
  return d.message;
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function getTicketSales(orders: Order[]) {
  const sales: Record<string, { name: string; quantity: number; revenue: number }> =
    {};
  for (const order of orders.filter((o) => o.status === "paid")) {
    for (const t of order.tickets ?? []) {
      const key = t.ticketId || t.name;
      if (!sales[key]) sales[key] = { name: t.name, quantity: 0, revenue: 0 };
      sales[key].quantity += t.quantity;
      sales[key].revenue += t.price * t.quantity;
    }
  }
  return Object.values(sales).sort((a, b) => b.revenue - a.revenue);
}

export function exportBuyersCsv(orders: Order[]) {
  const paid = orders.filter((o) => o.status === "paid");
  const headers = [
    "Order ID",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Tickets",
    "Total",
    "Paid At",
  ];
  const rows = paid.map((o) => [
    o.orderId,
    o.customer.firstName,
    o.customer.lastName,
    o.customer.email,
    o.customer.phone,
    o.tickets.map((t) => `${t.name} x${t.quantity}`).join("; "),
    o.total,
    o.paidAt ? new Date(o.paidAt).toISOString() : "",
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `beachbash-buyers-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
