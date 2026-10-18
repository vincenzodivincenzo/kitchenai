import { useState } from 'react'
import { Link } from 'react-router-dom'
import { suggest } from '../data/recipes'
import { useApp } from '../state/store'
import CardGrid from '../components/CardGrid'
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
    <main className="page">
      <SearchBar value={q} onChange={setQ} placeholder="Busca tu próxima receta" />

      <div className="count-box glass">
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
        <CardGrid recipes={list} />
      ) : (
        <p className="empty">
          {query ? `No encontramos recetas para “${q}”.` : 'Ninguna receta usa esos ingredientes.'}
        </p>
      )}
    </main>
  )
}
