import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { BASICS } from '../data/recipes'

export type User = { name: string; fullName: string; email: string }

type Persisted = {
  user: User | null
  favorites: string[]
  selected: string[]
  custom: string[]
  ratings: Record<string, number>
}

const KEY = 'kitchenai:v1'
const empty: Persisted = { user: null, favorites: [], selected: [], custom: [], ratings: {} }

function load(): Persisted {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...empty, ...(JSON.parse(raw) as Partial<Persisted>) }
  } catch {
    /* storage unavailable: start empty */
  }
  return empty
}

type Ctx = Persisted & {
  login: (email: string, name?: string) => void
  logout: () => void
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  toggleIngredient: (name: string) => void
  addIngredient: (name: string) => void
  removeIngredient: (name: string) => void
  clearIngredients: () => void
  rate: (id: string, stars: number) => void
  toast: string | null
  showToast: (msg: string) => void
}

const AppContext = createContext<Ctx | null>(null)

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function nameFromEmail(email: string) {
  const local = email.split('@')[0].replace(/[._\-+0-9]+/g, ' ').trim()
  return capitalize(local.split(' ')[0] || 'chef')
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(load)
  const [toast, setToast] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable: keep in memory only */
    }
  }, [state])

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(null), 2400)
  }, [])

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      toast,
      showToast,
      login: (email, name) => {
        const first = name?.trim() ? capitalize(name.trim().split(' ')[0]) : nameFromEmail(email)
        const fullName =
          name?.trim() || (first.toLowerCase() === 'mica' ? 'Micaela Tamara Gomez Zanini' : first)
        setState((s) => ({ ...s, user: { name: first, fullName, email: email.trim() } }))
      },
      logout: () => setState((s) => ({ ...s, user: null })),
      toggleFavorite: (id) =>
        setState((s) => ({
          ...s,
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [...s.favorites, id],
        })),
      isFavorite: (id) => state.favorites.includes(id),
      toggleIngredient: (n) =>
        setState((s) => ({
          ...s,
          selected: s.selected.includes(n) ? s.selected.filter((x) => x !== n) : [...s.selected, n],
        })),
      addIngredient: (raw) => {
        const n = raw.trim().toLowerCase()
        if (!n) return
        setState((s) => ({
          ...s,
          custom: BASICS.includes(n) || s.custom.includes(n) ? s.custom : [...s.custom, n],
          selected: s.selected.includes(n) ? s.selected : [...s.selected, n],
        }))
      },
      removeIngredient: (n) =>
        setState((s) => ({
          ...s,
          selected: s.selected.filter((x) => x !== n),
          custom: s.custom.filter((x) => x !== n),
        })),
      clearIngredients: () => setState((s) => ({ ...s, selected: [], custom: [] })),
      rate: (id, stars) => setState((s) => ({ ...s, ratings: { ...s.ratings, [id]: stars } })),
    }),
    [state, toast, showToast],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
