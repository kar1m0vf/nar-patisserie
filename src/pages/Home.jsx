import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { assetPath } from '../utils/assets';
import { usePageMeta } from '../hooks/usePageMeta';

export function Home() {
  usePageMeta({
    page: 'home',
    title: 'Nar Patisserie',
    description: 'Nar Patisserie - a patisserie in Baku with fresh cakes, desserts, coffee, pickup, and city delivery.'
  });

  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <main>
      <section className="hero hero-cover">
        <div className="hero-backdrop" aria-hidden="true">
          <img src={assetPath('images/photos/hero-main.jpg')} alt="" />
        </div>

        <div className="container hero-cover-inner">
          <p className="eyebrow">Patisserie in Baku</p>
          <h1>Nar Patisserie</h1>
          <p className="hero-text">
            We prepare cakes, pastries, cookies, and drinks in small batches with neat presentation and seasonal pomegranate accents. Stop by for dessert with coffee,
            build a sweet set, or place a delivery order.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" to="/catalog">Open Menu</Link>
            <Link className="btn btn-secondary" to="/contacts">Find Us</Link>
          </div>

          <div className="hero-stills" aria-hidden="true">
            <img src={assetPath('images/photos/chocolate-cake.jpg')} alt="" />
            <img src={assetPath('images/photos/macarons.jpg')} alt="" />
            <img src={assetPath('images/photos/cherry-cake.jpg')} alt="" />
            <img src={assetPath('images/photos/cappuccino.jpg')} alt="" />
          </div>
        </div>
      </section>

      <section className="section category-section">
        <div className="container">
          <div className="section-title row-title">
            <div>
              <p className="eyebrow">Assortment</p>
              <h2>Choose a Showcase Section</h2>
            </div>
            <Link className="text-link" to="/catalog">All Items</Link>
          </div>

          <div className="category-showcase">
            <Link className="category-card" to="/catalog?category=cakes">
              <img src={assetPath('images/photos/chocolate-cake.jpg')} alt="Cake with chocolate cream" />
              <span>Cakes</span>
            </Link>
            <Link className="category-card" to="/catalog?category=pastry">
              <img src={assetPath('images/photos/macarons.jpg')} alt="Colorful macarons" />
              <span>Pastries</span>
            </Link>
            <Link className="category-card" to="/catalog?category=cookies">
              <img src={assetPath('images/photos/choco-cookies.jpg')} alt="Cookies with chocolate" />
              <span>Cookies</span>
            </Link>
            <Link className="category-card" to="/catalog?category=drinks">
              <img src={assetPath('images/photos/cappuccino.jpg')} alt="Cappuccino with milk foam" />
              <span>Drinks</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section today-section">
        <div className="container">
          <div className="section-title row-title">
            <div>
              <p className="eyebrow">In the Showcase Today</p>
              <h2>Desserts People Often Take With Coffee or Home</h2>
            </div>
            <Link className="text-link" to="/catalog">Go to Catalog</Link>
          </div>

          <div className="product-grid featured-menu">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section service-section">
        <div className="container">
          <div className="section-title service-heading">
            <p className="eyebrow">Orders and Pickup</p>
            <h2>Pick Up Desserts Today or Preorder for Later</h2>
            <p>
              In the catalog, you can build an order from the showcase, choose drinks, and leave your contact details. After the request, we confirm availability,
              preparation time, and the most convenient pickup or delivery option.
            </p>
          </div>

          <div className="service-list service-list-row">
            <article className="service-item">
              <span>01</span>
              <h3>Daily Showcase</h3>
              <p>Cakes, pastries, cookies, and drinks are grouped by category so you can quickly choose dessert for coffee or for home.</p>
            </article>
            <article className="service-item">
              <span>02</span>
              <h3>Preorder</h3>
              <p>For an event set, it is better to leave a request in advance: it makes the contents, quantity, and timing easier to confirm.</p>
            </article>
            <article className="service-item">
              <span>03</span>
              <h3>Pickup or Delivery</h3>
              <p>You can pick up the order in Baku or add a delivery address during checkout.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section visit-section">
        <div className="container visit-grid">
          <div>
            <p className="eyebrow">Contacts</p>
            <h2>Stop By for Dessert or Place a Preorder</h2>
            <p>
              If you need a specific item or an order for a certain time, it is best to confirm availability by phone.
              The online request helps you build the order quickly, and the patisserie confirms the details.
            </p>
          </div>

          <aside className="visit-panel">
            <span className="panel-label">Nar Patisserie</span>
            <strong>Baku, Azerbaijan</strong>
            <ul className="visit-list">
              <li>Mon-Sun: 09:00-21:00</li>
              <li>+994 50 123 45 67</li>
              <li>Pickup and city delivery</li>
            </ul>
            <div className="panel-actions">
              <Link className="btn btn-primary" to="/catalog">Choose Dessert</Link>
              <Link className="btn btn-secondary" to="/contacts">Open Map</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
