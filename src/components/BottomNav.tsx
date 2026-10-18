import { motion } from 'motion/react'
import { NavLink } from 'react-router-dom'
import Icon, { type IconName } from './Icon'

const ITEMS: { to: string; label: string; icon: IconName }[] = [
  { to: '/home', label: 'Inicio', icon: 'home' },
  { to: '/despensa', label: 'Despensa', icon: 'kitchen' },
  { to: '/favoritos', label: 'Favoritos', icon: 'favorite_border' },
  { to: '/perfil', label: 'Perfil', icon: 'person' },
]

export default function BottomNav() {
  return (
    <motion.nav
      className="nav"
      aria-label="Navegación principal"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
    >
      <div className="nav__bar glass">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav__item${isActive ? ' is-active' : ''}`}
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    className="nav__active"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  )
}
