import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { RECIPES, type Meal } from '../data/recipes'
import { useApp } from '../state/store'
import CardGrid from '../components/CardGrid'
import Icon from '../components/Icon'
import SearchBar from '../components/SearchBar'

const MEALS: Meal[] = ['Desayuno', 'Almuerzo', 'Cena']

export default function Home() {
  const { user, showToast, favorites } = useApp()
  const [meal, setMeal] = useState<Meal>('Desayuno')
  const [searching, setSearching] = useState(false)
  const [q, setQ] = useState('')

  const query = q.trim().toLowerCase()
  const list = RECIPES.filter(
    (r) =>
      (query ? true : r.meals.includes(meal)) &&
      (!query || `${r.title} ${r.subtitle} ${r.fullTitle}`.toLowerCase().includes(query)),
  ).sort((a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)))

  return (
    <main className="page">
      <header className="home-head">
        <div>
          <h1>Hola, {user?.name}</h1>
          <p>¿Qué cocinamos hoy?</p>
        </div>
        <div className="home-head__icons">
          <button
            type="button"
            className="glass"
            aria-label="Notificaciones"
            onClick={() =>
              showToast(
                favorites.length
                  ? `Tienes ${favorites.length} receta${favorites.length === 1 ? '' : 's'} guardada${favorites.length === 1 ? '' : 's'} para cocinar`
                  : 'Sin notificaciones nuevas',
              )
            }
          >
            <Icon name="notifications" />
          </button>
          <button
            type="button"
            className="glass"
            aria-label="Buscar recetas"
            aria-expanded={searching}
            onClick={() => {
              setSearching((s) => !s)
              setQ('')
            }}
          >
            <Icon name={searching ? 'close' : 'search'} />
          </button>
        </div>
      </header>

      <AnimatePresence initial={false}>
        {searching ? (
          <motion.div
            key="search"
            className="home-search"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.22 }}
          >
            <SearchBar value={q} onChange={setQ} placeholder="Busca tu próxima receta" autoFocus />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="chips glass" role="tablist" aria-label="Momento del día">
        {MEALS.map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={meal === m && !query}
            className={`chip${meal === m && !query ? ' is-active' : ''}`}
            onClick={() => {
              setMeal(m)
              setQ('')
            }}
          >
            {m}
          </button>
        ))}
      </div>

      <h2 className="section">{query ? 'Resultados' : 'Lo más buscado'}</h2>
      {list.length ? (
        <CardGrid key={query ? 'search' : meal} recipes={list} />
      ) : (
        <p className="empty">No encontramos recetas para “{q}”.</p>
      )}
    </main>
  )
}
