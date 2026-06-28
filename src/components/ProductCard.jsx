import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import { HeartIcon } from './HeartIcon';

export function ProductCard({
  product,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart
}) {
  const navigate = useNavigate();
  const productPath = `/product/${product.id}`;

  function resetScrollPosition() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  function openProduct() {
    resetScrollPosition();
    navigate(productPath);
  }

  function handleCardKeyDown(event) {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProduct();
    }
  }

  function handleFavoriteClick(event) {
    event.stopPropagation();
    onToggleFavorite(product.id);
  }

  function handleAddToCartClick(event) {
    event.stopPropagation();
    onAddToCart(product.id);
  }

  return (
    <article
      className="product-card clickable"
      role="link"
      tabIndex={0}
      aria-label={`Open ${product.name}`}
      onClick={openProduct}
      onKeyDown={handleCardKeyDown}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" referrerPolicy="no-referrer" />
        {product.badge && <span className="product-badge">{product.badge}</span>}

        {onToggleFavorite && (
          <button
            className={`favorite-btn${isFavorite ? ' active' : ''}`}
            type="button"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={handleFavoriteClick}
          >
            <HeartIcon />
          </button>
        )}
      </div>

      <div className="product-content">
        <div className="product-meta">
          <span className="product-category">{product.categoryName}</span>
          {product.weight && <span>{product.weight}</span>}
        </div>

        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-footer">
          <strong>{formatPrice(product.price)}</strong>
          <div className="product-actions">
            {onAddToCart && (
              <button
                className="btn btn-small"
                type="button"
                onClick={handleAddToCartClick}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
