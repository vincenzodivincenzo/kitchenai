import { Link } from 'react-router-dom'
import { RECIPES } from '../data/recipes'
import { useApp } from '../state/store'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import RecipeCard from '../components/RecipeCard'

export default function Favorites() {
  const { favorites } = useApp()
  const list = RECIPES.filter((r) => favorites.includes(r.id))

  return (
    <>
      <main className="page">
        <header className="home-head">
          <div>
            <h1>Favoritos</h1>
            <p>
              {list.length
                ? `${list.length} receta${list.length === 1 ? '' : 's'} guardada${list.length === 1 ? '' : 's'}`
                : 'Tus recetas guardadas'}
            </p>
          </div>
        </header>

        {list.length ? (
          <div className="grid grid--top">
            {list.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Icon name="favorite_border" size={56} />
            <p>Todavía no guardaste recetas.</p>
            <p className="empty-state__hint">Toca el corazón de una receta para tenerla a mano.</p>
            <Link to="/home" className="btn btn--primary">
              Explorar recetas
            </Link>
          </div>
        )}
      </main>
      <BottomNav />
    </>
  )
}
