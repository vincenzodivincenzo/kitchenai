import { AnimatePresence, motion } from 'motion/react'
import { useApp } from '../state/store'

export default function Toast() {
  const { toast } = useApp()
  return (
    <div className="toast-wrap" aria-live="polite">
      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast}
            className="toast"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
