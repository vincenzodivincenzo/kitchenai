import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASICS, BASICS_FIRST, BASICS_MORE } from '../data/recipes'
import { useApp } from '../state/store'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import SearchBar from '../components/SearchBar'

type Recognition = {
  lang: string
  interimResults: boolean
  continuous: boolean
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
}
type RecognitionCtor = new () => Recognition

function getRecognition(): RecognitionCtor | undefined {
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor
    webkitSpeechRecognition?: RecognitionCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition
}

const INFO_KEY = 'kitchenai:pantry-info-dismissed'

export default function Pantry() {
  const nav = useNavigate()
  const { selected, custom, toggleIngredient, addIngredient, removeIngredient, clearIngredients, showToast } =
    useApp()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(true)
  const [showMore, setShowMore] = useState(false)
  const [sheet, setSheet] = useState(false)
  const [listening, setListening] = useState(false)
  const [info, setInfo] = useState(() => {
    try {
      return localStorage.getItem(INFO_KEY) !== '1'
    } catch {
      return true
    }
  })
  const rec = useRef<Recognition | null>(null)

  useEffect(() => () => rec.current?.stop(), [])

  const basicsSelected = selected.filter((s) => BASICS.includes(s)).length
  const visibleBasics = showMore ? BASICS : BASICS_FIRST
  const query = q.trim().toLowerCase()
  const suggestions = query
    ? BASICS.filter((b) => b.includes(query) && !selected.includes(b)).slice(0, 6)
    : []

  function add(name: string) {
    addIngredient(name)
    setQ('')
    showToast(`${name} agregado`)
  }

  function dismissInfo() {
    setInfo(false)
    try {
      localStorage.setItem(INFO_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  function voice() {
    if (listening) {
      rec.current?.stop()
      return
    }
    const Ctor = getRecognition()
    if (!Ctor) {
      showToast('Tu navegador no soporta dictado. Escribe los ingredientes arriba.')
      return
    }
    const r = new Ctor()
    r.lang = 'es-ES'
    r.interimResults = false
    r.continuous = false
    r.onresult = (e) => {
      const text = Array.from(e.results)
        .map((res) => res[0]?.transcript ?? '')
        .join(' ')
      const parts = text
        .toLowerCase()
        .split(/,|\sy\s|\se\s/)
        .map((p) => p.trim())
        .filter(Boolean)
      parts.forEach((p) => addIngredient(p))
      showToast(parts.length ? `Agregados: ${parts.join(', ')}` : 'No entendí, intenta de nuevo')
    }
    r.onerror = () => {
      setListening(false)
      showToast('No pudimos escucharte. Revisa el permiso del micrófono.')
    }
    r.onend = () => setListening(false)
    rec.current = r
    setListening(true)
    r.start()
  }

  return (
    <>
      <main className="page">
        <SearchBar
          value={q}
          onChange={setQ}
          placeholder="Agregar ingredientes"
          onSubmit={(v) => v.trim() && add(v.trim().toLowerCase())}
        />
        {suggestions.length ? (
          <div className="suggest">
            {suggestions.map((s) => (
              <button key={s} type="button" className="ichip" onClick={() => add(s)}>
                <Icon name="add" size={14} /> {s}
              </button>
            ))}
          </div>
        ) : null}

        <section className="voice">
          <h2>Usa su voz</h2>
          <p>Dicta tus ingredientes</p>
          <button
            type="button"
            className={`mic${listening ? ' is-listening' : ''}`}
            onClick={voice}
            aria-label={listening ? 'Detener dictado' : 'Dictar ingredientes'}
            aria-pressed={listening}
          >
            <Icon name="mic" size={28} />
          </button>
        </section>

        {info ? (
          <aside className="info">
            <Icon name="info" size={20} />
            <span>
              Los únicos ingredientes que, se supone, siempre hay en su casa son sal, pimienta y
              agua.
            </span>
            <button type="button" onClick={dismissInfo} aria-label="Cerrar aviso">
              <Icon name="close" size={20} />
            </button>
          </aside>
        ) : null}

        <button
          type="button"
          className="basics"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <span className="basics__emoji" aria-hidden="true">
            🥛
          </span>
          <span>
            <span className="basics__t">Los básicos</span>
            <span className="basics__c">
              {basicsSelected}/{BASICS.length} ingredientes
            </span>
          </span>
          <span className="basics__chev">
            <Icon name={open ? 'expand_less' : 'expand_more'} />
          </span>
        </button>

        {open ? (
          <div className="ing-chips">
            {visibleBasics.map((b) => {
              const on = selected.includes(b)
              return (
                <button
                  key={b}
                  type="button"
                  className={`ichip${on ? ' is-on' : ''}`}
                  aria-pressed={on}
                  onClick={() => toggleIngredient(b)}
                >
                  {b}
                </button>
              )
            })}
            <button
              type="button"
              className="ichip ichip--more"
              onClick={() => setShowMore((m) => !m)}
            >
              {showMore ? 'ver menos' : `+${BASICS_MORE.length} más`}
            </button>
          </div>
        ) : null}

        {custom.length ? (
          <>
            <h2 className="section section--sm">Tus ingredientes</h2>
            <div className="ing-chips">
              {custom.map((c) => {
                const on = selected.includes(c)
                return (
                  <button
                    key={c}
                    type="button"
                    className={`ichip${on ? ' is-on' : ''}`}
                    aria-pressed={on}
                    onClick={() => toggleIngredient(c)}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </>
        ) : null}

        <div className="pantry-actions">
          <button type="button" className="btn btn--outline" onClick={() => setSheet(true)}>
            Seleccionados
            {selected.length ? <span className="badge">{selected.length}</span> : null}
          </button>
          <button type="button" className="btn btn--green" onClick={() => nav('/recetas')}>
            Ver recetas
          </button>
        </div>
      </main>
      <BottomNav />

      {sheet ? (
        <div className="sheet-backdrop" onClick={() => setSheet(false)}>
          <div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sheet__head">
              <h2 id="sheet-title">Seleccionados ({selected.length})</h2>
              <button type="button" onClick={() => setSheet(false)} aria-label="Cerrar">
                <Icon name="close" />
              </button>
            </div>
            {selected.length ? (
              <div className="ing-chips ing-chips--plain">
                {selected.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="ichip is-on"
                    onClick={() => (BASICS.includes(s) ? toggleIngredient(s) : removeIngredient(s))}
                    aria-label={`Quitar ${s}`}
                  >
                    {s} <Icon name="close" size={14} />
                  </button>
                ))}
              </div>
            ) : (
              <p className="empty">Todavía no elegiste ingredientes.</p>
            )}
            <div className="sheet__actions">
              {selected.length ? (
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => {
                    clearIngredients()
                    setSheet(false)
                  }}
                >
                  Limpiar
                </button>
              ) : null}
              <button
                type="button"
                className="btn btn--green"
                onClick={() => {
                  setSheet(false)
                  nav('/recetas')
                }}
              >
                Ver recetas
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
