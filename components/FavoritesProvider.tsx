"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export interface FavLine {
  slug: string;
  variant?: string;
}

interface FavState {
  lines: FavLine[];
}

type Action =
  | { type: "toggle"; line: FavLine }
  | { type: "remove"; slug: string; variant?: string }
  | { type: "hydrate"; lines: FavLine[] }
  | { type: "clear" };

const KEY = "tyag-fav-v1";

function reducer(state: FavState, action: Action): FavState {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines };
    case "toggle": {
      const idx = state.lines.findIndex(
        (l) => l.slug === action.line.slug && l.variant === action.line.variant,
      );
      if (idx === -1) return { lines: [...state.lines, action.line] };
      const lines = state.lines.slice();
      lines.splice(idx, 1);
      return { lines };
    }
    case "remove":
      return {
        lines: state.lines.filter(
          (l) => !(l.slug === action.slug && l.variant === action.variant),
        ),
      };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

interface FavContextValue {
  lines: FavLine[];
  count: number;
  toggle: (slug: string, variant?: string) => void;
  remove: (slug: string, variant?: string) => void;
  isFav: (slug: string, variant?: string) => boolean;
  clear: () => void;
}

const FavContext = createContext<FavContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });

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

  const toggle = useCallback((slug: string, variant?: string) => {
    dispatch({ type: "toggle", line: { slug, variant } });
  }, []);

  const remove = useCallback((slug: string, variant?: string) => {
    dispatch({ type: "remove", slug, variant });
  }, []);

  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const isFav = useCallback(
    (slug: string, variant?: string) =>
      state.lines.some((l) => l.slug === slug && l.variant === variant),
    [state.lines],
  );

  const value: FavContextValue = useMemo(
    () => ({
      lines: state.lines,
      count: state.lines.length,
      toggle,
      remove,
      isFav,
      clear,
    }),
    [state.lines, toggle, remove, isFav, clear],
  );

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
