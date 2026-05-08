import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const getImageUrl = (url) => {
    if (!url) return '/logo.png';
    if (url.startsWith('http')) return url;
    if (url.includes('/')) return `/${url}`;
    return `/uploads/${url}`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-image-container">
        <img src={getImageUrl(product.image)} alt={product.name} className="product-image" loading="lazy" />
      </div>
      <div className="product-info">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-title text-truncate">{product.name}</h3>
        <span className="product-price">S/ {product.price.toFixed(2)}</span>
        <button 
          className="add-to-cart-btn" 
          onClick={handleAddToCart}
          aria-label="Agregar al carrito"
        >
          <Plus size={18} />
        </button>
      </div>
    </motion.div>
  );
}
