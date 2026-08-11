"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { getSocket } from "@/lib/socket";
import AddUserModal from "@/components/admin/AddUserModal";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  type User,
  type Order,
  type Conversation,
  fetchUsers,
  fetchOrders,
  fetchConversations,
  fetchConversation,
  deleteUser,
  deleteOrder,
  updateUser,
  updateOrderStatus,
  sendAdminReply,
  formatNaira,
  getTicketSales,
  exportBuyersCsv,
} from "@/lib/admin";

type Tab = "dashboard" | "buyers" | "orders" | "users" | "messages";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("buyers");
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [convos, setConvos] = useState<Conversation[]>([]);
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "paid" | "pending_payment"
  >("all");
  const bottomRef = useRef<HTMLDivElement>(null);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const loadUsers = useCallback(async () => {
    try {
      setUsers(await fetchUsers());
    } catch {
      notify("Failed to load users");
    }
  }, []);

  const loadOrders = useCallback(async () => {
    try {
      setOrders(await fetchOrders());
    } catch {
      notify("Failed to load orders");
    }
  }, []);

  const loadConvos = useCallback(async () => {
    try {
      setConvos(await fetchConversations());
    } catch {
      notify("Failed to load messages");
    }
  }, []);

  const openConvo = useCallback(async (id: string) => {
    try {
      const convo = await fetchConversation(id);
      setActiveConvo(convo);
      setConvos((prev) =>
        prev.map((c) => (c._id === id ? { ...c, unreadCount: 0 } : c)),
      );
    } catch {
      notify("Failed to open conversation");
    }
  }, []);

  // Socket — real-time payment notifications
  useEffect(() => {
    const socket = getSocket();
    if (!socket.connected) socket.connect();
    socket.emit("join_admin");

    socket.on("order_paid", (data) => {
      const name = data.customer
        ? `${data.customer.firstName} ${data.customer.lastName}`
        : "Customer";
      notify(`Payment confirmed: ${name} — ${formatNaira(data.total)}`);
      setOrders((prev) => {
        const exists = prev.find((o) => o.orderId === data.orderId);
        if (exists) {
          return prev.map((o) =>
            o.orderId === data.orderId
              ? {
                  ...o,
                  status: "paid",
                  paidAt: data.paidAt,
                  customer: data.customer ?? o.customer,
                }
              : o,
          );
        }
        loadOrders();
        return prev;
      });
    });

    socket.on("new_message", (data) => {
      notify(`New message from ${data.userName}`);
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
        loadConvos();
        return prev;
      });
      setActiveConvo((prev) => {
        if (!prev || prev._id !== data.conversationId) return prev;
        return { ...prev, messages: [...(prev.messages ?? []), data.message] };
      });
    });

    return () => {
      socket.off("order_paid");
      socket.off("new_message");
    };
  }, [loadOrders, loadConvos]);

  useEffect(() => {
    if (tab === "users") loadUsers();
    if (tab === "orders" || tab === "buyers") loadOrders();
    if (tab === "messages") loadConvos();
    if (tab === "dashboard") {
      loadUsers();
      loadOrders();
      loadConvos();
    }
  }, [tab, loadUsers, loadOrders, loadConvos]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConvo?.messages]);

  // ── Actions ──────────────────────────────────────────────────────────────
  async function handleDeleteUser(id: string) {
    if (!confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((p) => p.filter((u) => u.id !== id));
      notify("User deleted");
    } catch {
      notify("Failed to delete user");
    }
  }

  async function handleToggleRole(user: User) {
    const newRole = user.role === "admin" ? "user" : "admin";
    try {
      await updateUser(user.id, { role: newRole });
      loadUsers();
      notify(`Role updated to ${newRole}`);
    } catch {
      notify("Failed to update role");
    }
  }

  async function handleMarkPaid(orderId: string) {
    try {
      const updated = await updateOrderStatus(orderId, "paid");
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, ...updated } : o)),
      );
      notify("Order marked as paid");
    } catch {
      notify("Failed to update order");
    }
  }

  async function handleDeleteOrder(orderId: string) {
    if (!confirm(`Delete order ${orderId}? This cannot be undone.`)) return;
    try {
      await deleteOrder(orderId);
      setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
      notify("Order deleted");
    } catch {
      notify("Failed to delete order");
    }
  }

  async function handleSendReply() {
    if (!replyText.trim() || !activeConvo) return;
    setLoading(true);
    try {
      const msg = await sendAdminReply(activeConvo._id, replyText.trim());
      setActiveConvo((prev) =>
        prev ? { ...prev, messages: [...(prev.messages || []), msg] } : prev,
      );
      setReplyText("");
    } catch {
      notify("Failed to send reply");
    }
    setLoading(false);
  }

  // ── Derived data ─────────────────────────────────────────────────────────
  const paidOrders = orders.filter((o) => o.status === "paid");
  const totalRevenue = paidOrders.reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(
    (o) => o.status === "pending_payment",
  ).length;
  const unreadMsgs = convos.reduce((s, c) => s + (c.unreadCount || 0), 0);
  const ticketSales = getTicketSales(orders);

  const matchesSearch = (o: Order) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const c = o.customer;
    return (
      o.orderId.toLowerCase().includes(q) ||
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q)
    );
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    return matchesSearch(o);
  });

  const filteredBuyers = paidOrders.filter(matchesSearch);

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "buyers", label: "Ticket Buyers", icon: "🎫" },
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "orders", label: "All Orders", icon: "🎟️" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "messages", label: "Messages", icon: "💬" },
  ];

  return (
    <div
      className="pt-14 min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #0f0520 0%, #1e0a3c 50%, #2e1065 100%)",
      }}
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl" />
      </div>

      {/* Notification toast */}
      {notification && (
        <div className="fixed top-16 right-4 z-50 bg-[#4c1d95] text-white text-xs px-4 py-2.5 rounded-xl shadow-lg animate-[fadeUp_0.3s_ease]">
          {notification}
        </div>
      )}

      <AddUserModal
        open={showAddUser}
        onClose={() => setShowAddUser(false)}
        onCreated={() => {
          loadUsers();
          notify("User created successfully");
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-black text-2xl text-white">Admin Panel</h1>
            <p className="text-white/40 text-xs mt-0.5">
              BeachBash Party · Lagos 2026
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddUser(true)}
              className="px-4 py-2 bg-[#7c3aed] text-white text-xs font-bold rounded-xl hover:bg-[#6d28d9] transition-colors"
            >
              + Add User
            </button>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/20">
              Internal
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1 mb-6 w-fit overflow-x-auto max-w-full">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                tab === t.id
                  ? "bg-[#7c3aed] text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {t.icon} {t.label}
              {t.id === "messages" && unreadMsgs > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center">
                  {unreadMsgs}
                </span>
              )}
              {t.id === "buyers" && paidOrders.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-green-500 text-white text-[9px] font-black flex items-center justify-center">
                  {paidOrders.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search bar for buyers/orders */}
        {(tab === "buyers" || tab === "orders") && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="search"
              placeholder="Search by name, email, phone, or order ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-white/8 border border-white/10 text-white placeholder-white/25 rounded-xl px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {tab === "orders" && (
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as typeof statusFilter)
                }
                className="bg-white/8 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="all" className="bg-[#1e0a3c]">
                  All statuses
                </option>
                <option value="paid" className="bg-[#1e0a3c]">
                  Paid
                </option>
                <option value="pending_payment" className="bg-[#1e0a3c]">
                  Pending
                </option>
              </select>
            )}
            {tab === "buyers" && paidOrders.length > 0 && (
              <button
                onClick={() => exportBuyersCsv(orders)}
                className="px-4 py-2.5 text-xs font-semibold text-white/60 border border-white/10 rounded-xl hover:bg-white/5 whitespace-nowrap transition-colors"
              >
                Export CSV
              </button>
            )}
          </div>
        )}

        {/* ── TICKET BUYERS ─────────────────────────────────────────────── */}
        {tab === "buyers" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <StatCard
                label="Confirmed Buyers"
                value={paidOrders.length}
                icon="✅"
              />
              <StatCard
                label="Total Revenue"
                value={formatNaira(totalRevenue)}
                icon="💰"
              />
              <StatCard
                label="Tickets Sold"
                value={ticketSales.reduce((s, t) => s + t.quantity, 0)}
                icon="🎟️"
              />
            </div>

            <div
              className="rounded-2xl border border-white/10 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <p className="font-bold text-sm text-white">
                  Successful Purchases ({filteredBuyers.length})
                </p>
                <button
                  onClick={loadOrders}
                  className="text-white/40 text-xs hover:text-white/70 transition-colors"
                >
                  ↻ Refresh
                </button>
              </div>

              {filteredBuyers.length === 0 ? (
                <EmptyState message="No ticket buyers yet. Purchases appear here once payment is confirmed." />
              ) : (
                <div className="divide-y divide-white/10">
                  {filteredBuyers.map((o) => (
                    <BuyerCard key={o.orderId} order={o} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── DASHBOARD ─────────────────────────────────────────────────── */}
        {tab === "dashboard" && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              <StatCard label="Total Users" value={users.length} icon="👥" />
              <StatCard label="Total Orders" value={orders.length} icon="🎟️" />
              <StatCard
                label="Revenue"
                value={formatNaira(totalRevenue)}
                icon="💰"
              />
              <StatCard label="Pending" value={pendingOrders} icon="⏳" />
            </div>

            {ticketSales.length > 0 && (
              <div
                className="rounded-2xl border border-white/10 overflow-hidden mb-8"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="px-5 py-4 border-b border-white/10">
                  <p className="font-bold text-sm text-white">
                    Ticket Sales Breakdown
                  </p>
                </div>
                <div className="divide-y divide-white/10">
                  {ticketSales.map((t) => (
                    <div
                      key={t.name}
                      className="px-5 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{t.name}</p>
                        <p className="text-[11px] text-white/40">
                          {t.quantity} sold
                        </p>
                      </div>
                      <p className="text-xs font-black text-white">
                        {formatNaira(t.revenue)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              className="rounded-2xl border border-white/10 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <p className="font-bold text-sm text-white">Recent Purchases</p>
                <button
                  onClick={() => setTab("buyers")}
                  className="text-purple-400 text-xs font-semibold hover:text-purple-300 transition-colors"
                >
                  View all →
                </button>
              </div>
              <div className="divide-y divide-white/10">
                {paidOrders.slice(0, 5).map((o) => (
                  <div
                    key={o.orderId}
                    className="px-5 py-3 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-white">
                        {o.customer.firstName} {o.customer.lastName}
                      </p>
                      <p className="text-[11px] text-white/40">
                        {o.customer.email} · {o.orderId}
                      </p>
                    </div>
                    <p className="text-xs font-black text-white">
                      {formatNaira(o.total)}
                    </p>
                  </div>
                ))}
                {paidOrders.length === 0 && (
                  <EmptyState message="No purchases yet" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── ALL ORDERS ────────────────────────────────────────────────── */}
        {tab === "orders" && (
          <div
            className="rounded-2xl border border-white/10 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <p className="font-bold text-sm text-white">
                All Orders ({filteredOrders.length})
              </p>
              <button
                onClick={loadOrders}
                className="text-white/40 text-xs hover:text-white/70 transition-colors"
              >
                ↻ Refresh
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[800px]">
                <thead className="border-b border-white/10">
                  <tr>
                    {[
                      "Order ID",
                      "Customer",
                      "Phone",
                      "Tickets",
                      "Total",
                      "Status",
                      "Paid At",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-white/40 font-medium"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredOrders.map((o) => (
                    <tr
                      key={o.orderId}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-5 py-3 font-black text-white tracking-wide">
                        {o.orderId}
                      </td>
                      <td className="px-5 py-3">
                        <p className="font-semibold text-white">
                          {o.customer.firstName} {o.customer.lastName}
                        </p>
                        <p className="text-white/40">{o.customer.email}</p>
                      </td>
                      <td className="px-5 py-3 text-white/60">
                        {o.customer.phone || "—"}
                      </td>
                      <td className="px-5 py-3 text-white/60">
                        {o.tickets
                          ?.map((t) => `${t.name} ×${t.quantity}`)
                          .join(", ")}
                      </td>
                      <td className="px-5 py-3 font-black text-white">
                        {formatNaira(o.total)}
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge status={o.status} />
                      </td>
                      <td className="px-5 py-3 text-white/40">
                        {o.paidAt ? new Date(o.paidAt).toLocaleString() : "—"}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          {o.status !== "paid" && (
                            <button
                              onClick={() => handleMarkPaid(o.orderId)}
                              className="text-[10px] text-green-400 border border-green-500/20 bg-green-500/15 rounded-lg px-2 py-1 hover:bg-green-500/25 transition-colors"
                            >
                              Mark Paid
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteOrder(o.orderId)}
                            className="text-[10px] text-red-400 border border-red-500/20 bg-red-500/15 rounded-lg px-2 py-1 hover:bg-red-500/25 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-5 py-8 text-center text-white/40"
                      >
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── USERS ─────────────────────────────────────────────────────── */}
        {tab === "users" && (
          <div
            className="rounded-2xl border border-white/10 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <p className="font-bold text-sm text-white">
                All Users ({users.length})
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddUser(true)}
                  className="text-purple-400 text-xs font-semibold hover:text-purple-300 transition-colors"
                >
                  + Add User
                </button>
                <button
                  onClick={loadUsers}
                  className="text-white/40 text-xs hover:text-white/70 transition-colors"
                >
                  ↻ Refresh
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[600px]">
                <thead className="border-b border-white/10">
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
                        className="text-left px-5 py-3 text-white/40 font-medium"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-5 py-3 font-semibold text-white">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="px-5 py-3 text-white/60">{u.email}</td>
                      <td className="px-5 py-3 text-white/40">
                        {u.phone || "—"}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.role === "admin"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/20"
                              : "bg-white/10 text-white/40 border border-white/10"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-white/40">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleRole(u)}
                            className="text-[10px] text-white/60 border border-white/10 bg-white/5 rounded-lg px-2 py-1 hover:bg-white/10 transition-colors"
                          >
                            {u.role === "admin" ? "→ User" : "→ Admin"}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="text-[10px] text-red-400 border border-red-500/20 bg-red-500/15 rounded-lg px-2 py-1 hover:bg-red-500/25 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-8 text-center text-white/40"
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

        {/* ── MESSAGES ──────────────────────────────────────────────────── */}
        {tab === "messages" && (
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            style={{ height: "min(600px, calc(100vh - 220px))" }}
          >
            {/* Conversation list */}
            <div
              className="rounded-2xl border border-white/10 overflow-hidden flex flex-col"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <p className="font-bold text-sm text-white">Conversations</p>
                <button
                  onClick={loadConvos}
                  className="text-white/40 text-xs hover:text-white/70 transition-colors"
                >
                  ↻
                </button>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-white/10">
                {convos.map((c) => (
                  <button
                    key={c._id}
                    onClick={() => openConvo(c._id)}
                    className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors ${
                      activeConvo?._id === c._id ? "bg-white/5" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="font-semibold text-xs text-white truncate">
                        {c.userName}
                      </p>
                      {c.unreadCount > 0 && (
                        <span className="w-4 h-4 rounded-full bg-[#7c3aed] text-white text-[9px] font-black flex items-center justify-center shrink-0">
                          {c.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-white/40 truncate">
                      {c.lastMessage || "No messages yet"}
                    </p>
                  </button>
                ))}
                {convos.length === 0 && (
                  <EmptyState message="No conversations yet" />
                )}
              </div>
            </div>

            {/* Message thread */}
            <div
              className="lg:col-span-2 rounded-2xl border border-white/10 flex flex-col overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
              }}
            >
              {activeConvo ? (
                <>
                  <div className="px-5 py-3 border-b border-white/10">
                    <p className="font-bold text-sm text-white">
                      {activeConvo.userName}
                    </p>
                    <p className="text-[11px] text-white/40">
                      {activeConvo.userEmail}
                    </p>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                    {(activeConvo.messages || []).map((msg, i) => (
                      <div
                        key={msg._id || i}
                        className={`flex flex-col gap-1 ${
                          msg.sender === "admin" ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === "admin"
                              ? "bg-[#7c3aed] text-white rounded-br-sm"
                              : "bg-white/10 text-white border border-white/10 rounded-bl-sm"
                          }`}
                        >
                          {msg.text}
                        </div>
                        {msg.createdAt && (
                          <span className="text-[10px] text-white/30 px-1">
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {" · "}
                            {new Date(msg.createdAt).toLocaleDateString([], {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>
                  <div className="border-t border-white/10 p-3 flex gap-2">
                    <textarea
                      rows={2}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendReply();
                        }
                      }}
                      placeholder="Reply…"
                      className="flex-1 resize-none bg-white/8 border border-white/10 text-white placeholder-white/25 rounded-xl px-3 py-2 text-base sm:text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                      onClick={handleSendReply}
                      disabled={loading || !replyText.trim()}
                      className="px-4 py-2 bg-[#7c3aed] text-white text-xs font-bold rounded-xl hover:bg-[#6d28d9] disabled:opacity-40 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-white/30 text-sm">
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

// ── Sub-components ────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div
      className="rounded-xl p-3.5 border border-white/10 flex items-center gap-3"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center text-lg shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-black text-base text-white leading-none truncate">
          {value}
        </p>
        <p className="text-[11px] text-white/40 mt-0.5 truncate">{label}</p>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <p className="px-5 py-8 text-center text-white/30 text-xs">{message}</p>
  );
}

function BuyerCard({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const c = order.customer;

  return (
    <div className="px-5 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start justify-between gap-4"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/15 text-green-400 border border-green-500/20 font-black text-sm flex items-center justify-center shrink-0">
            {c.firstName[0]}
            {c.lastName[0]}
          </div>
          <div>
            <p className="font-bold text-sm text-white">
              {c.firstName} {c.lastName}
            </p>
            <p className="text-[11px] text-white/40 mt-0.5">{c.email}</p>
            <p className="text-[11px] text-white/40">{c.phone}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="font-black text-sm text-white">
            {formatNaira(order.total)}
          </p>
          <p className="text-[10px] text-white/30 mt-0.5">{order.orderId}</p>
          <p className="text-[10px] text-green-400 mt-0.5">
            {order.paidAt ? new Date(order.paidAt).toLocaleString() : "Paid"}
          </p>
        </div>
      </button>

      {open && (
        <div className="mt-4 ml-[52px] rounded-xl p-4 border border-white/10 bg-white/5">
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-wide mb-2">
            Tickets Purchased
          </p>
          <div className="space-y-2">
            {order.tickets.map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-white font-medium">
                  {t.name} × {t.quantity}
                </span>
                <span className="text-white/60">
                  {formatNaira(t.price * t.quantity)}
                </span>
              </div>
            ))}
          </div>
          {order.paystackChannel && (
            <p className="text-[10px] text-white/30 mt-3">
              Paid via {order.paystackChannel}
              {order.paystackRef ? ` · Ref: ${order.paystackRef}` : ""}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
