import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../state/store'
import Icon from '../components/Icon'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SOCIAL = [
  { id: 'Instagram', icon: 'instagram' },
  { id: 'Google', icon: 'google' },
  { id: 'Facebook', icon: 'facebook' },
  { id: 'WhatsApp', icon: 'whatsapp' },
] as const

export default function Login() {
  const nav = useNavigate()
  const loc = useLocation()
  const { login, showToast } = useApp()
  const dest = (loc.state as { from?: string } | null)?.from ?? '/home'

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [show, setShow] = useState(false)
  const [tried, setTried] = useState(false)
  const [msg, setMsg] = useState('')

  const emailOk = EMAIL_RE.test(email)
  const passOk = pass.length >= 6
  const nameOk = mode === 'login' || name.trim().length > 0
  const emailErr = tried && !emailOk
  const passErr = tried && !passOk
  const nameErr = tried && !nameOk

  function submit(e: FormEvent) {
    e.preventDefault()
    setTried(true)
    if (!emailOk || !passOk || !nameOk) {
      setMsg(
        mode === 'register'
          ? 'Completa todos los campos. La contraseña necesita 6 caracteres o más.'
          : 'Revisa tu email y contraseña (mínimo 6 caracteres).',
      )
      return
    }
    setMsg('')
    login(email, mode === 'register' ? name : undefined)
    nav(dest, { replace: true })
  }

  function social(provider: string) {
    login('mica@gmail.com')
    showToast(`Sesión iniciada con ${provider}`)
    nav(dest, { replace: true })
  }

  function forgot() {
    if (!emailOk) {
      setTried(true)
      setMsg('Escribe tu email para recuperar la contraseña.')
      return
    }
    setMsg('')
    showToast(`Te enviamos un enlace a ${email}`)
  }

  function switchMode() {
    setMode((m) => (m === 'login' ? 'register' : 'login'))
    setTried(false)
    setMsg('')
  }

  return (
    <main className="page login">
      <form className="login__form" onSubmit={submit} noValidate>
        {mode === 'register' ? (
          <div className={`field${nameErr ? ' is-error' : ''}`}>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="given-name"
            />
          </div>
        ) : null}

        <div className={`field${emailErr ? ' is-error' : ''}`}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-invalid={emailErr}
          />
          {email ? (
            <button
              type="button"
              className="field__icon"
              onClick={() => setEmail('')}
              aria-label="Borrar email"
            >
              <Icon name="cancel" />
            </button>
          ) : null}
        </div>

        <div className={`field${passErr ? ' is-error' : ''}`}>
          <label htmlFor="pass">Contraseña</label>
          <input
            id="pass"
            type={show ? 'text' : 'password'}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            aria-invalid={passErr}
          />
          <button
            type="button"
            className="field__icon"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={show}
          >
            <Icon name={show ? 'visibility' : 'visibility_off'} />
          </button>
        </div>

        {msg ? (
          <p className="login__msg" role="alert">
            {msg}
          </p>
        ) : null}

        <button type="submit" className="btn btn--dark login__submit">
          {mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
        </button>

        {mode === 'login' ? (
          <button type="button" className="login__link" onClick={forgot}>
            ¿Olvidaste tu contraseña?
          </button>
        ) : null}
      </form>

      <div className="login__alt">
        <p>O inicia sesión con</p>
        <div className="social">
          {SOCIAL.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => social(s.id)}
              aria-label={`Iniciar sesión con ${s.id}`}
            >
              <Icon name={s.icon} />
            </button>
          ))}
        </div>
        <p>
          {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button type="button" className="link" onClick={switchMode}>
            {mode === 'login' ? 'Regístrate' : 'Ingresa'}
          </button>
        </p>
      </div>
    </main>
  )
}
