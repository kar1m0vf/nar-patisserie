import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { ProductCard } from '../components/ProductCard';
import { ProductQuickView } from '../components/ProductQuickView';
import { CATEGORIES, PRODUCTS } from '../data/products';

const FAVORITES_KEY = 'narPatisserieFavorites';

function readFavoritesFromStorage() {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return parsedFavorites
      .map(Number)
      .filter(Number.isFinite);
  } catch {
    return [];
  }
}

export function Catalog({ onAddToCart }) {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState(readFavoritesFromStorage);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(productId) {
    const id = Number(productId);

    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favoriteId => favoriteId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  }

  function resetCatalogView() {
    setCategory('all');
    setSearch('');
    setSort('default');
    setShowFavoritesOnly(false);
  }

  let products = [...PRODUCTS];

  if (category !== 'all') {
    products = products.filter(product => product.category === category);
  }

  if (showFavoritesOnly) {
    products = products.filter(product => favorites.includes(product.id));
  }

  if (search.trim()) {
    const query = search.trim().toLowerCase();

    products = products.filter(product => {
      const searchableText = [
        product.name,
        product.description,
        product.categoryName,
        product.taste,
        product.ingredients?.join(' ')
      ].join(' ').toLowerCase();

      return searchableText.includes(query);
    });
  }

  if (sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  }

  if (sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  }

  if (sort === 'name-asc') {
    products.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  }

  const recommendations = selectedProduct
    ? PRODUCTS
      .filter(product => product.category === selectedProduct.category && product.id !== selectedProduct.id)
      .slice(0, 3)
    : [];

  const favoriteCount = favorites.length;
  const favoritePreviewProducts = PRODUCTS.slice(0, 3);
  const isEmptyFavorites = showFavoritesOnly && favoriteCount === 0;

  return (
    <main>
      <PageHero
        eyebrow="Nar Patisserie Showcase"
        title="Desserts, Bakes, and Drinks"
        image="macarons"
      >
        Choose a category, find an item through search, and add it to the cart. The menu includes cakes, pastries, cookies, coffee, and refreshing drinks.
      </PageHero>

      <section className="section catalog-section">
        <div className="container">
          <div className="catalog-toolbar">
            <label className="search-box">
              <span>Product Search</span>
              <input
                type="search"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="For example: cake, macaron, coffee"
              />
            </label>

            <label className="sort-box">
              <span>Sort</span>
              <select value={sort} onChange={event => setSort(event.target.value)}>
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
              </select>
            </label>

            <button
              className={`favorite-filter${showFavoritesOnly ? ' active' : ''}`}
              type="button"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <span>{showFavoritesOnly ? 'All Items' : 'Favorites'}</span>
              <strong>{favoriteCount}</strong>
            </button>
          </div>

          <div className="category-tabs">
            {CATEGORIES.map(item => (
              <button
                key={item.id}
                className={`tab-btn${category === item.id ? ' active' : ''}`}
                type="button"
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="catalog-info">
            <p>
              Showing: {products.length} of {PRODUCTS.length}
            </p>
            <Link className="text-link" to="/cart">Go to Cart &rarr;</Link>
          </div>

          <div className="product-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onQuickView={setSelectedProduct}
                onToggleFavorite={toggleFavorite}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {products.length === 0 && (
            isEmptyFavorites ? (
              <div className="favorites-empty">
                <div className="favorites-empty-visual" aria-hidden="true">
                  {favoritePreviewProducts.map(product => (
                    <img key={product.id} src={product.image} alt="" />
                  ))}
                  <span>&#9825;</span>
                </div>
                <p className="eyebrow">Favorites</p>
                <h3>Your Shortlist Is Empty</h3>
                <p>Save desserts you want to compare, remember, or order later.</p>
                <button className="btn btn-primary" type="button" onClick={resetCatalogView}>
                  Explore Desserts
                </button>
              </div>
            ) : (
              <div className="empty-state">
                <h3>{showFavoritesOnly ? 'No Matching Favorites' : 'No Products Found'}</h3>
                <p>
                  {showFavoritesOnly
                    ? 'Try another category or clear the search to see your saved desserts.'
                    : 'Try changing the search query or choosing another category.'}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <ProductQuickView
        product={selectedProduct}
        recommendations={recommendations}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onSelectProduct={setSelectedProduct}
        onToggleFavorite={toggleFavorite}
        onAddToCart={onAddToCart}
      />
    </main>
  );
}
