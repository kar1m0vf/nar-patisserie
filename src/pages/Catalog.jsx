import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { ProductCard } from '../components/ProductCard';
import { ProductQuickView } from '../components/ProductQuickView';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { useFavorites } from '../hooks/useFavorites';
import { usePageMeta } from '../hooks/usePageMeta';
import { getProductRecommendations } from '../utils/recommendations';

const allowedCategories = new Set(CATEGORIES.map(category => category.id));

function getInitialCategory(searchParams) {
  const category = searchParams.get('category');
  return allowedCategories.has(category) ? category : 'all';
}

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(() => getInitialCategory(searchParams));
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { favoritesSet, favoriteCount, toggleFavorite } = useFavorites();

  useEffect(() => {
    setCategory(getInitialCategory(searchParams));
  }, [searchParams]);

  usePageMeta({
    page: 'catalog',
    title: 'Nar Patisserie - Dessert Catalog',
    description: 'Nar Patisserie catalog: cakes, pastries, cookies, coffee, and drinks with search, filters, favorites, and cart.'
  });

  const products = useMemo(() => {
    let result = [...PRODUCTS];

    if (category !== 'all') {
      result = result.filter(product => product.category === category);
    }

    if (showFavoritesOnly) {
      result = result.filter(product => favoritesSet.has(product.id));
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter(product => (
        [
          product.name,
          product.description,
          product.categoryName,
          product.taste,
          product.ingredients?.join(' ')
        ].some(value => value?.toLowerCase().includes(query))
      ));
    }

    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name, 'en'));
    }

    return result;
  }, [category, favoritesSet, search, showFavoritesOnly, sort]);

  const recommendations = useMemo(() => (
    getProductRecommendations(selectedProduct, PRODUCTS)
  ), [selectedProduct]);

  const handleCategoryChange = nextCategory => {
    setCategory(nextCategory);

    if (nextCategory === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: nextCategory });
    }
  };

  return (
    <main>
      <PageHero eyebrow="Nar Patisserie Showcase" title="Desserts, Bakes, and Drinks">
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
              onClick={() => setShowFavoritesOnly(currentValue => !currentValue)}
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
                onClick={() => handleCategoryChange(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="catalog-info">
            <p>
              Showing: {products.length} of {PRODUCTS.length}
              {favoriteCount > 0 ? ` | favorites: ${favoriteCount}` : ''}
            </p>
            <Link className="text-link" to="/cart">Go to Cart &rarr;</Link>
          </div>

          <div className="product-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favoritesSet.has(product.id)}
                onQuickView={setSelectedProduct}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="empty-state">
              <h3>{showFavoritesOnly ? 'No Favorites Yet' : 'No Products Found'}</h3>
              <p>
                {showFavoritesOnly
                  ? 'Mark desserts with the heart icon so you can quickly return to them later.'
                  : 'Try changing the search query or choosing another category.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <ProductQuickView
        product={selectedProduct}
        recommendations={recommendations}
        isFavorite={selectedProduct ? favoritesSet.has(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onSelectProduct={setSelectedProduct}
        onToggleFavorite={toggleFavorite}
      />
    </main>
  );
}
