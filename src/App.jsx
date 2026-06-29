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

function findProductById(productId) {
  return PRODUCTS.find(product => product.id === productId);
}

export function App() {
  const [cartItems, setCartItems] = useState(readCartFromStorage);
  const [toastText, setToastText] = useState('');

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!toastText) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setToastText('');
    }, 2200);

    return () => window.clearTimeout(timerId);
  }, [toastText]);

  const detailedCart = cartItems
    .map(cartItem => ({
      ...cartItem,
      product: findProductById(cartItem.id)
    }))
    .filter(cartItem => cartItem.product);

  const totalCount = detailedCart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  const totalPrice = detailedCart.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0);

  function addToCart(productId, quantity = 1) {
    setCartItems(currentItems => {
      const itemInCart = currentItems.find(item => item.id === productId);

      if (itemInCart) {
        return currentItems.map(item => (
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ));
      }

      return [...currentItems, { id: productId, quantity }];
    });

    setToastText('Added to cart');
  }

  function changeCartQuantity(productId, action) {
    const step = action === 'increase' ? 1 : -1;

    setCartItems(currentItems => currentItems
      .map(item => (
        item.id === productId
          ? { ...item, quantity: item.quantity + step }
          : item
      ))
      .filter(item => item.quantity > 0));
  }

  function removeFromCart(productId) {
    setCartItems(currentItems => currentItems.filter(item => item.id !== productId));
  }

  function clearCart() {
    setCartItems([]);
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
