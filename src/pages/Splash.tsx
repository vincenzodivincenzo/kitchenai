import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/store'
import { SPLASH_IMAGE } from '../data/recipes'
import Logo from '../components/Logo'

export default function Splash() {
  const nav = useNavigate()
  const { user } = useApp()
  const next = user ? '/home' : '/login'

  useEffect(() => {
    const t = window.setTimeout(() => nav(next, { replace: true }), 1800)
    return () => window.clearTimeout(t)
  }, [nav, next])

  return (
    <button
      type="button"
      className="splash"
      style={{ backgroundImage: `url(${SPLASH_IMAGE})` }}
      onClick={() => nav(next, { replace: true })}
      aria-label="Entrar a KitchenAi"
    >
      <div className="splash__card">
        <div className="splash__logo">
          <Logo />
        </div>
        <span className="splash__name">KitchenAi</span>
      </div>
    </button>
  )
}
