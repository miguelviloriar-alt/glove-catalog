import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from './context/CartContext';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AnimatedRoutes />
        <Analytics />
      </Router>
    </CartProvider>
  );
}

export default App;
