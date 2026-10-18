import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { findRecipe } from '../data/recipes'
import { useApp } from '../state/store'
import Icon from '../components/Icon'
import Stars from '../components/Stars'

export default function RecipeSteps() {
  const { id } = useParams()
  const nav = useNavigate()
  const { isFavorite, toggleFavorite, showToast, ratings, rate } = useApp()
  const [rating, setRating] = useState(false)
  const [comment, setComment] = useState(false)
  const [text, setText] = useState('')
  const recipe = findRecipe(id)
  if (!recipe) return <Navigate to="/home" replace />

  const fav = isFavorite(recipe.id)
  const myRating = ratings[recipe.id]

  async function share() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: recipe!.fullTitle, url })
        return
      }
      await navigator.clipboard.writeText(url)
      showToast('Enlace copiado')
    } catch {
      /* user cancelled the share sheet */
    }
  }

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
            <Icon name="person" size={18} /> {recipe.servings}{' '}
            {recipe.servings === 1 ? 'Ración' : 'Raciones'}
          </p>
        </div>
        <div className="title-card__meta">
          <Stars value={myRating ?? recipe.rating} />
          <span className="meta-time">
            <Icon name="alarm" size={18} /> {recipe.minutes} mins
          </span>
        </div>
      </motion.section>

      <h2 className="section">Receta</h2>
      <motion.ol
        className="steps glass"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
      >
        {recipe.steps.map((s, i) => (
          <motion.li
            key={i}
            className="step"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 340, damping: 28 } },
            }}
          >
            <span className="step__n" aria-hidden="true">
              {i + 1}
            </span>
            <span>{s}</span>
          </motion.li>
        ))}
      </motion.ol>

      <section className="rate-card glass" aria-labelledby="rate-title">
        <h2 id="rate-title">¿Que te pareció esta receta?</h2>
        <div className="rate-card__row">
          <button type="button" onClick={share} aria-label="Compartir receta">
            <Icon name="share" />
          </button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.7 }}
            animate={{ scale: fav ? [1, 1.35, 1] : 1 }}
            transition={{ duration: 0.35 }}
            onClick={() => {
              toggleFavorite(recipe.id)
              showToast(fav ? 'Quitada de favoritos' : 'Guardada en favoritos')
            }}
            aria-pressed={fav}
            aria-label={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          >
            <Icon name={fav ? 'favorite' : 'favorite_border'} />
          </motion.button>
          <button
            type="button"
            onClick={() => {
              setComment((c) => !c)
              setRating(false)
            }}
            aria-expanded={comment}
            aria-label="Dejar un comentario"
          >
            <Icon name="comment" />
          </button>
          <button
            type="button"
            onClick={() => {
              setRating((r) => !r)
              setComment(false)
            }}
            aria-expanded={rating}
            aria-label="Puntuar receta"
          >
            <Icon name={myRating ? 'star' : 'star_border'} />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {rating ? (
            <motion.div
              key="rating"
              className="rate-card__panel"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.22 }}
            >
              <Stars
                value={myRating ?? 0}
                size={34}
                onChange={(v) => {
                  rate(recipe.id, v)
                  setRating(false)
                  showToast(`¡Gracias! Puntuaste con ${v} estrella${v === 1 ? '' : 's'}`)
                }}
              />
            </motion.div>
          ) : null}

          {comment ? (
            <motion.form
              key="comment"
              className="rate-card__panel"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.22 }}
              onSubmit={(e) => {
                e.preventDefault()
                if (!text.trim()) return
                setText('')
                setComment(false)
                showToast('Comentario enviado. ¡Gracias!')
              }}
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Contanos cómo te salió"
                rows={3}
                aria-label="Comentario"
              />
              <button type="submit" className="btn btn--primary">
                Enviar
              </button>
            </motion.form>
          ) : null}
        </AnimatePresence>
      </section>

      <div className="actions">
        <button type="button" className="btn btn--outline" onClick={() => nav(-1)}>
          Volver
        </button>
      </div>
    </main>
  )
}
