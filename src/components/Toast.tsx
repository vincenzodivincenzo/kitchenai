import { useApp } from '../state/store'

export default function Toast() {
  const { toast } = useApp()
  return (
    <div className="toast-wrap" aria-live="polite">
      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  )
}
