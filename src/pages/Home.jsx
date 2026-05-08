import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      
      <div className="filters-container container-padding">
        <CategoryMenu activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <div className="brand-menu-container">
          <select 
            className="category-select"
            value={activeBrand}
            onChange={(e) => setActiveBrand(e.target.value)}
          >
            <option value="all">Todas las Marcas</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="search-container container-padding" style={{ marginBottom: '16px' }}>
        <input 
          type="text" 
          placeholder='Buscar "Ojo de Gato", "Glitter"...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <motion.div layout className="product-grid">
        <AnimatePresence>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>

      <FloatingCart />
    </motion.div>
  );
}
