import { useEffect, useState } from 'react';
import { formatPrice } from '../utils/format';
import { HeartIcon } from './HeartIcon';

export function ProductQuickView({
  product,
  recommendations,
  isFavorite,
  onClose,
  onSelectProduct,
  onToggleFavorite,
  onAddToCart
}) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  useEffect(() => {
    if (!product) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) {
    return null;
  }

  function decreaseQuantity() {
    setQuantity(currentQuantity => Math.max(1, currentQuantity - 1));
  }

  function increaseQuantity() {
    setQuantity(currentQuantity => Math.min(12, currentQuantity + 1));
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleAddToCart() {
    onAddToCart(product.id, quantity);
  }

  return (
    <div className="quick-view-backdrop" role="presentation" onMouseDown={handleBackdropClick}>
      <section className="quick-view" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
        <button className="quick-view-close" type="button" aria-label="Close" onClick={onClose}>
          &times;
        </button>

        <div className="quick-view-media">
          <img src={product.image} alt={product.name} referrerPolicy="no-referrer" />
          {product.badge && <span className="product-badge">{product.badge}</span>}
        </div>

        <div className="quick-view-content">
          <div className="quick-view-heading">
            <div>
              <span className="product-category">{product.categoryName}</span>
              <h2 id="quick-view-title">{product.name}</h2>
            </div>

            <button
              className={`favorite-btn quick-favorite${isFavorite ? ' active' : ''}`}
              type="button"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              onClick={() => onToggleFavorite(product.id)}
            >
              <HeartIcon />
            </button>
          </div>

          <p className="quick-view-description">{product.description}</p>

          <div className="quick-view-facts">
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

          <div className="quick-view-details">
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

          <div className="quick-view-order">
            <div className="quantity-control" aria-label="Quantity">
              <button type="button" onClick={decreaseQuantity}>&minus;</button>
              <strong>{quantity}</strong>
              <button type="button" onClick={increaseQuantity}>+</button>
            </div>

            <button className="btn btn-primary" type="button" onClick={handleAddToCart}>
              Add {formatPrice(product.price * quantity)}
            </button>
          </div>

          {recommendations.length > 0 && (
            <div className="quick-recommendations">
              <h3>Pairs Well With</h3>
              <div className="recommendation-list">
                {recommendations.map(item => (
                  <button
                    className="recommendation-item"
                    type="button"
                    key={item.id}
                    onClick={() => onSelectProduct(item)}
                  >
                    <img src={item.image} alt="" referrerPolicy="no-referrer" />
                    <span>{item.name}</span>
                    <strong>{formatPrice(item.price)}</strong>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
