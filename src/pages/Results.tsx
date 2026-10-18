import { useState } from 'react'
import { Link } from 'react-router-dom'
import { suggest } from '../data/recipes'
import { useApp } from '../state/store'
import BottomNav from '../components/BottomNav'
import RecipeCard from '../components/RecipeCard'
import SearchBar from '../components/SearchBar'

export default function Results() {
  const { selected } = useApp()
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()
  const all = suggest(selected)
  const list = query
    ? all.filter((r) => `${r.title} ${r.subtitle} ${r.fullTitle}`.toLowerCase().includes(query))
    : all

  return (
    <>
      <main className="page">
        <SearchBar value={q} onChange={setQ} placeholder="Busca tu próxima receta" />

        <div className="count-box">
          {selected.length ? (
            <>
              Se pueden cocinar
              <strong>{all.length}</strong>
              {all.length === 1 ? 'plato' : 'platos'} con tus ingredientes
            </>
          ) : (
            <>
              Elige ingredientes en tu{' '}
              <Link to="/despensa" className="link">
                despensa
              </Link>{' '}
              para afinar la búsqueda
            </>
          )}
        </div>

        <h2 className="section">Recetas sugeridas</h2>
        {list.length ? (
          <div className="grid">
            {list.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        ) : (
          <p className="empty">
            {query ? `No encontramos recetas para “${q}”.` : 'Ninguna receta usa esos ingredientes.'}
          </p>
        )}
      </main>
      <BottomNav />
    </>
  )
}
