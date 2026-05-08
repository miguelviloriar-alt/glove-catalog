import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import FloatingCart from '../components/FloatingCart';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="app-container"><p style={{padding: 20}}>Producto no encontrado.</p></div>;
  }

  const getImageUrl = (url) => {
    if (!url) return '/logo.png';
    if (url.startsWith('http')) return url;
    if (url.includes('/')) return `/${url}`;
    return `/uploads/${url}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="app-container details-page"
    >
      <button className="back-btn" onClick={() => navigate(-1)} aria-label="Volver">
        <ArrowLeft size={24} />
      </button>

      <div className="details-image-container">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          src={getImageUrl(product.image)} 
          alt={product.name} 
          className="details-image" 
        />
      </div>

      <div className="details-content">
        <span className="details-brand">{product.brand}</span>
        <h1 className="details-title">{product.name}</h1>
        <span className="details-price">S/ {product.price.toFixed(2)}</span>
        
        <p className="details-description">
          {product.description}
        </p>

        <button 
          className="details-add-btn"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag size={20} />
          Agregar al Carrito
        </button>
      </div>

      <FloatingCart />
    </motion.div>
  );
}
