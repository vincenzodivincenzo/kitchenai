import { motion } from 'motion/react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { findRecipe, matchInfo } from '../data/recipes'
import { useApp } from '../state/store'
import Icon from '../components/Icon'
import Stars from '../components/Stars'

export default function RecipeDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const { selected, addIngredient, showToast, ratings } = useApp()
  const recipe = findRecipe(id)
  if (!recipe) return <Navigate to="/home" replace />

  const { missing } = matchInfo(recipe, selected)
  const missingKeys = new Set(missing.map((m) => m.key))
  const rating = ratings[recipe.id] ?? recipe.rating

  return (
    <main className="page page--narrow page--nonav">
      <div className="hero">
        <motion.img
          src={recipe.image}
          alt={recipe.fullTitle}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </div>

      <motion.section
        className="title-card glass glass--strong"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, type: 'spring', stiffness: 300, damping: 28 }}
      >
        <div className="title-card__top">
          <h1>{recipe.fullTitle}</h1>
          <p className="title-card__note">
            {missing.length === 0
              ? 'Tienes todos los ingredientes'
              : `Te falta${missing.length === 1 ? '' : 'n'} ${missing.length} ingrediente${missing.length === 1 ? '' : 's'}`}
          </p>
        </div>
        <div className="title-card__meta">
          <Stars value={rating} />
          <span className="meta-time">
            <Icon name="alarm" size={18} /> {recipe.minutes} mins
          </span>
        </div>
      </motion.section>

      <h2 className="section">Ingredientes</h2>
      <motion.ul
        className="ing-list"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } } }}
      >
        {recipe.ingredients.map((ing) => {
          const isMissing = missingKeys.has(ing.key)
          return (
            <motion.li
              key={ing.key}
              className={`ing glass${isMissing ? ' is-missing' : ''}`}
              variants={{
                hidden: { opacity: 0, x: -14 },
                show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 340, damping: 28 } },
              }}
            >
              <span className="ing__emoji" aria-hidden="true">
                {ing.emoji}
              </span>
              <span>
                <span className="ing__name">{ing.name}</span>
                <span className="ing__qty">{ing.qty}</span>
              </span>
              {isMissing ? (
                <button
                  type="button"
                  className="ing__badge"
                  onClick={() => {
                    addIngredient(ing.key)
                    showToast(`${ing.key} agregado a tu despensa`)
                  }}
                  aria-label={`Agregar ${ing.key} a la despensa`}
                >
                  <Icon name="add" size={14} /> Lo tengo
                </button>
              ) : null}
            </motion.li>
          )
        })}
      </motion.ul>

      <div className="actions">
        <button type="button" className="btn btn--outline" onClick={() => nav(-1)}>
          Volver
        </button>
        <button
          type="button"
          className="btn btn--green"
          onClick={() => nav(`/receta/${recipe.id}/pasos`)}
        >
          Ver receta
        </button>
      </div>
    </main>
  )
}
