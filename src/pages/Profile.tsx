import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/store'
import Icon from '../components/Icon'

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

export default function Profile() {
  const nav = useNavigate()
  const { user, favorites, selected, logout } = useApp()
  if (!user) return null

  return (
    <main className="page page--narrow">
      <header className="profile__head glass">
        <div className="avatar" aria-hidden="true">
          {initials(user.fullName)}
        </div>
        <div>
          <div className="profile__label">Perfil</div>
          <div className="profile__name">{user.fullName}</div>
        </div>
      </header>

      <dl className="profile__rows glass">
        <div className="prow">
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div className="prow">
          <dt>Recetas favoritas</dt>
          <dd>{favorites.length}</dd>
        </div>
        <div className="prow">
          <dt>Ingredientes en la despensa</dt>
          <dd>{selected.length}</dd>
        </div>
      </dl>

      <div className="profile__actions">
        <button type="button" className="btn btn--outline" onClick={() => nav('/home')}>
          Volver
        </button>
        <button
          type="button"
          className="link-btn"
          onClick={() => {
            logout()
            nav('/login', { replace: true })
          }}
        >
          <Icon name="logout" size={18} /> Cerrar sesión
        </button>
      </div>
    </main>
  )
}
