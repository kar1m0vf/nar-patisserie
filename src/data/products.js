import { assetPath } from '../utils/assets';

const imageUrl = fileName => assetPath(`images/photos/${fileName}.jpg`);

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'pastry', label: 'Pastries' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'drinks', label: 'Drinks' }
];

const CATEGORY_DETAILS = {
  cakes: {
    ingredients: ['sponge cake', 'cream', 'berry or caramel accent'],
    taste: 'A rich dessert for celebrations, gatherings, and larger orders.',
    allergens: 'gluten, eggs, milk'
  },
  pastry: {
    ingredients: ['cream filling', 'delicate dough', 'seasonal filling'],
    taste: 'A single-serve dessert that pairs well with coffee or a sweet set.',
    allergens: 'gluten, eggs, milk'
  },
  cookies: {
    ingredients: ['flour', 'butter', 'spices or chocolate'],
    taste: 'Crisp texture with a soft homemade aroma for tea.',
    allergens: 'gluten, milk'
  },
  drinks: {
    ingredients: ['milk or ice', 'coffee, cocoa, or berries', 'soft sweet balance'],
    taste: 'A drink that completes the order and pairs naturally with desserts.',
    allergens: 'may contain milk'
  }
};

const PRODUCT_RECOMMENDATIONS = {
  1: [10, 4, 5],
  2: [19, 15, 12],
  3: [11, 8, 10],
  4: [10, 5, 7],
  5: [19, 4, 12],
  6: [10, 18, 11],
  7: [10, 11, 4],
  8: [11, 19, 18],
  9: [10, 12, 7],
  10: [4, 7, 1],
  11: [8, 18, 3],
  12: [5, 2, 9],
  13: [12, 5, 10],
  14: [10, 9, 11],
  15: [12, 19, 5],
  16: [10, 8, 11],
  17: [19, 12, 10],
  18: [11, 10, 8],
  19: [5, 17, 2],
  20: [15, 5, 7]
};

const RAW_PRODUCTS = [
  {
    id: 1,
    name: 'Chocolate Cake',
    category: 'cakes',
    categoryName: 'Cakes',
    price: 28.90,
    image: imageUrl('chocolate-cake'),
    badge: 'Bestseller',
    weight: '1 kg',
    description: 'Tender sponge cake, chocolate cream, and a light berry finish.'
  },
  {
    id: 2,
    name: 'Strawberry Cheesecake',
    category: 'cakes',
    categoryName: 'Cakes',
    price: 24.50,
    image: imageUrl('strawberry-cheesecake'),
    badge: 'Fresh',
    weight: '900 g',
    description: 'Creamy base, strawberry layer, and a buttery biscuit crumb.'
  },
  {
    id: 3,
    name: 'Classic Honey Cake',
    category: 'cakes',
    categoryName: 'Cakes',
    price: 22.00,
    image: imageUrl('honey-cake'),
    badge: 'Homemade',
    weight: '1 kg',
    description: 'Honey cake layers, soft sour cream filling, and caramel notes.'
  },
  {
    id: 4,
    name: 'Vanilla Eclair',
    category: 'pastry',
    categoryName: 'Pastries',
    price: 3.20,
    image: imageUrl('vanilla-eclair'),
    badge: 'New',
    weight: '1 pc.',
    description: 'Choux pastry, vanilla cream, and a delicate glaze.'
  },
  {
    id: 5,
    name: 'Macaron Assortment',
    category: 'pastry',
    categoryName: 'Pastries',
    price: 7.50,
    image: imageUrl('macarons'),
    badge: 'Assorted',
    weight: '6 pcs.',
    description: 'A set of six macarons with different creamy fillings.'
  },
  {
    id: 6,
    name: 'Tiramisu Cup',
    category: 'pastry',
    categoryName: 'Pastries',
    price: 6.90,
    image: imageUrl('tiramisu'),
    badge: 'Italian',
    weight: '180 g',
    description: 'Mascarpone cream, coffee, cocoa, and an airy texture.'
  },
  {
    id: 7,
    name: 'Oat Cookies',
    category: 'cookies',
    categoryName: 'Cookies',
    price: 4.80,
    image: imageUrl('oat-cookies'),
    badge: 'For Tea',
    weight: '200 g',
    description: 'Homemade cookies with oat flakes and chocolate drops.'
  },
  {
    id: 8,
    name: 'Chocolate Cookies',
    category: 'cookies',
    categoryName: 'Cookies',
    price: 5.40,
    image: imageUrl('choco-cookies'),
    badge: 'Warm',
    weight: '200 g',
    description: 'Crisp cookies with pieces of dark chocolate.'
  },
  {
    id: 9,
    name: 'Gingerbread Cookies',
    category: 'cookies',
    categoryName: 'Cookies',
    price: 6.10,
    image: imageUrl('gingerbread'),
    badge: 'Spiced',
    weight: '180 g',
    description: 'Aromatic gingerbread with cinnamon, ginger, and sugar glaze.'
  },
  {
    id: 10,
    name: 'Cappuccino',
    category: 'drinks',
    categoryName: 'Drinks',
    price: 4.20,
    image: imageUrl('cappuccino'),
    badge: 'Barista',
    weight: '250 ml',
    description: 'Coffee with milk foam, made to pair well with desserts.'
  },
  {
    id: 11,
    name: 'Hot Chocolate',
    category: 'drinks',
    categoryName: 'Drinks',
    price: 4.90,
    image: imageUrl('hot-chocolate'),
    badge: 'Cocoa',
    weight: '250 ml',
    description: 'Thick chocolate drink with a smooth creamy taste.'
  },
  {
    id: 12,
    name: 'Berry Lemonade',
    category: 'drinks',
    categoryName: 'Drinks',
    price: 3.80,
    image: imageUrl('berry-lemonade'),
    badge: 'Iced',
    weight: '300 ml',
    description: 'Refreshing lemonade with berries, citrus, and mint.'
  },
  {
    id: 13,
    name: 'Cherry Cake',
    category: 'cakes',
    categoryName: 'Cakes',
    price: 26.70,
    image: imageUrl('cherry-cake'),
    badge: 'Berries',
    weight: '900 g',
    description: 'Tender cake layers, cream filling, and a lightly tart cherry layer.'
  },
  {
    id: 14,
    name: 'Carrot Cake',
    category: 'cakes',
    categoryName: 'Cakes',
    price: 23.60,
    image: imageUrl('carrot-cake'),
    badge: 'With Nuts',
    weight: '850 g',
    description: 'Spiced sponge, cream cheese frosting, walnuts, and soft caramel flavor.'
  },
  {
    id: 15,
    name: 'Vanilla Cupcakes',
    category: 'pastry',
    categoryName: 'Pastries',
    price: 8.90,
    image: imageUrl('vanilla-cupcakes'),
    badge: 'Set',
    weight: '4 pcs.',
    description: 'Mini cupcakes with vanilla cream and a neat festive finish.'
  },
  {
    id: 16,
    name: 'Caramel Cupcake',
    category: 'pastry',
    categoryName: 'Pastries',
    price: 3.90,
    image: imageUrl('caramel-cupcake'),
    badge: 'Caramel',
    weight: '1 pc.',
    description: 'Soft cupcake with caramel filling and a creamy frosting cap.'
  },
  {
    id: 17,
    name: 'Glazed Donuts',
    category: 'pastry',
    categoryName: 'Pastries',
    price: 6.80,
    image: imageUrl('donuts'),
    badge: 'Assorted',
    weight: '3 pcs.',
    description: 'Airy donuts with different glazes for coffee, tea, or a sweet set.'
  },
  {
    id: 18,
    name: 'Chocolate Brownie',
    category: 'pastry',
    categoryName: 'Pastries',
    price: 5.70,
    image: imageUrl('brownie'),
    badge: 'Cocoa',
    weight: '160 g',
    description: 'Dense chocolate dessert with deep cocoa flavor and a soft center.'
  },
  {
    id: 19,
    name: 'Iced Latte',
    category: 'drinks',
    categoryName: 'Drinks',
    price: 4.60,
    image: imageUrl('iced-latte'),
    badge: 'Cold',
    weight: '300 ml',
    description: 'Chilled coffee with milk and ice for a warm day.'
  },
  {
    id: 20,
    name: 'Matcha Latte',
    category: 'drinks',
    categoryName: 'Drinks',
    price: 5.20,
    image: imageUrl('matcha-latte'),
    badge: 'Matcha',
    weight: '250 ml',
    description: 'Soft green matcha tea with milk and a delicate creamy texture.'
  }
];

export const PRODUCTS = RAW_PRODUCTS.map(product => ({
  ...CATEGORY_DETAILS[product.category],
  ...product,
  recommendationIds: PRODUCT_RECOMMENDATIONS[product.id] || []
}));
