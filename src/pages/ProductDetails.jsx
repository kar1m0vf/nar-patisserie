import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HeartIcon } from '../components/HeartIcon';
import { PageHero } from '../components/PageHero';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { useFavorites } from '../hooks/useFavorites';
import { formatPrice } from '../utils/format';

export function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const productId = Number(id);
  const product = PRODUCTS.find(item => item.id === productId);
  const [quantity, setQuantity] = useState(1);
  const {
    favoriteIds,
    toggleFavorite
  } = useFavorites();

  useEffect(() => {
    setQuantity(1);
  }, [productId]);

  if (!product) {
    return (
      <main>
        <PageHero eyebrow="Product" title="Product Not Found" image="macarons">
          The selected item is not available in the catalog. Return to the menu and choose another dessert or drink.
        </PageHero>

        <section className="section">
          <div className="container">
            <div className="empty-state">
              <h3>No Product Here</h3>
              <p>This product link may be outdated or incorrect.</p>
              <Link className="btn btn-primary" to="/catalog">Back to Catalog</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const recommendations = product.recommendationIds
    .map(recommendationId => PRODUCTS.find(item => item.id === recommendationId))
    .filter(Boolean);
  const isFavorite = favoriteIds.includes(product.id);
  const totalPrice = product.price * quantity;

  function decreaseQuantity() {
    setQuantity(currentQuantity => Math.max(1, currentQuantity - 1));
  }

  function increaseQuantity() {
    setQuantity(currentQuantity => Math.min(12, currentQuantity + 1));
  }

  return (
    <main>
      <section className="section product-detail-section">
        <div className="container product-detail-layout">
          <div className="product-detail-media">
            <img src={product.image} alt={product.name} referrerPolicy="no-referrer" />
            {product.badge && <span className="product-badge">{product.badge}</span>}
          </div>

          <article className="product-detail-panel">
            <nav className="product-breadcrumb" aria-label="Breadcrumb">
              <Link to="/catalog">Catalog</Link>
              <span>/</span>
              <span>{product.name}</span>
            </nav>

            <div className="product-detail-heading">
              <div>
                <span className="product-category">{product.categoryName}</span>
                <h1>{product.name}</h1>
              </div>

              <button
                className={`favorite-btn${isFavorite ? ' active' : ''}`}
                type="button"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                onClick={() => toggleFavorite(product.id)}
              >
                <HeartIcon />
              </button>
            </div>

            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-facts">
              <div>
                <span>Price</span>
                <strong>{formatPrice(product.price)}</strong>
              </div>
              {product.weight && (
                <div>
                  <span>Format</span>
                  <strong>{product.weight}</strong>
                </div>
              )}
              <div>
                <span>Category</span>
                <strong>{product.categoryName}</strong>
              </div>
            </div>

            <div className="product-detail-list">
              <div>
                <span>Taste</span>
                <p>{product.taste}</p>
              </div>
              <div>
                <span>Ingredients</span>
                <p>{product.ingredients?.join(', ')}</p>
              </div>
              <div>
                <span>Allergens</span>
                <p>{product.allergens}</p>
              </div>
            </div>

            <div className="product-purchase-panel">
              <div className="product-price-total">
                <span>Total</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>

              <div className="product-detail-order">
                <div className="quantity-control" aria-label="Quantity">
                  <button type="button" aria-label="Decrease quantity" onClick={decreaseQuantity}>&minus;</button>
                  <strong>{quantity}</strong>
                  <button type="button" aria-label="Increase quantity" onClick={increaseQuantity}>+</button>
                </div>

                <button className="btn btn-primary" type="button" onClick={() => onAddToCart(product.id, quantity)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {recommendations.length > 0 && (
        <section className="section product-recommendations-section">
          <div className="container">
            <div className="section-title row-title">
              <div>
                <p className="eyebrow">Pairs Well With</p>
                <h2>Recommended With This Item</h2>
              </div>
              <Link className="text-link" to="/catalog">All Items</Link>
            </div>

            <div className="product-grid product-detail-recommendations">
              {recommendations.map(item => (
                <ProductCard
                  key={item.id}
                  product={item}
                  isFavorite={favoriteIds.includes(item.id)}
                  onToggleFavorite={toggleFavorite}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
