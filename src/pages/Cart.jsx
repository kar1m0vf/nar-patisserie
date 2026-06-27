import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { formatPrice } from '../utils/format';

export function Cart({
  detailedCart,
  totalCount,
  totalPrice,
  onChangeQuantity,
  onRemove,
  onClear
}) {
  const formRef = useRef(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  function handleOrderSubmit(event) {
    event.preventDefault();

    if (detailedCart.length === 0) {
      setMessage({ text: 'Add items to the cart first.', type: 'error' });
      return;
    }

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      setMessage({ text: 'Please fill in the required fields correctly.', type: 'error' });
      return;
    }

    const orderNumber = Math.floor(1000 + Math.random() * 9000);

    setMessage({
      text: `Order #${orderNumber} has been placed. A manager will contact you to confirm it.`,
      type: 'success'
    });

    formRef.current?.reset();
    onClear();
  }

  return (
    <main>
      <PageHero eyebrow="Checkout" title="Shopping Cart" image="chocolate-cake">
        Review the selected items, change quantities, and leave your details for order confirmation. After you send the request, we will contact you.
      </PageHero>

      <section className="section">
        <div className="container cart-layout">
          <div className="cart-panel">
            <div className="panel-header">
              <h2>Selected Items</h2>
              <button className="text-button" type="button" onClick={onClear}>Clear Cart</button>
            </div>

            <div className="cart-items">
              {detailedCart.map(item => (
                <article className="cart-item" key={item.product.id}>
                  <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" />

                  <div className="cart-item-info">
                    <span>
                      {item.product.categoryName}
                      {item.product.weight ? ` / ${item.product.weight}` : ''}
                    </span>
                    <h3>{item.product.name}</h3>
                    <p>{formatPrice(item.product.price)} each</p>
                  </div>

                  <div className="quantity-control" aria-label="Quantity">
                    <button type="button" onClick={() => onChangeQuantity(item.product.id, 'decrease')}>&minus;</button>
                    <strong>{item.quantity}</strong>
                    <button type="button" onClick={() => onChangeQuantity(item.product.id, 'increase')}>+</button>
                  </div>

                  <strong className="cart-item-total">
                    {formatPrice(item.product.price * item.quantity)}
                  </strong>

                  <button className="remove-btn" type="button" onClick={() => onRemove(item.product.id)}>
                    Remove
                  </button>
                </article>
              ))}
            </div>

            {detailedCart.length === 0 && (
              <div className="empty-state">
                <h3>Your Cart Is Empty</h3>
                <p>Add desserts or drinks from the catalog to place an order.</p>
                <Link className="btn btn-primary" to="/catalog">Go to Catalog</Link>
              </div>
            )}
          </div>

          <aside className="order-panel">
            <h2>Order Details</h2>
            <p className="panel-note">Payment is agreed after confirmation: a manager contacts the customer and checks the details.</p>

            <div className="summary-box">
              <div><span>Items</span><strong>{totalCount}</strong></div>
              <div><span>Total</span><strong>{formatPrice(totalPrice)}</strong></div>
            </div>

            <form className="order-form" ref={formRef} onSubmit={handleOrderSubmit} noValidate>
              <label>
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" required minLength="2" />
              </label>
              <label>
                <span>Phone</span>
                <input type="tel" name="phone" placeholder="+994 50 000 00 00" required />
              </label>
              <label>
                <span>Delivery Address</span>
                <input type="text" name="address" placeholder="Baku, district, street" required minLength="5" />
              </label>
              <label>
                <span>Comment</span>
                <textarea name="comment" rows="4" placeholder="For example: deliver after 18:00" />
              </label>
              <button className="btn btn-primary full-width" type="submit">Place Order</button>
              <p className={`form-message${message.type ? ` ${message.type}` : ''}`}>{message.text}</p>
            </form>
          </aside>
        </div>
      </section>
    </main>
  );
}
