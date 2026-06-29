import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    function toggleVisibility() {
      setIsVisible(window.scrollY > 420);
    }

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    setIsVisible(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-top${isVisible ? ' is-visible' : ''}`}
      type="button"
      aria-label="Back to top"
      aria-hidden={!isVisible}
      onClick={handleClick}
    >
      <span aria-hidden="true">&uarr;</span>
    </button>
  );
}
