import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FloatingCart() {
  const { cartItemsCount, cartTotal, cart } = useCart();

  const handleCheckout = () => {
    // Build WhatsApp message
    const phoneNumber = "51989929942"; // Reemplazar con el número real
    let message = "Hola! Me gustaría hacer el siguiente pedido de GLOVE BEAUTY STORE:%0A%0A";
    
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (S/ ${item.price.toFixed(2)})%0A`;
    });
    
    message += `%0A*Total: S/ ${cartTotal.toFixed(2)}*`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {cartItemsCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          className="floating-checkout"
          onClick={handleCheckout}
          style={{ cursor: 'pointer' }}
        >
          <div className="checkout-left">
            <div className="checkout-badge">
              <ShoppingCart size={14} />
            </div>
            <span>Ver Pedido ({cartItemsCount})</span>
          </div>
          <div className="checkout-left">
            <span>S/ {cartTotal.toFixed(2)}</span>
            <ArrowRight size={18} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
