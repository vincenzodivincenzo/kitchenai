export type Meal = 'Desayuno' | 'Almuerzo' | 'Cena'

export type Ingredient = {
  /** Pantry key, lower case, matches an entry of BASICS or a custom ingredient. */
  key: string
  name: string
  qty: string
  emoji: string
}

export type Recipe = {
  id: string
  title: string
  subtitle: string
  fullTitle: string
  image: string
  rating: number
  minutes: number
  servings: number
  meals: Meal[]
  popular?: boolean
  ingredients: Ingredient[]
  steps: string[]
}

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`

export const SPLASH_IMAGE = img('1506368249639-73a05d6f6488')

/** The ten basics shown first in the pantry, then thirty more behind "+30 más". */
export const BASICS_FIRST = [
  'cebolla',
  'huevos',
  'tomate',
  'ajo',
  'leche',
  'arroz',
  'mantequilla',
  'patata',
  'azúcar',
  'zanahoria',
]

export const BASICS_MORE = [
  'harina',
  'aceite de oliva',
  'pan rallado',
  'queso parmesano',
  'queso mozzarella',
  'pechuga de pollo',
  'carne picada',
  'pasta',
  'pimiento',
  'limón',
  'avena',
  'yogur',
  'palta',
  'plátano',
  'frutos rojos',
  'miel',
  'pan',
  'jamón',
  'crema',
  'champiñones',
  'espinaca',
  'lentejas',
  'garbanzos',
  'atún',
  'vinagre',
  'orégano',
  'perejil',
  'canela',
  'nueces',
  'chocolate',
]

export const BASICS = [...BASICS_FIRST, ...BASICS_MORE]

/** Assumed to be in every kitchen, as the pantry screen says. */
export const ALWAYS_AVAILABLE = ['sal', 'pimienta', 'agua']

export const RECIPES: Recipe[] = [
  {
    id: 'tostadas-palta-huevo',
    title: 'Tostadas',
    subtitle: 'Con palta y huevo',
    fullTitle: 'Tostadas con palta y huevo',
    image: img('1525351484163-7529414344d8'),
    rating: 4,
    minutes: 10,
    servings: 1,
    meals: ['Desayuno'],
    popular: true,
    ingredients: [
      { key: 'pan', name: 'Pan', qty: '2 Rebanadas', emoji: '🍞' },
      { key: 'palta', name: 'Palta', qty: '1 Unidad', emoji: '🥑' },
      { key: 'huevos', name: 'Huevos', qty: '2 Unidades', emoji: '🥚' },
      { key: 'limón', name: 'Limón', qty: '½ Unidad', emoji: '🍋' },
    ],
    steps: [
      'Tostamos el pan hasta que quede dorado.',
      'Pisamos la palta con el jugo de limón, sal y pimienta.',
      'Freímos los huevos en una sartén con un poco de aceite, a fuego medio.',
      'Untamos la palta sobre las tostadas y apoyamos un huevo en cada una. Servimos.',
    ],
  },
  {
    id: 'tostadas-huevos-revueltos',
    title: 'Tostadas',
    subtitle: 'Huevos revueltos',
    fullTitle: 'Tostadas con huevos revueltos',
    image: img('1559054663-e8d23213f55c'),
    rating: 4,
    minutes: 10,
    servings: 1,
    meals: ['Desayuno'],
    popular: true,
    ingredients: [
      { key: 'huevos', name: 'Huevos', qty: '3 Unidades', emoji: '🥚' },
      { key: 'leche', name: 'Leche', qty: '2 Cucharadas', emoji: '🥛' },
      { key: 'mantequilla', name: 'Mantequilla', qty: '15gr', emoji: '🧈' },
      { key: 'pan', name: 'Pan', qty: '2 Rebanadas', emoji: '🍞' },
    ],
    steps: [
      'Batimos los huevos con la leche, sal y pimienta.',
      'Derretimos la mantequilla en una sartén a fuego bajo.',
      'Volcamos los huevos y revolvemos despacio hasta que cuajen pero sigan cremosos.',
      'Tostamos el pan y servimos los huevos encima.',
    ],
  },
  {
    id: 'porridge-avena',
    title: 'Porridge de avena',
    subtitle: 'Con fruta',
    fullTitle: 'Porridge de avena con fruta',
    image: img('1517673400267-0251440c45dc'),
    rating: 4,
    minutes: 20,
    servings: 2,
    meals: ['Desayuno'],
    popular: true,
    ingredients: [
      { key: 'avena', name: 'Avena', qty: '80gr', emoji: '🌾' },
      { key: 'leche', name: 'Leche', qty: '250ml', emoji: '🥛' },
      { key: 'plátano', name: 'Plátano', qty: '1 Unidad', emoji: '🍌' },
      { key: 'frutos rojos', name: 'Frutos rojos', qty: '50gr', emoji: '🫐' },
      { key: 'miel', name: 'Miel', qty: '1 Cucharada', emoji: '🍯' },
    ],
    steps: [
      'Ponemos la avena y la leche en una olla a fuego medio.',
      'Cocinamos revolviendo unos 8 minutos hasta que espese.',
      'Servimos en un bowl con el plátano en rodajas y los frutos rojos.',
      'Terminamos con un hilo de miel.',
    ],
  },
  {
    id: 'yogurt-fruta',
    title: 'Yogurt',
    subtitle: 'Con fruta',
    fullTitle: 'Yogurt con fruta y nueces',
    image: img('1488477181946-6428a0291777'),
    rating: 4,
    minutes: 5,
    servings: 1,
    meals: ['Desayuno'],
    popular: true,
    ingredients: [
      { key: 'yogur', name: 'Yogur natural', qty: '200gr', emoji: '🥛' },
      { key: 'frutos rojos', name: 'Frutos rojos', qty: '80gr', emoji: '🍓' },
      { key: 'miel', name: 'Miel', qty: '1 Cucharada', emoji: '🍯' },
      { key: 'nueces', name: 'Nueces', qty: '20gr', emoji: '🌰' },
    ],
    steps: [
      'Ponemos el yogur en un vaso o bowl.',
      'Agregamos los frutos rojos y las nueces picadas por encima.',
      'Terminamos con la miel y servimos frío.',
    ],
  },
  {
    id: 'bechamel-pasta',
    title: 'Béchamel Pasta',
    subtitle: 'A creamy and indulgent',
    fullTitle: 'Pasta con salsa béchamel y pollo',
    image: img('1645112411341-6c4fd023714a'),
    rating: 4,
    minutes: 30,
    servings: 4,
    meals: ['Almuerzo', 'Cena'],
    ingredients: [
      { key: 'pasta', name: 'Pasta', qty: '320gr', emoji: '🍝' },
      { key: 'mantequilla', name: 'Mantequilla', qty: '40gr', emoji: '🧈' },
      { key: 'harina', name: 'Harina', qty: '40gr', emoji: '🌾' },
      { key: 'leche', name: 'Leche', qty: '500ml', emoji: '🥛' },
      { key: 'queso parmesano', name: 'Queso parmesano rallado', qty: '60gr', emoji: '🧀' },
      { key: 'pechuga de pollo', name: 'Pechuga de pollo', qty: '2 Piezas', emoji: '🍗' },
    ],
    steps: [
      'Cocinamos la pasta en abundante agua con sal según el paquete.',
      'Salteamos el pollo cortado en tiras hasta dorar y reservamos.',
      'Derretimos la mantequilla, agregamos la harina y cocinamos 1 minuto.',
      'Sumamos la leche de a poco, revolviendo, hasta tener una salsa espesa. Salpimentamos.',
      'Mezclamos la pasta con la salsa, el pollo y el parmesano. Servimos.',
    ],
  },
  {
    id: 'grilled-skewers',
    title: 'Grilled Skewers',
    subtitle: 'Succulent morsels',
    fullTitle: 'Brochetas de pollo y pimiento a la parrilla',
    image: img('1555939594-58d7cb561ad1'),
    rating: 4,
    minutes: 30,
    servings: 4,
    meals: ['Almuerzo', 'Cena'],
    ingredients: [
      { key: 'pechuga de pollo', name: 'Pechuga de pollo', qty: '3 Piezas', emoji: '🍗' },
      { key: 'pimiento', name: 'Pimiento', qty: '2 Unidades', emoji: '🫑' },
      { key: 'cebolla', name: 'Cebolla', qty: '1 Unidad', emoji: '🧅' },
      { key: 'aceite de oliva', name: 'Aceite de oliva', qty: '2 Cucharadas', emoji: '🫒' },
      { key: 'orégano', name: 'Orégano', qty: '1 Cucharadita', emoji: '🌿' },
      { key: 'limón', name: 'Limón', qty: '1 Unidad', emoji: '🍋' },
    ],
    steps: [
      'Cortamos el pollo, el pimiento y la cebolla en cubos parejos.',
      'Marinamos con aceite, orégano, jugo de limón, sal y pimienta durante 15 minutos.',
      'Armamos las brochetas alternando pollo y verduras.',
      'Cocinamos a la parrilla o plancha 4 minutos por lado hasta dorar. Servimos.',
    ],
  },
  {
    id: 'pasta-champinones',
    title: 'Pasta cremosa',
    subtitle: 'Con champiñones',
    fullTitle: 'Pasta cremosa con champiñones',
    image: img('1551183053-bf91a1d81141'),
    rating: 5,
    minutes: 25,
    servings: 3,
    meals: ['Almuerzo', 'Cena'],
    ingredients: [
      { key: 'pasta', name: 'Pasta', qty: '320gr', emoji: '🍝' },
      { key: 'champiñones', name: 'Champiñones', qty: '250gr', emoji: '🍄' },
      { key: 'crema', name: 'Crema', qty: '200ml', emoji: '🥛' },
      { key: 'ajo', name: 'Ajo', qty: '2 Dientes', emoji: '🧄' },
      { key: 'queso parmesano', name: 'Queso parmesano rallado', qty: '40gr', emoji: '🧀' },
      { key: 'perejil', name: 'Perejil', qty: 'Un puñado', emoji: '🌿' },
    ],
    steps: [
      'Cocinamos la pasta en agua con sal.',
      'Salteamos el ajo picado y los champiñones laminados hasta que doren.',
      'Agregamos la crema y cocinamos 3 minutos a fuego bajo.',
      'Mezclamos con la pasta y el parmesano. Terminamos con perejil.',
    ],
  },
  {
    id: 'milanesa-parmesana',
    title: 'Milanesa de pollo',
    subtitle: 'A la parmesana',
    fullTitle: 'Receta de milanesa de pollo a la parmesana',
    image: img('1599921841143-819065a55cc6'),
    rating: 4,
    minutes: 15,
    servings: 4,
    meals: ['Almuerzo', 'Cena'],
    ingredients: [
      { key: 'huevos', name: 'Huevos', qty: '3 Unidades', emoji: '🥚' },
      { key: 'pechuga de pollo', name: 'Pechugas de pollo sin hueso', qty: '4 Piezas', emoji: '🍗' },
      { key: 'queso parmesano', name: 'Queso parmesano rallado', qty: '200gr', emoji: '🧀' },
      { key: 'pan rallado', name: 'Pan rallado', qty: '150gr', emoji: '🍞' },
      { key: 'harina', name: 'Harina', qty: '100gr', emoji: '🌾' },
      { key: 'queso mozzarella', name: 'Queso mozzarella', qty: '150gr', emoji: '🧀' },
      { key: 'tomate', name: 'Tomate', qty: '2 Unidades', emoji: '🍅' },
      { key: 'cebolla', name: 'Cebolla', qty: '1 Unidad', emoji: '🧅' },
      { key: 'ajo', name: 'Ajo', qty: '1 Diente', emoji: '🧄' },
      { key: 'mantequilla', name: 'Mantequilla', qty: '20gr', emoji: '🧈' },
    ],
    steps: [
      'Marinamos el pollo con sal y pimienta, lo pasamos por harina, luego por huevo batido y por último por panko.',
      'Lo freímos en suficiente aceite y reservamos.',
      'Colocamos las milanesas en una fuente de horno. Picamos la mozzarella en rodajas y se lo colocamos a cada milanesa y llevamos al horno por 5 min.',
      'Mientras vamos haciendo la salsa. Picamos la cebolla bien pequeñita y el ajo, sofreímos en mantequilla, agregamos el tomate y las especies, comprobamos sabor, dejamos cocinar por unos 10 min a fuego medio bajo.',
      'Lo freímos en suficiente aceite y reservamos.',
      'Le agregamos la salsa y queso parmesano por encima y llevamos al horno de nuevo por 10 min hasta que el queso quede fundido. Servimos.',
    ],
  },
  {
    id: 'penne-bolonesa',
    title: 'Penne',
    subtitle: 'A la boloñesa',
    fullTitle: 'Penne a la boloñesa',
    image: img('1621996346565-e3dbc646d9a9'),
    rating: 5,
    minutes: 40,
    servings: 4,
    meals: ['Almuerzo'],
    ingredients: [
      { key: 'pasta', name: 'Penne', qty: '320gr', emoji: '🍝' },
      { key: 'carne picada', name: 'Carne picada', qty: '400gr', emoji: '🥩' },
      { key: 'tomate', name: 'Tomate', qty: '4 Unidades', emoji: '🍅' },
      { key: 'cebolla', name: 'Cebolla', qty: '1 Unidad', emoji: '🧅' },
      { key: 'zanahoria', name: 'Zanahoria', qty: '1 Unidad', emoji: '🥕' },
      { key: 'ajo', name: 'Ajo', qty: '2 Dientes', emoji: '🧄' },
      { key: 'aceite de oliva', name: 'Aceite de oliva', qty: '2 Cucharadas', emoji: '🫒' },
    ],
    steps: [
      'Sofreímos la cebolla, la zanahoria y el ajo picados en aceite.',
      'Agregamos la carne y cocinamos hasta dorar.',
      'Sumamos el tomate rallado, sal y pimienta. Cocinamos 25 minutos a fuego bajo.',
      'Cocinamos la pasta, mezclamos con la salsa y servimos.',
    ],
  },
  {
    id: 'pollo-salteado',
    title: 'Pollo',
    subtitle: 'Salteado con verduras',
    fullTitle: 'Pollo salteado con verduras',
    image: img('1525755662778-989d0524087e'),
    rating: 4,
    minutes: 25,
    servings: 2,
    meals: ['Cena'],
    ingredients: [
      { key: 'pechuga de pollo', name: 'Pechuga de pollo', qty: '2 Piezas', emoji: '🍗' },
      { key: 'zanahoria', name: 'Zanahoria', qty: '1 Unidad', emoji: '🥕' },
      { key: 'pimiento', name: 'Pimiento', qty: '1 Unidad', emoji: '🫑' },
      { key: 'ajo', name: 'Ajo', qty: '1 Diente', emoji: '🧄' },
      { key: 'miel', name: 'Miel', qty: '1 Cucharada', emoji: '🍯' },
      { key: 'vinagre', name: 'Vinagre', qty: '1 Cucharada', emoji: '🫙' },
    ],
    steps: [
      'Cortamos el pollo en cubos y lo doramos en una sartén bien caliente.',
      'Agregamos la zanahoria y el pimiento en tiras y salteamos 5 minutos.',
      'Sumamos el ajo, la miel y el vinagre. Cocinamos 2 minutos más hasta glasear.',
      'Servimos con arroz blanco.',
    ],
  },
  {
    id: 'arroz-salteado',
    title: 'Arroz',
    subtitle: 'Salteado con verduras',
    fullTitle: 'Arroz salteado con verduras y huevo',
    image: img('1595908129746-57ca1a63dd4d'),
    rating: 4,
    minutes: 20,
    servings: 2,
    meals: ['Almuerzo', 'Cena'],
    ingredients: [
      { key: 'arroz', name: 'Arroz', qty: '250gr', emoji: '🍚' },
      { key: 'huevos', name: 'Huevos', qty: '2 Unidades', emoji: '🥚' },
      { key: 'zanahoria', name: 'Zanahoria', qty: '1 Unidad', emoji: '🥕' },
      { key: 'pimiento', name: 'Pimiento', qty: '1 Unidad', emoji: '🫑' },
      { key: 'cebolla', name: 'Cebolla', qty: '1 Unidad', emoji: '🧅' },
      { key: 'aceite de oliva', name: 'Aceite de oliva', qty: '2 Cucharadas', emoji: '🫒' },
    ],
    steps: [
      'Cocinamos el arroz y lo dejamos enfriar.',
      'Salteamos la cebolla, la zanahoria y el pimiento en cubitos.',
      'Hacemos un hueco en la sartén, revolvemos los huevos y mezclamos todo.',
      'Agregamos el arroz, salteamos 3 minutos a fuego fuerte y servimos.',
    ],
  },
  {
    id: 'crema-zanahoria',
    title: 'Sopa',
    subtitle: 'Crema de zanahoria',
    fullTitle: 'Crema de zanahoria',
    image: img('1476718406336-bb5a9690ee2a'),
    rating: 4,
    minutes: 35,
    servings: 4,
    meals: ['Cena'],
    ingredients: [
      { key: 'zanahoria', name: 'Zanahoria', qty: '500gr', emoji: '🥕' },
      { key: 'patata', name: 'Patata', qty: '1 Unidad', emoji: '🥔' },
      { key: 'cebolla', name: 'Cebolla', qty: '1 Unidad', emoji: '🧅' },
      { key: 'mantequilla', name: 'Mantequilla', qty: '20gr', emoji: '🧈' },
      { key: 'crema', name: 'Crema', qty: '100ml', emoji: '🥛' },
    ],
    steps: [
      'Sofreímos la cebolla en mantequilla hasta que esté transparente.',
      'Agregamos la zanahoria y la patata en trozos, cubrimos con agua y cocinamos 20 minutos.',
      'Procesamos hasta obtener una crema lisa. Salpimentamos.',
      'Terminamos con la crema y servimos caliente.',
    ],
  },
  {
    id: 'curry-garbanzos',
    title: 'Curry',
    subtitle: 'De garbanzos',
    fullTitle: 'Curry de garbanzos con arroz',
    image: img('1585937421612-70a008356fbe'),
    rating: 5,
    minutes: 30,
    servings: 4,
    meals: ['Cena'],
    ingredients: [
      { key: 'garbanzos', name: 'Garbanzos cocidos', qty: '400gr', emoji: '🫘' },
      { key: 'tomate', name: 'Tomate', qty: '3 Unidades', emoji: '🍅' },
      { key: 'cebolla', name: 'Cebolla', qty: '1 Unidad', emoji: '🧅' },
      { key: 'ajo', name: 'Ajo', qty: '2 Dientes', emoji: '🧄' },
      { key: 'crema', name: 'Crema', qty: '100ml', emoji: '🥛' },
      { key: 'arroz', name: 'Arroz', qty: '200gr', emoji: '🍚' },
    ],
    steps: [
      'Sofreímos la cebolla y el ajo picados.',
      'Agregamos el tomate rallado y las especias, cocinamos 10 minutos.',
      'Sumamos los garbanzos y la crema, cocinamos 10 minutos más.',
      'Servimos con arroz blanco.',
    ],
  },
  {
    id: 'bowl-verde',
    title: 'Bowl',
    subtitle: 'De verduras y garbanzos',
    fullTitle: 'Bowl de verduras y garbanzos',
    image: img('1512621776951-a57141f2eefd'),
    rating: 4,
    minutes: 15,
    servings: 1,
    meals: ['Almuerzo'],
    ingredients: [
      { key: 'garbanzos', name: 'Garbanzos cocidos', qty: '150gr', emoji: '🫘' },
      { key: 'palta', name: 'Palta', qty: '½ Unidad', emoji: '🥑' },
      { key: 'tomate', name: 'Tomate', qty: '1 Unidad', emoji: '🍅' },
      { key: 'espinaca', name: 'Espinaca', qty: 'Un puñado', emoji: '🥬' },
      { key: 'limón', name: 'Limón', qty: '½ Unidad', emoji: '🍋' },
      { key: 'aceite de oliva', name: 'Aceite de oliva', qty: '1 Cucharada', emoji: '🫒' },
    ],
    steps: [
      'Lavamos la espinaca y la ponemos como base del bowl.',
      'Agregamos los garbanzos, el tomate en cubos y la palta en láminas.',
      'Aliñamos con aceite, limón, sal y pimienta. Servimos.',
    ],
  },
]

export function findRecipe(id: string | undefined) {
  return RECIPES.find((r) => r.id === id)
}

/** Which ingredients of a recipe are missing given what is selected in the pantry. */
export function matchInfo(recipe: Recipe, selected: string[]) {
  const have = new Set([...selected, ...ALWAYS_AVAILABLE])
  const missing = recipe.ingredients.filter((i) => !have.has(i.key))
  return { missing, matched: recipe.ingredients.length - missing.length }
}

/** Recipes sorted by how many selected ingredients they use. With nothing selected, all recipes. */
export function suggest(selected: string[]) {
  if (selected.length === 0) return RECIPES
  return RECIPES.map((r) => ({ r, m: matchInfo(r, selected) }))
    .filter(({ m }) => m.matched > 0)
    .sort((a, b) => b.m.matched / b.r.ingredients.length - a.m.matched / a.r.ingredients.length)
    .map(({ r }) => r)
}
