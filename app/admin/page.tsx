"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { getSocket } from "@/lib/socket";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const ADMIN_SECRET =
  process.env.NEXT_PUBLIC_ADMIN_SECRET || "beachbash_admin_2026";

const adminHeaders = {
  "Content-Type": "application/json",
  "x-admin-secret": ADMIN_SECRET,
};

// ── Types ─────────────────────────────────────────────────────────────────────
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
};
type Order = {
  orderId: string;
  status: string;
  total: number;
  paidAt: string | null;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  tickets: { name: string; quantity: number; price: number }[];
  createdAt: string;
};
type Message = {
  _id: string;
  sender: "user" | "admin";
  text: string;
  createdAt: string;
};
type Conversation = {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
  messages?: Message[];
};

type Tab = "dashboard" | "users" | "orders" | "messages";

// ── Main component ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [convos, setConvos] = useState<Conversation[]>([]);
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // ── Fetch helpers ──────────────────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    const r = await fetch(`${API_BASE}/api/users`, { headers: adminHeaders });
    if (r.ok) {
      const d = await r.json();
      setUsers(d.users);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    const r = await fetch(`${API_BASE}/api/orders`, { headers: adminHeaders });
    if (r.ok) {
      const d = await r.json();
      setOrders(d.orders);
    }
  }, []);

  const fetchConvos = useCallback(async () => {
    const r = await fetch(`${API_BASE}/api/chat/admin/conversations`, {
      headers: adminHeaders,
    });
    if (r.ok) {
      const d = await r.json();
      setConvos(d.conversations);
    }
  }, []);

  const openConvo = useCallback(async (id: string) => {
    const r = await fetch(`${API_BASE}/api/chat/admin/conversations/${id}`, {
      headers: adminHeaders,
    });
    if (r.ok) {
      const d = await r.json();
      setActiveConvo(d.conversation);
      setConvos((prev) =>
        prev.map((c) => (c._id === id ? { ...c, unreadCount: 0 } : c)),
      );
    }
  }, []);

  // ── Socket setup ───────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = getSocket();
    if (!socket.connected) socket.connect();
    socket.emit("join_admin");

    socket.on("new_message", (data) => {
      notify(`💬 New message from ${data.userName}`);
      setConvos((prev) => {
        const exists = prev.find((c) => c._id === data.conversationId);
        if (exists) {
          return prev.map((c) =>
            c._id === data.conversationId
              ? {
                  ...c,
                  lastMessage: data.message.text,
                  unreadCount: data.unreadCount,
                  updatedAt: new Date().toISOString(),
                }
              : c,
          );
        }
        return prev;
      });
      setActiveConvo((prev) => {
        if (!prev || prev._id !== data.conversationId) return prev;
        return { ...prev, messages: [...(prev.messages ?? []), data.message] };
      });
    });

    socket.on("order_paid", (data) => {
      notify(
        `✅ Payment confirmed: ${data.orderId} — ₦${data.total?.toLocaleString()}`,
      );
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === data.orderId
            ? { ...o, status: "paid", paidAt: data.paidAt }
            : o,
        ),
      );
    });

    return () => {
      socket.off("new_message");
      socket.off("order_paid");
    };
  }, []);

  // ── Load data on tab change ────────────────────────────────────────────────
  useEffect(() => {
    if (tab === "users") fetchUsers();
    if (tab === "orders") fetchOrders();
    if (tab === "messages") fetchConvos();
    if (tab === "dashboard") {
      fetchUsers();
      fetchOrders();
      fetchConvos();
    }
  }, [tab, fetchUsers, fetchOrders, fetchConvos]);

  // ── Scroll to bottom of active conversation ────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConvo?.messages]);

  // ── User actions ───────────────────────────────────────────────────────────
  async function deleteUser(id: string) {
    if (!confirm("Delete this user?")) return;
    const r = await fetch(`${API_BASE}/api/users/${id}`, {
      method: "DELETE",
      headers: adminHeaders,
    });
    if (r.ok) {
      setUsers((p) => p.filter((u) => u.id !== id));
      notify("User deleted");
    }
  }

  async function toggleRole(user: User) {
    const newRole = user.role === "admin" ? "user" : "admin";
    const r = await fetch(`${API_BASE}/api/users/${user.id}`, {
      method: "PATCH",
      headers: adminHeaders,
      body: JSON.stringify({ role: newRole }),
    });
    if (r.ok) {
      fetchUsers();
      notify(`Role updated to ${newRole}`);
    }
  }

  // ── Order actions ──────────────────────────────────────────────────────────
  async function markPaid(orderId: string) {
    const r = await fetch(`${API_BASE}/api/orders/${orderId}/status`, {
      method: "PATCH",
      headers: adminHeaders,
      body: JSON.stringify({ status: "paid" }),
    });
    if (r.ok) {
      fetchOrders();
      notify("Order marked as paid");
    }
  }

  // ── Chat reply ─────────────────────────────────────────────────────────────
  async function sendReply() {
    if (!replyText.trim() || !activeConvo) return;
    setLoading(true);
    const r = await fetch(`${API_BASE}/api/chat/admin/reply`, {
      method: "POST",
      headers: adminHeaders,
      body: JSON.stringify({
        conversationId: activeConvo._id,
        text: replyText.trim(),
      }),
    });
    if (r.ok) {
      const d = await r.json();
      setActiveConvo((prev) =>
        prev
          ? { ...prev, messages: [...(prev.messages || []), d.message] }
          : prev,
      );
      setReplyText("");
    }
    setLoading(false);
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalRevenue = orders
    .filter((o) => o.status === "paid")
    .reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(
    (o) => o.status === "pending_payment",
  ).length;
  const unreadMsgs = convos.reduce((s, c) => s + (c.unreadCount || 0), 0);

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "orders", label: "Orders", icon: "🎟️" },
    { id: "messages", label: "Messages", icon: "💬" },
  ];

  return (
    <div className="pt-14 min-h-screen bg-[#faf5ff]">
      {/* Notification toast */}
      {notification && (
        <div className="fixed top-16 right-4 z-50 bg-[#4c1d95] text-white text-xs px-4 py-2.5 rounded-xl shadow-lg">
          {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-black text-2xl text-[#1e0a3c]">
              Admin Panel 🏖️
            </h1>
            <p className="text-purple-400 text-xs mt-0.5">
              BeachBash Party · Lagos 2026
            </p>
          </div>
          <span className="tag">Internal</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-purple-100 rounded-2xl p-1 mb-8 w-fit">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                tab === t.id
                  ? "bg-[#7c3aed] text-white"
                  : "text-purple-400 hover:text-purple-700"
              }`}
            >
              {t.icon} {t.label}
              {t.id === "messages" && unreadMsgs > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center">
                  {unreadMsgs}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── DASHBOARD ───────────────────────────────────────────────────── */}
        {tab === "dashboard" && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Total Users",
                  val: users.length,
                  icon: "👥",
                  color: "bg-purple-50 border-purple-100",
                },
                {
                  label: "Total Orders",
                  val: orders.length,
                  icon: "🎟️",
                  color: "bg-blue-50 border-blue-100",
                },
                {
                  label: "Revenue",
                  val: `₦${(totalRevenue / 1000).toFixed(0)}k`,
                  icon: "💰",
                  color: "bg-green-50 border-green-100",
                },
                {
                  label: "Pending",
                  val: pendingOrders,
                  icon: "⏳",
                  color: "bg-yellow-50 border-yellow-100",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`rounded-2xl p-5 border ${s.color}`}
                >
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <p className="font-black text-2xl text-[#1e0a3c]">{s.val}</p>
                  <p className="text-xs text-purple-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Recent orders */}
            <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-purple-50 flex items-center justify-between">
                <p className="font-bold text-sm text-[#1e0a3c]">
                  Recent Orders
                </p>
                <button
                  onClick={() => setTab("orders")}
                  className="text-[#7c3aed] text-xs font-semibold"
                >
                  View all →
                </button>
              </div>
              <div className="divide-y divide-purple-50">
                {orders.slice(0, 5).map((o) => (
                  <div
                    key={o.orderId}
                    className="px-5 py-3 flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#1e0a3c]">
                        {o.orderId}
                      </p>
                      <p className="text-[11px] text-purple-400">
                        {o.customer?.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-[#1e0a3c]">
                        ₦{o.total?.toLocaleString()}
                      </p>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          o.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <p className="px-5 py-6 text-center text-purple-300 text-xs">
                    No orders yet
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── USERS ───────────────────────────────────────────────────────── */}
        {tab === "users" && (
          <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-purple-50 flex items-center justify-between">
              <p className="font-bold text-sm text-[#1e0a3c]">
                All Users ({users.length})
              </p>
              <button
                onClick={fetchUsers}
                className="text-purple-400 text-xs hover:text-purple-700"
              >
                ↻ Refresh
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[600px]">
                <thead className="border-b border-purple-50">
                  <tr>
                    {[
                      "Name",
                      "Email",
                      "Phone",
                      "Role",
                      "Joined",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-purple-300 font-medium"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-50">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-purple-50/50">
                      <td className="px-5 py-3 font-semibold text-[#1e0a3c]">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="px-5 py-3 text-purple-500">{u.email}</td>
                      <td className="px-5 py-3 text-purple-400">
                        {u.phone || "—"}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-purple-300">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3 flex items-center gap-2">
                        <button
                          onClick={() => toggleRole(u)}
                          className="text-[10px] text-purple-500 hover:text-purple-800 border border-purple-200 rounded-lg px-2 py-1"
                        >
                          {u.role === "admin" ? "→ User" : "→ Admin"}
                        </button>
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="text-[10px] text-red-400 hover:text-red-600 border border-red-100 rounded-lg px-2 py-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-8 text-center text-purple-300"
                      >
                        No users yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ORDERS ──────────────────────────────────────────────────────── */}
        {tab === "orders" && (
          <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-purple-50 flex items-center justify-between">
              <p className="font-bold text-sm text-[#1e0a3c]">
                All Orders ({orders.length})
              </p>
              <button
                onClick={fetchOrders}
                className="text-purple-400 text-xs hover:text-purple-700"
              >
                ↻ Refresh
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[700px]">
                <thead className="border-b border-purple-50">
                  <tr>
                    {[
                      "Order ID",
                      "Customer",
                      "Tickets",
                      "Total",
                      "Status",
                      "Paid At",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-purple-300 font-medium"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-50">
                  {orders.map((o) => (
                    <tr key={o.orderId} className="hover:bg-purple-50/50">
                      <td className="px-5 py-3 font-black text-[#1e0a3c] tracking-wide">
                        {o.orderId}
                      </td>
                      <td className="px-5 py-3">
                        <p className="font-semibold text-[#1e0a3c]">
                          {o.customer?.firstName} {o.customer?.lastName}
                        </p>
                        <p className="text-purple-400">{o.customer?.email}</p>
                      </td>
                      <td className="px-5 py-3 text-purple-500">
                        {o.tickets
                          ?.map((t) => `${t.name} ×${t.quantity}`)
                          .join(", ")}
                      </td>
                      <td className="px-5 py-3 font-black text-[#1e0a3c]">
                        ₦{o.total?.toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            o.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : o.status === "pending_payment"
                                ? "bg-yellow-100 text-yellow-700"
                                : o.status === "failed"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-purple-400">
                        {o.paidAt
                          ? new Date(o.paidAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-5 py-3">
                        {o.status !== "paid" && (
                          <button
                            onClick={() => markPaid(o.orderId)}
                            className="text-[10px] text-green-600 border border-green-200 rounded-lg px-2 py-1 hover:bg-green-50"
                          >
                            Mark Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-8 text-center text-purple-300"
                      >
                        No orders yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── MESSAGES ────────────────────────────────────────────────────── */}
        {tab === "messages" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
            {/* Conversation list */}
            <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-purple-50 flex items-center justify-between">
                <p className="font-bold text-sm text-[#1e0a3c]">
                  Conversations
                </p>
                <button
                  onClick={fetchConvos}
                  className="text-purple-400 text-xs hover:text-purple-700"
                >
                  ↻
                </button>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-purple-50">
                {convos.map((c) => (
                  <button
                    key={c._id}
                    onClick={() => openConvo(c._id)}
                    className={`w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors ${
                      activeConvo?._id === c._id ? "bg-purple-50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="font-semibold text-xs text-[#1e0a3c] truncate">
                        {c.userName}
                      </p>
                      {c.unreadCount > 0 && (
                        <span className="w-4 h-4 rounded-full bg-[#7c3aed] text-white text-[9px] font-black flex items-center justify-center shrink-0">
                          {c.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-purple-400 truncate">
                      {c.lastMessage || "No messages yet"}
                    </p>
                    <p className="text-[10px] text-purple-200 mt-0.5">
                      {new Date(c.updatedAt).toLocaleTimeString()}
                    </p>
                  </button>
                ))}
                {convos.length === 0 && (
                  <p className="p-6 text-center text-purple-300 text-xs">
                    No conversations yet
                  </p>
                )}
              </div>
            </div>

            {/* Active conversation */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-purple-100 flex flex-col overflow-hidden">
              {activeConvo ? (
                <>
                  <div className="px-5 py-3 border-b border-purple-50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-[#4c1d95] font-black text-[11px] flex items-center justify-center uppercase">
                      {activeConvo.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#1e0a3c]">
                        {activeConvo.userName}
                      </p>
                      <p className="text-[11px] text-purple-400">
                        {activeConvo.userEmail}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                    {(activeConvo.messages || []).map((msg, i) => (
                      <div
                        key={msg._id || i}
                        className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === "admin"
                              ? "bg-[#7c3aed] text-white rounded-br-sm"
                              : "bg-purple-50 text-[#1e0a3c] border border-purple-100 rounded-bl-sm"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>
                  <div className="border-t border-purple-100 p-3 flex gap-2">
                    <textarea
                      rows={1}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendReply();
                        }
                      }}
                      placeholder="Reply…"
                      className="flex-1 resize-none bg-purple-50 border border-purple-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                    <button
                      onClick={sendReply}
                      disabled={loading || !replyText.trim()}
                      className="px-4 py-2 bg-[#7c3aed] text-white text-xs font-bold rounded-xl hover:bg-[#6d28d9] disabled:opacity-40"
                    >
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-purple-300 text-sm">
                  Select a conversation →
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
