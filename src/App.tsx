import { useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useApp } from './state/store'
import Background from './components/Background'
import BottomNav from './components/BottomNav'
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

const NAV_ROUTES = ['/home', '/despensa', '/favoritos', '/perfil', '/recetas']

/** How deep a route sits in the flow; moving deeper slides left, moving back slides right. */
function depth(path: string) {
  if (path === '/') return -1
  if (path === '/login') return 0
  if (path === '/recetas') return 2
  if (path.startsWith('/receta/')) return path.endsWith('/pasos') ? 4 : 3
  return 1
}

const routeVariants: Variants = {
  initial: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 64 : dir < 0 ? -64 : 0,
    scale: dir === 0 ? 0.985 : 1,
    filter: 'blur(6px)',
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -48 : dir < 0 ? 48 : 0,
    scale: dir === 0 ? 0.985 : 1,
    filter: 'blur(6px)',
    transition: { duration: 0.16, ease: 'easeIn' },
  }),
}

function RequireUser({ children }: { children: ReactNode }) {
  const { user } = useApp()
  const { pathname } = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: pathname }} />
  return children
}

export default function App() {
  const location = useLocation()
  const { user } = useApp()
  const current = depth(location.pathname)
  const previous = useRef(current)
  const dir = Math.sign(current - previous.current)

  useEffect(() => {
    previous.current = current
  }, [current])

  const showNav = Boolean(user) && NAV_ROUTES.includes(location.pathname)

  return (
    <>
      <Background />
      <div className="app">
        <AnimatePresence
          mode="wait"
          custom={dir}
          initial={false}
          onExitComplete={() => window.scrollTo({ top: 0 })}
        >
          <motion.div
            key={location.pathname}
            className="route"
            custom={dir}
            variants={routeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Routes location={location}>
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
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence>{showNav ? <BottomNav key="nav" /> : null}</AnimatePresence>
      <Toast />
    </>
  )
}
