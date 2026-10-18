import Icon from './Icon'

type Props = { value: number; onChange?: (v: number) => void; size?: number }

export default function Stars({ value, onChange, size = 18 }: Props) {
  const stars = [1, 2, 3, 4, 5]
  if (!onChange) {
    return (
      <span className="stars" role="img" aria-label={`${value} de 5 estrellas`}>
        {stars.map((n) => (
          <Icon key={n} name={n <= value ? 'star' : 'star_border'} size={size} />
        ))}
      </span>
    )
  }
  return (
    <span className="stars stars--input" role="radiogroup" aria-label="Tu puntuación">
      {stars.map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={n === value}
          aria-label={`${n} estrellas`}
          onClick={() => onChange(n)}
        >
          <Icon name={n <= value ? 'star' : 'star_border'} size={size} />
        </button>
      ))}
    </span>
  )
}
