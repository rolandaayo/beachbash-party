const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type OrderCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type OrderTicket = {
  ticketId: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  orderId: string;
  userId?: string | null;
  customer: OrderCustomer;
  tickets: OrderTicket[];
  total: number;
  status: "pending_payment" | "paid" | "failed" | "refunded";
  paystackRef?: string | null;
  paystackChannel?: string | null;
  paidAt?: string | null;
  createdAt: string;
};

export type CreateOrderPayload = {
  customer: OrderCustomer;
  tickets: OrderTicket[];
  total: number;
};

export async function createOrder(
  payload: CreateOrderPayload,
  token?: string | null,
): Promise<{ orderId: string; order?: Order; paystack?: { authorization_url: string } | null }> {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to create order");
  }
  return data;
}

export async function getOrder(orderId: string): Promise<Order> {
  const res = await fetch(`${API_BASE}/api/orders/${orderId}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Order not found");
  }
  return data.order;
}

export async function verifyPayment(orderId: string): Promise<{
  order: Order;
  verified: boolean;
  message?: string;
}> {
  const res = await fetch(`${API_BASE}/api/orders/${orderId}/verify`, {
    method: "POST",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Payment verification failed");
  }
  return data;
}
