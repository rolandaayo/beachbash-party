"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type TicketType = {
  id: string;
  name: string;
  price: number;
  description: string;
  perks: string[];
};

export type CartItem = {
  ticket: TicketType;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (ticket: TicketType, qty?: number) => void;
  removeFromCart: (ticketId: string) => void;
  updateQuantity: (ticketId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((ticket: TicketType, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.ticket.id === ticket.id);
      if (existing) {
        return prev.map((i) =>
          i.ticket.id === ticket.id
            ? { ...i, quantity: Math.min(i.quantity + qty, 10) }
            : i,
        );
      }
      return [...prev, { ticket, quantity: qty }];
    });
  }, []);

  const removeFromCart = useCallback((ticketId: string) => {
    setItems((prev) => prev.filter((i) => i.ticket.id !== ticketId));
  }, []);

  const updateQuantity = useCallback((ticketId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.ticket.id !== ticketId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.ticket.id === ticketId ? { ...i, quantity: Math.min(qty, 10) } : i,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.ticket.price * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
