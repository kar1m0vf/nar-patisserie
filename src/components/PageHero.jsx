import { assetPath } from '../utils/assets';

export function PageHero({ eyebrow, title, image, children }) {
  const heroImage = image || 'macarons';
  const heroStyle = {
    '--page-hero-image': `url("${assetPath(`images/photos/${heroImage}.jpg`)}")`
  };

  return (
    <section className="page-hero section compact-hero" style={heroStyle}>
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}
