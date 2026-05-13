import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products, bannerTag } from '../data';

const AUTOPLAY_DELAY = 4000; // 4 segundos entre slides

export default function BannerSlider() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = adelante, -1 = atrás

  // Filtrar productos con la etiqueta activa (máx 10)
  const bannerProducts = products
    .filter(p => p.etiqueta && p.etiqueta === bannerTag)
    .slice(0, 10);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % bannerProducts.length);
  }, [bannerProducts.length]);

  const prev = () => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + bannerProducts.length) % bannerProducts.length);
  };

  // Auto-play
  useEffect(() => {
    if (bannerProducts.length <= 1) return;
    const timer = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [next, bannerProducts.length]);

  // No renderizar si no hay etiqueta activa o no hay productos con esa etiqueta
  if (!bannerTag || bannerProducts.length === 0) return null;

  const product = bannerProducts[current];

  const getImageUrl = (url) => {
    if (!url) return '/logo.png';
    if (url.startsWith('http')) return url;
    if (url.includes('/')) return `/${url}`;
    return `/uploads/${url}`;
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className="banner-slider">
      {/* Badge de etiqueta */}
      <div className="banner-label">
        <span className="banner-label-dot" />
        {bannerTag}
      </div>

      {/* Slide */}
      <div
        className="banner-slide-container"
        onClick={() => {
          sessionStorage.setItem('lastProductId', product.id);
          navigate(`/product/${product.id}`);
        }}
        style={{ cursor: 'pointer' }}
      >
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={product.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="banner-slide"
          >
            {/* Imagen */}
            <div className="banner-img-wrapper">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="banner-img"
              />
            </div>
            {/* Info del Producto */}
            <div className="banner-info">
              <span className="banner-brand">{product.brand}</span>
              <h3 className="banner-product-name">{product.name}</h3>
              <span className="banner-price">S/ {product.price.toFixed(2)}</span>
              <span className="banner-cta">Ver detalles →</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles de navegación */}
      {bannerProducts.length > 1 && (
        <>
          <button className="banner-nav banner-nav-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Anterior">
            <ChevronLeft size={18} />
          </button>
          <button className="banner-nav banner-nav-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Siguiente">
            <ChevronRight size={18} />
          </button>

          {/* Indicadores (dots) */}
          <div className="banner-dots">
            {bannerProducts.map((_, i) => (
              <button
                key={i}
                className={`banner-dot ${i === current ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setDirection(i > current ? 1 : -1); setCurrent(i); }}
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
