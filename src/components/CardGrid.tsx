import { motion, type Variants } from 'motion/react'
import type { Recipe } from '../data/recipes'
import RecipeCard from './RecipeCard'

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
}

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 340, damping: 28 },
  },
}

type Props = { recipes: Recipe[]; className?: string }

export default function CardGrid({ recipes, className = '' }: Props) {
  return (
    <motion.div
      className={`grid ${className}`.trim()}
      variants={gridVariants}
      initial="hidden"
      animate="show"
    >
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </motion.div>
  )
}
