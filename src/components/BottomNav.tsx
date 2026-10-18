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
    <nav className="nav" aria-label="Navegación principal">
      <div className="nav__bar">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav__item${isActive ? ' is-active' : ''}`}
          >
            <span className="nav__pill">
              <Icon name={item.icon} />
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
