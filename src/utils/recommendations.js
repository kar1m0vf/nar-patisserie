export function getProductRecommendations(product, products, limit = 3) {
  if (!product) return [];

  return product.recommendationIds
    .map(id => products.find(item => item.id === id))
    .filter(Boolean)
    .slice(0, limit);
}
