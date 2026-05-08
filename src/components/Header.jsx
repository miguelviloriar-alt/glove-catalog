import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Header({ toggleCart }) {
  const { cartItemsCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="GLOVE BEAUTY" style={{ height: '35px', objectFit: 'contain' }} />
      </div>
      <button className="cart-button" onClick={toggleCart} aria-label="Abrir carrito">
        <ShoppingBag size={20} />
        {cartItemsCount > 0 && (
          <span className="cart-badge">{cartItemsCount}</span>
        )}
      </button>
    </header>
  );
}
