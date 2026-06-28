import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollTop } from './components/ScrollTop';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Cart } from './pages/Cart';
import { Contacts } from './pages/Contacts';
import { ProductDetails } from './pages/ProductDetails';
import { PRODUCTS } from './data/products';

const CART_KEY = 'narPatisserieCart';

function readCartFromStorage() {
  try {
    const savedCart = localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

export function App() {
  const [cart, setCart] = useState(readCartFromStorage);
  const [toastText, setToastText] = useState('');

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!toastText) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setToastText('');
    }, 2200);

    return () => window.clearTimeout(timerId);
  }, [toastText]);

  const detailedCart = cart
    .map(item => ({
      ...item,
      product: PRODUCTS.find(product => product.id === item.id)
    }))
    .filter(item => item.product);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = detailedCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  function addToCart(productId, quantity = 1) {
    const id = Number(productId);
    const amount = Math.max(1, Number(quantity) || 1);

    if (!PRODUCTS.some(product => product.id === id)) {
      return;
    }

    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === id);

      if (existingItem) {
        return currentCart.map(item => (
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        ));
      }

      return [...currentCart, { id, quantity: amount }];
    });

    setToastText('Added to cart');
  }

  function changeCartQuantity(productId, action) {
    const id = Number(productId);

    setCart(currentCart => currentCart
      .map(item => {
        if (item.id !== id) {
          return item;
        }

        if (action === 'increase') {
          return { ...item, quantity: item.quantity + 1 };
        }

        if (action === 'decrease') {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      })
      .filter(item => item.quantity > 0));
  }

  function removeFromCart(productId) {
    const id = Number(productId);
    setCart(currentCart => currentCart.filter(item => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <HashRouter>
      <Header totalCount={totalCount} />

      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route path="/catalog" element={<Catalog onAddToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetails onAddToCart={addToCart} />} />
        <Route
          path="/cart"
          element={(
            <Cart
              detailedCart={detailedCart}
              totalCount={totalCount}
              totalPrice={totalPrice}
              onChangeQuantity={changeCartQuantity}
              onRemove={removeFromCart}
              onClear={clearCart}
            />
          )}
        />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<Home onAddToCart={addToCart} />} />
      </Routes>

      <ScrollTop />
      <Footer />

      {toastText && <div className="toast">{toastText}</div>}
    </HashRouter>
  );
}
