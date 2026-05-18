import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import Header from '../components/Header';
import CategoryMenu from '../components/CategoryMenu';
import ProductCard from '../components/ProductCard';
import FloatingCart from '../components/FloatingCart';
import BannerSlider from '../components/BannerSlider';
import { products, categories } from '../data';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(() => sessionStorage.getItem('activeCategory') || 'all');
  const [activeBrand, setActiveBrand] = useState(() => sessionStorage.getItem('activeBrand') || 'all');
  const [searchQuery, setSearchQuery] = useState(() => sessionStorage.getItem('searchQuery') || '');

  useEffect(() => {
    sessionStorage.setItem('activeCategory', activeCategory);
    sessionStorage.setItem('activeBrand', activeBrand);
    sessionStorage.setItem('searchQuery', searchQuery);
  }, [activeCategory, activeBrand, searchQuery]);

  useEffect(() => {
    const lastProductId = sessionStorage.getItem('lastProductId');
    if (lastProductId) {
      setTimeout(() => {
        const element = document.getElementById(`product-${lastProductId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // We don't remove it immediately to allow for a few seconds if they go back again
          setTimeout(() => sessionStorage.removeItem('lastProductId'), 3000);
        }
      }, 600);
    }
  }, []);

  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    return uniqueBrands.sort();
  }, []);

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveBrand('all');
    setSearchQuery('');
  };

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

    // Sort by category name alphabetically
    const categoryMap = categories.reduce((acc, cat) => {
      acc[cat.id] = cat.name;
      return acc;
    }, {});

    return [...result].sort((a, b) => {
      const catA = categoryMap[a.categoryId] || "";
      const catB = categoryMap[b.categoryId] || "";
      
      if (catA !== catB) {
        return catA.localeCompare(catB);
      }
      return a.name.localeCompare(b.name);
    });
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

        <div className="search-outer-container">
          <Search size={24} className="search-icon-left" />
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <CategoryMenu 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          startIndex={0} 
          endIndex={3} 
          style={{ marginTop: '24px' }}
        />

        <div style={{ margin: '24px 0' }}>
          <BannerSlider />
        </div>

        <div className="extra-filters" style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <select 
            className="category-select-glass"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            style={{ flex: 1 }}
          >
            <option value="all">Todas las Categorías</option>
            {categories.filter(cat => cat.id !== 'all').map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <select 
            className="category-select-glass"
            value={activeBrand}
            onChange={(e) => setActiveBrand(e.target.value)}
            style={{ flex: 1 }}
          >
            <option value="all">Todas las Marcas</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="main-content">
        <h2 className="section-title">
          {activeCategory === 'all' ? 'Todos los productos' : `Resultados`}
        </h2>

        <motion.div layout className="product-grid">
          <AnimatePresence>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button 
            className="details-add-btn" 
            style={{ background: 'var(--primary-color)' }}
            onClick={resetFilters}
          >
            Ver todos los productos
          </button>
        </div>
      </div>

      <FloatingCart />
    </motion.div>
  );
}
