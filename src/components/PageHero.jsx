import { assetPath } from '../utils/assets';

export function PageHero({ eyebrow, title, image, children }) {
  const heroImage = image || 'macarons';
  const heroImageSrc = assetPath(`images/photos/${heroImage}.jpg`);

  return (
    <section className="page-hero section compact-hero">
      <img className="page-hero-image" src={heroImageSrc} alt="" aria-hidden="true" />

      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}
