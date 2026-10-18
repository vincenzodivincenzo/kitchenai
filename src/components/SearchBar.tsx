import type { FormEvent } from 'react'
import Icon from './Icon'

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder: string
  onSubmit?: (v: string) => void
  autoFocus?: boolean
}

export default function SearchBar({ value, onChange, placeholder, onSubmit, autoFocus }: Props) {
  function submit(e: FormEvent) {
    e.preventDefault()
    onSubmit?.(value)
  }
  return (
    <form className="search" role="search" onSubmit={submit}>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
      />
      <button type="submit" aria-label="Buscar">
        <Icon name="search" />
      </button>
    </form>
  )
}
