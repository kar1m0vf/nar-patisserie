import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import { HeartIcon } from './HeartIcon';

export function ProductCard({
  product,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart
}) {
  const productPath = `/product/${product.id}`;

  function resetScrollPosition() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  return (
    <article className="product-card">
      <div className="product-image">
        <Link className="product-image-link" to={productPath} aria-label={`Open ${product.name}`} onClick={resetScrollPosition}>
          <img src={product.image} alt={product.name} loading="lazy" referrerPolicy="no-referrer" />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}

        {onToggleFavorite && (
          <button
            className={`favorite-btn${isFavorite ? ' active' : ''}`}
            type="button"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => onToggleFavorite(product.id)}
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

        <h3>
          <Link className="product-title-link" to={productPath} onClick={resetScrollPosition}>{product.name}</Link>
        </h3>
        <p>{product.description}</p>

        <div className="product-footer">
          <strong>{formatPrice(product.price)}</strong>
          <div className="product-actions">
            <Link className="text-link product-details-link" to={productPath} onClick={resetScrollPosition}>Details</Link>
            {onAddToCart && (
              <button
                className="btn btn-small"
                type="button"
                onClick={() => onAddToCart(product.id)}
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
