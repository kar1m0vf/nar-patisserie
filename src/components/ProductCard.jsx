import { formatPrice } from '../utils/format';
import { HeartIcon } from './HeartIcon';

export function ProductCard({
  product,
  isFavorite = false,
  onQuickView,
  onToggleFavorite,
  onAddToCart
}) {
  const cardCanOpenModal = Boolean(onQuickView);

  function openQuickView() {
    if (onQuickView) {
      onQuickView(product);
    }
  }

  function handleCardKeyDown(event) {
    if (!cardCanOpenModal) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openQuickView();
    }
  }

  function stopCardClick(event) {
    event.stopPropagation();
  }

  return (
    <article
      className={`product-card${cardCanOpenModal ? ' clickable' : ''}`}
      role={cardCanOpenModal ? 'button' : undefined}
      tabIndex={cardCanOpenModal ? 0 : undefined}
      onClick={cardCanOpenModal ? openQuickView : undefined}
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
            <button
              className="btn btn-small"
              type="button"
              onClick={event => {
                stopCardClick(event);
                onAddToCart(product.id);
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
