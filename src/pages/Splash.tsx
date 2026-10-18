import { useEffect } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/store'
import { SPLASH_IMAGE } from '../data/recipes'
import Logo from '../components/Logo'

export default function Splash() {
  const nav = useNavigate()
  const { user } = useApp()
  const next = user ? '/home' : '/login'

  useEffect(() => {
    const t = window.setTimeout(() => nav(next, { replace: true }), 1900)
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
      <motion.div
        className="splash__card"
        initial={{ scale: 0.7, opacity: 0, rotate: -4 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      >
        <motion.div
          className="splash__logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 18 }}
        >
          <Logo />
        </motion.div>
        <motion.span
          className="splash__name"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          KitchenAi
        </motion.span>
      </motion.div>
    </button>
  )
}
