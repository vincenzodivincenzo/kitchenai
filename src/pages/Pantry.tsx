import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { BASICS, BASICS_FIRST, BASICS_MORE } from '../data/recipes'
import { useApp } from '../state/store'
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

const collapse = {
  initial: { opacity: 0, height: 0, marginTop: 0 },
  animate: { opacity: 1, height: 'auto', marginTop: 12 },
  exit: { opacity: 0, height: 0, marginTop: 0 },
  transition: { duration: 0.24, ease: [0.2, 0.8, 0.2, 1] as const },
}

export default function Pantry() {
  const nav = useNavigate()
  const {
    selected,
    custom,
    toggleIngredient,
    addIngredient,
    removeIngredient,
    clearIngredients,
    showToast,
  } = useApp()
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

  useEffect(() => {
    if (!sheet) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sheet])

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

  const chip = (name: string) => {
    const on = selected.includes(name)
    return (
      <motion.button
        key={name}
        type="button"
        layout
        className={`ichip${on ? ' is-on' : ''}`}
        aria-pressed={on}
        whileTap={{ scale: 0.92 }}
        onClick={() => toggleIngredient(name)}
      >
        {name}
      </motion.button>
    )
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
        <AnimatePresence>
          {suggestions.length ? (
            <motion.div
              key="suggest"
              className="suggest"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {suggestions.map((s) => (
                <button key={s} type="button" className="ichip" onClick={() => add(s)}>
                  <Icon name="add" size={14} /> {s}
                </button>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="voice glass">
          <h2>Usa su voz</h2>
          <p>Dicta tus ingredientes</p>
          <motion.button
            type="button"
            className={`mic${listening ? ' is-listening' : ''}`}
            onClick={voice}
            whileTap={{ scale: 0.9 }}
            aria-label={listening ? 'Detener dictado' : 'Dictar ingredientes'}
            aria-pressed={listening}
          >
            <Icon name="mic" size={30} />
          </motion.button>
        </section>

        <AnimatePresence initial={false}>
          {info ? (
            <motion.aside
              key="info"
              className="info glass"
              initial={{ opacity: 1, height: 'auto', marginTop: 16 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0 }}
              transition={{ duration: 0.22 }}
            >
              <Icon name="info" size={20} />
              <span>
                Los únicos ingredientes que, se supone, siempre hay en su casa son sal, pimienta y
                agua.
              </span>
              <button type="button" onClick={dismissInfo} aria-label="Cerrar aviso">
                <Icon name="close" size={20} />
              </button>
            </motion.aside>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          className="basics glass"
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
          <motion.span
            className="basics__chev"
            animate={{ rotate: open ? 0 : 180 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <Icon name="expand_less" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div key="basics" className="ing-chips glass" {...collapse}>
              {visibleBasics.map(chip)}
              <button
                type="button"
                className="ichip ichip--more"
                onClick={() => setShowMore((m) => !m)}
              >
                {showMore ? 'ver menos' : `+${BASICS_MORE.length} más`}
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {custom.length ? (
          <>
            <h2 className="section section--sm">Tus ingredientes</h2>
            <div className="ing-chips glass" style={{ marginTop: 0 }}>
              {custom.map(chip)}
            </div>
          </>
        ) : null}

        <div className="pantry-actions">
          <button type="button" className="btn btn--outline" onClick={() => setSheet(true)}>
            Seleccionados
            <AnimatePresence>
              {selected.length ? (
                <motion.span
                  key="badge"
                  className="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {selected.length}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </button>
          <button type="button" className="btn btn--green" onClick={() => nav('/recetas')}>
            Ver recetas
          </button>
        </div>
      </main>

      <AnimatePresence>
        {sheet ? (
          <motion.div
            key="sheet"
            className="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheet(false)}
          >
            <motion.div
              className="sheet glass glass--strong"
              role="dialog"
              aria-modal="true"
              aria-labelledby="sheet-title"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sheet__handle" aria-hidden="true" />
              <div className="sheet__head">
                <h2 id="sheet-title">Seleccionados ({selected.length})</h2>
                <button type="button" onClick={() => setSheet(false)} aria-label="Cerrar">
                  <Icon name="close" />
                </button>
              </div>
              {selected.length ? (
                <div className="ing-chips ing-chips--plain">
                  {selected.map((s) => (
                    <motion.button
                      key={s}
                      layout
                      type="button"
                      className="ichip is-on"
                      whileTap={{ scale: 0.92 }}
                      onClick={() =>
                        BASICS.includes(s) ? toggleIngredient(s) : removeIngredient(s)
                      }
                      aria-label={`Quitar ${s}`}
                    >
                      {s} <Icon name="close" size={14} />
                    </motion.button>
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
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
