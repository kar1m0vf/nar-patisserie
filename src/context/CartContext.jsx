import { createContext, useContext, useEffect, useState } from 'react';
import { PRODUCTS } from '../data/products';

const CART_KEY = 'narPatisserieCart';
const CartContext = createContext(null);

function readCart() {
  try {
    const savedCart = localStorage.getItem(CART_KEY);
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    if (!Array.isArray(parsedCart)) return [];

    return parsedCart
      .map(item => ({ id: Number(item.id), quantity: Number(item.quantity) }))
      .filter(item => Number.isFinite(item.id) && Number.isFinite(item.quantity) && item.quantity > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);
  const [toastText, setToastText] = useState('');

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!toastText) return undefined;

    const timerId = window.setTimeout(() => {
      setToastText('');
    }, 2200);

    return () => window.clearTimeout(timerId);
  }, [toastText]);

  const detailedCart = cart
    .map(item => ({ ...item, product: PRODUCTS.find(product => product.id === item.id) }))
    .filter(item => item.product);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = detailedCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  function addToCart(productId, quantity = 1) {
    const id = Number(productId);
    const amount = Math.max(1, Number(quantity) || 1);

    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === id);

      if (existingItem) {
        return currentCart.map(item => (
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        ));
      }

      return [...currentCart, { id, quantity: amount }];
    });

    setToastText(amount > 1 ? `Added to cart: ${amount} pcs.` : 'Added to cart');
  }

  function changeCartQuantity(productId, action) {
    const id = Number(productId);

    setCart(currentCart => currentCart
      .map(item => {
        if (item.id !== id) return item;

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

  const value = {
    cart,
    detailedCart,
    totalCount,
    totalPrice,
    toastText,
    addToCart,
    changeCartQuantity,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {toastText && <div className="toast">{toastText}</div>}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
