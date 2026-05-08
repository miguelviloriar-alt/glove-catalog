import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import Header from '../components/Header';
import CategoryMenu from '../components/CategoryMenu';
import ProductCard from '../components/ProductCard';
import FloatingCart from '../components/FloatingCart';
import { products } from '../data';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeBrand, setActiveBrand] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    return uniqueBrands.sort();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== 'all') {
      result = result.filter(p => p.categoryId === activeCategory);
    }
    if (activeBrand !== 'all') {
      result = result.filter(p => p.brand === activeBrand);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return result;
  }, [activeCategory, activeBrand, searchQuery]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="app-container"
    >
      <Header toggleCart={() => {}} />
      
      <div className="hero-section">
        <h1 className="hero-title">Catálogo</h1>
        <p className="hero-subtitle">
          Descubre todos nuestros productos de belleza y cuidado personal.
        </p>

        <div className="search-container">
          <div className="search-icon-wrapper">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <CategoryMenu activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </div>
      
      <div className="main-content">
        <h2 className="section-title">
          {activeCategory === 'all' ? 'Todos los productos' : `Categoría: ${activeCategory}`}
        </h2>

        <motion.div layout className="product-grid">
          <AnimatePresence>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button className="details-add-btn" style={{ background: 'var(--primary-color)' }}>
            Ver todos los productos
          </button>
        </div>
      </div>

      <FloatingCart />
    </motion.div>
  );
}
