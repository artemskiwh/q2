"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { CartLine } from "@/lib/types";
import { Toast } from "./Toast";

interface CartState {
  lines: CartLine[];
}

type Action =
  | { type: "add"; line: CartLine }
  | { type: "remove"; slug: string; variant?: string }
  | { type: "setQty"; slug: string; variant?: string; qty: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const KEY = "tyag-cart-v1";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines };
    case "add": {
      const idx = state.lines.findIndex(
        (l) => l.slug === action.line.slug && l.variant === action.line.variant,
      );
      if (idx === -1) return { lines: [...state.lines, action.line] };
      const lines = state.lines.slice();
      lines[idx] = { ...lines[idx], qty: lines[idx].qty + action.line.qty };
      return { lines };
    }
    case "remove":
      return {
        lines: state.lines.filter(
          (l) => !(l.slug === action.slug && l.variant === action.variant),
        ),
      };
    case "setQty": {
      const lines = state.lines
        .map((l) =>
          l.slug === action.slug && l.variant === action.variant
            ? { ...l, qty: Math.max(1, action.qty) }
            : l,
        );
      return { lines };
    }
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  totalQty: number;
  add: (slug: string, qty?: number, variant?: string, label?: string) => void;
  remove: (slug: string, variant?: string) => void;
  setQty: (slug: string, qty: number, variant?: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state.lines));
    } catch {}
  }, [state.lines]);

  const add = useCallback(
    (slug: string, qty = 1, variant?: string, label?: string) => {
      dispatch({ type: "add", line: { slug, qty, variant } });
      setToast(`${label ?? "Товар"} добавлен в корзину`);
    },
    [],
  );

  const remove = useCallback((slug: string, variant?: string) => {
    dispatch({ type: "remove", slug, variant });
  }, []);

  const setQty = useCallback((slug: string, qty: number, variant?: string) => {
    dispatch({ type: "setQty", slug, variant, qty });
  }, []);

  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const totalQty = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.qty, 0),
    [state.lines],
  );

  const value: CartContextValue = {
    lines: state.lines,
    totalQty,
    add,
    remove,
    setQty,
    clear,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <Toast message={toast} onDone={() => setToast(null)} />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
