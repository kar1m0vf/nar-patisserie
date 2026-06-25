import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

export function ProductCard({ product, isFavorite = false, onQuickView, onToggleFavorite }) {
  const { addToCart } = useCart();
  const isInteractive = Boolean(onQuickView);
  const favoriteIcon = isFavorite ? '\u2665' : '\u2661';

  const openQuickView = () => {
    onQuickView?.(product);
  };

  const handleCardKeyDown = event => {
    if (!isInteractive || (event.key !== 'Enter' && event.key !== ' ')) return;

    event.preventDefault();
    openQuickView();
  };

  const stopCardClick = event => {
    event.stopPropagation();
  };

  return (
    <article
      className={`product-card${isInteractive ? ' clickable' : ''}`}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? openQuickView : undefined}
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
            onClick={event => {
              stopCardClick(event);
              onToggleFavorite(product.id);
            }}
          >
            {favoriteIcon}
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
            <button
              className="btn btn-small"
              type="button"
              onClick={event => {
                stopCardClick(event);
                addToCart(product.id);
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
