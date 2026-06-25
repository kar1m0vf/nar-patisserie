export function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero section compact-hero">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}
