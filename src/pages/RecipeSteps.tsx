import { useState } from 'react'
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
    <main className="page page--detail">
      <div className="hero">
        <img src={recipe.image} alt={recipe.fullTitle} />
      </div>

      <section className="title-card">
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
      </section>

      <h2 className="section">Receta</h2>
      <ol className="steps">
        {recipe.steps.map((s, i) => (
          <li key={i} className="step">
            <span className="step__n" aria-hidden="true">
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>

      <section className="rate-card" aria-labelledby="rate-title">
        <h2 id="rate-title">¿Que te pareció esta receta?</h2>
        <div className="rate-card__row">
          <button type="button" onClick={share} aria-label="Compartir receta">
            <Icon name="share" />
          </button>
          <button
            type="button"
            onClick={() => {
              toggleFavorite(recipe.id)
              showToast(fav ? 'Quitada de favoritos' : 'Guardada en favoritos')
            }}
            aria-pressed={fav}
            aria-label={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          >
            <Icon name={fav ? 'favorite' : 'favorite_border'} />
          </button>
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

        {rating ? (
          <div className="rate-card__panel">
            <Stars
              value={myRating ?? 0}
              size={32}
              onChange={(v) => {
                rate(recipe.id, v)
                setRating(false)
                showToast(`¡Gracias! Puntuaste con ${v} estrella${v === 1 ? '' : 's'}`)
              }}
            />
          </div>
        ) : null}

        {comment ? (
          <form
            className="rate-card__panel"
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
          </form>
        ) : null}
      </section>

      <div className="actions">
        <button type="button" className="btn btn--outline" onClick={() => nav(-1)}>
          Volver
        </button>
      </div>
    </main>
  )
}
