import { useEffect, type ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useApp } from './state/store'
import Toast from './components/Toast'
import Splash from './pages/Splash'
import Login from './pages/Login'
import Home from './pages/Home'
import Pantry from './pages/Pantry'
import Results from './pages/Results'
import RecipeDetail from './pages/RecipeDetail'
import RecipeSteps from './pages/RecipeSteps'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'

function RequireUser({ children }: { children: ReactNode }) {
  const { user } = useApp()
  const { pathname } = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: pathname }} />
  return children
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.getElementById('phone')?.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className="shell">
      <div className="phone" id="phone">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<RequireUser><Home /></RequireUser>} />
          <Route path="/despensa" element={<RequireUser><Pantry /></RequireUser>} />
          <Route path="/recetas" element={<RequireUser><Results /></RequireUser>} />
          <Route path="/receta/:id" element={<RequireUser><RecipeDetail /></RequireUser>} />
          <Route path="/receta/:id/pasos" element={<RequireUser><RecipeSteps /></RequireUser>} />
          <Route path="/favoritos" element={<RequireUser><Favorites /></RequireUser>} />
          <Route path="/perfil" element={<RequireUser><Profile /></RequireUser>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toast />
      </div>
    </div>
  )
}
