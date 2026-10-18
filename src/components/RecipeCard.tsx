import { useNavigate } from 'react-router-dom'
import type { Recipe } from '../data/recipes'
import { useApp } from '../state/store'
import Icon from './Icon'

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const nav = useNavigate()
  const { isFavorite, toggleFavorite, showToast } = useApp()
  const fav = isFavorite(recipe.id)

  return (
    <article className="card">
      <button
        type="button"
        className="card__hit"
        onClick={() => nav(`/receta/${recipe.id}`)}
        aria-label={`Abrir ${recipe.fullTitle}`}
      >
        <div className="card__media">
          <img src={recipe.image} alt="" loading="lazy" />
        </div>
        <div className="card__body">
          <div className="card__title">{recipe.title}</div>
          <div className="card__sub">{recipe.subtitle}</div>
          <div className="card__meta">
            <span className="card__stat">
              {recipe.rating} <Icon name="star" size={14} />
            </span>
            <span className="card__stat">
              <Icon name="alarm" size={14} /> {recipe.minutes}min
            </span>
          </div>
        </div>
      </button>
      <button
        type="button"
        className={`card__heart${fav ? ' is-on' : ''}`}
        aria-pressed={fav}
        aria-label={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        onClick={() => {
          toggleFavorite(recipe.id)
          showToast(fav ? 'Quitada de favoritos' : 'Guardada en favoritos')
        }}
      >
        <Icon name={fav ? 'favorite' : 'favorite_border'} size={22} />
      </button>
    </article>
  )
}
