import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Header({ toggleCart }) {
  const { cartItemsCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="header" style={{ justifyContent: 'center', position: 'relative' }}>
      <div className="header-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src="/logo.png" alt="GLOVE BEAUTY" />
      </div>
      <button className="cart-button" onClick={toggleCart} aria-label="Abrir carrito" style={{ position: 'absolute', right: '24px' }}>
        <ShoppingBag size={22} strokeWidth={1.5} />
        {cartItemsCount > 0 && (
          <span className="cart-badge" style={{ border: '2px solid var(--bg-dark)' }}>{cartItemsCount}</span>
        )}
      </button>
    </header>
  );
}
