import { Link } from 'react-router-dom';
import { assetPath } from '../utils/assets';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-callout">
        <div>
          <p className="eyebrow">Visit Nar</p>
          <strong>Desserts, coffee and your happiness in Baku.</strong>
        </div>
        <Link className="btn btn-primary" to="/catalog">Open Catalog</Link>
      </div>

      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={assetPath('images/logo.svg')} alt="" aria-hidden="true" />
            <strong>Nar Patisserie</strong>
          </div>
          <p>Fresh cakes, pastries, and coffee prepared daily in Baku.</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <h3>Menu</h3>
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/contacts">Contacts</Link>
        </nav>

        <div className="footer-contact">
          <h3>Visit</h3>
          <span>Baku, Azerbaijan</span>
          <a href="tel:+994501234567">+994 50 123 45 67</a>
          <span>Daily 09:00-21:00</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>&copy; 2026 Nar Patisserie</span>
        <span>Pickup and city delivery in Baku</span>
      </div>
    </footer>
  );
}
