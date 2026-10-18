import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import type { Recipe } from '../data/recipes'
import { useApp } from '../state/store'
import { cardVariants } from './CardGrid'
import Icon from './Icon'

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const nav = useNavigate()
  const { isFavorite, toggleFavorite, showToast } = useApp()
  const fav = isFavorite(recipe.id)

  return (
    <motion.article
      className="card"
      variants={cardVariants}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <button
        type="button"
        className="card__hit"
        onClick={() => nav(`/receta/${recipe.id}`)}
        aria-label={`Abrir ${recipe.fullTitle}`}
      >
        <div className="card__media">
          <img
            src={recipe.image}
            alt=""
            loading="lazy"
            onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
            ref={(el) => {
              if (el?.complete && el.naturalWidth) el.classList.add('is-loaded')
            }}
          />
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
      <motion.button
        type="button"
        className="card__heart"
        aria-pressed={fav}
        aria-label={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        whileTap={{ scale: 0.7 }}
        animate={{ scale: fav ? [1, 1.35, 1] : 1 }}
        transition={{ duration: 0.35 }}
        onClick={() => {
          toggleFavorite(recipe.id)
          showToast(fav ? 'Quitada de favoritos' : 'Guardada en favoritos')
        }}
      >
        <Icon name={fav ? 'favorite' : 'favorite_border'} size={22} />
      </motion.button>
    </motion.article>
  )
}
