import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { assetPath } from '../utils/assets';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/cart', label: 'Cart', isCart: true },
  { to: '/contacts', label: 'Contacts' }
];

export function Header({ totalCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="top-line">
        <div className="container top-line-inner">
          <span>Baku, Azerbaijan</span>
          <span>Daily 09:00-21:00</span>
          <span>+994 50 123 45 67</span>
        </div>
      </div>

      <div className="container header-inner">
        <Link className="logo" to="/" aria-label="Nar Patisserie - home" onClick={closeMenu}>
          <img className="logo-mark" src={assetPath('images/logo.svg')} alt="" aria-hidden="true" />
          <span>
            <strong>Nar Patisserie</strong>
            <small>patisserie in Baku</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#9776;
        </button>

        <nav id="main-menu" className={`nav${isMenuOpen ? ' open' : ''}`} aria-label="Main menu">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              to={link.to}
              onClick={closeMenu}
              end={link.to === '/'}
            >
              {link.label}
              {link.isCart && <span className="cart-badge">{totalCount}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
