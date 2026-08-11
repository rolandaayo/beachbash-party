"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getSocket } from "@/lib/socket";

import { API_BASE } from "@/lib/api";

type Message = {
  _id?: string;
  sender: "user" | "admin";
  text: string;
  createdAt?: string;
};

type Step = "closed" | "prompt" | "chat";

export default function ChatWidget() {
  const { user, token } = useAuth();
  const [step, setStep] = useState<Step>("closed");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  // ── Load conversation once user opens chat ──────────────────────────────
  useEffect(() => {
    if (step !== "chat" || !user || !token) return;

    async function load() {
      const res = await fetch(`${API_BASE}/api/chat/conversation`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const { conversation } = await res.json();
      setConversationId(conversation._id);
      setMessages(conversation.messages ?? []);
    }
    load();
  }, [step, user, token]);

  // ── Socket: join personal room, listen for admin replies ───────────────
  useEffect(() => {
    if (!user || !token) return;

    const socket = getSocket();
    if (!socket.connected) socket.connect();
    socket.emit("join_user", user.id);

    socket.on("admin_reply", ({ message }: { message: Message }) => {
      setMessages((prev) => [...prev, message]);
      if (step !== "chat") setUnread((n) => n + 1);
    });

    return () => {
      socket.off("admin_reply");
    };
  }, [user, token, step]);

  // ── Scroll to bottom on new message ────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Clear unread when chat opens
  useEffect(() => {
    if (step === "chat") setUnread(0);
  }, [step]);

  async function send() {
    if (!input.trim() || !token || sending) return;
    setSending(true);
    const text = input.trim();
    setInput("");

    // Optimistic
    setMessages((prev) => [
      ...prev,
      { sender: "user", text, createdAt: new Date().toISOString() },
    ]);

    try {
      await fetch(`${API_BASE}/api/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
    } catch {
      // silent — message already shown optimistically
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function open() {
    if (step === "closed") {
      setStep(user ? "chat" : "prompt");
    } else {
      setStep("closed");
    }
  }

  return (
    <>
      {/* ── Floating bubble ─────────────────────────────────────────── */}
      <button
        onClick={open}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#7c3aed] shadow-lg shadow-purple-400/40 flex items-center justify-center chat-bubble-pulse hover:scale-110 transition-transform"
      >
        {step === "closed" || step === "prompt" ? (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}

        {/* Unread badge */}
        {unread > 0 && step !== "chat" && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* ── Chat panel ──────────────────────────────────────────────── */}
      {step !== "closed" && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl shadow-purple-300/30 border border-purple-100 flex flex-col bg-white chat-panel-in">
          {/* Header */}
          <div className="bg-[#4c1d95] px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-lg shrink-0">
              🏖️
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm">BeachBash Support</p>
              <p className="text-white/50 text-[11px]">
                We usually reply within minutes
              </p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
          </div>

          {/* ── PROMPT — not logged in ─────────────────────────────── */}
          {step === "prompt" && (
            <div className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-2xl">
                💬
              </div>
              <div>
                <p className="font-black text-[#1e0a3c] text-base mb-1">
                  Start a conversation
                </p>
                <p className="text-purple-400 text-xs leading-relaxed">
                  Sign in so we can save your chat and get back to you even if
                  you close this window.
                </p>
              </div>
              <Link
                href="/login"
                className="btn-primary w-full justify-center py-2.5 text-sm"
                onClick={() => setStep("closed")}
              >
                Sign in to chat
              </Link>
              <p className="text-purple-200 text-[11px]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/login"
                  className="text-purple-400 underline underline-offset-2"
                  onClick={() => setStep("closed")}
                >
                  Register free
                </Link>
              </p>
            </div>
          )}

          {/* ── CHAT ──────────────────────────────────────────────── */}
          {step === "chat" && user && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 max-h-72 min-h-[180px]">
                {messages.length === 0 && (
                  <div className="text-center text-purple-300 text-xs mt-4">
                    <p className="text-2xl mb-2">👋</p>
                    <p>Hey {user.firstName}! How can we help you today?</p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={msg._id ?? i}
                    className={`flex flex-col gap-0.5 ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-end gap-1.5`}
                    >
                      {msg.sender === "admin" && (
                        <div className="w-6 h-6 rounded-full bg-[#4c1d95] text-white text-[10px] flex items-center justify-center shrink-0">
                          BB
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-[#7c3aed] text-white rounded-br-sm"
                            : "bg-purple-50 text-[#1e0a3c] rounded-bl-sm border border-purple-100"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                    {msg.createdAt && (
                      <span className="text-[10px] text-purple-300 px-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="border-t border-purple-100 p-3 flex items-end gap-2">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message…"
                  className="flex-1 resize-none bg-purple-50 border border-purple-100 rounded-xl px-3 py-2 text-xs text-[#1e0a3c] placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 max-h-24"
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || sending}
                  className="w-9 h-9 rounded-xl bg-[#7c3aed] text-white flex items-center justify-center shrink-0 hover:bg-[#6d28d9] transition-colors disabled:opacity-40"
                >
                  <svg
                    className="w-4 h-4 rotate-90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19V5m0 0l-7 7m7-7l7 7"
                    />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
