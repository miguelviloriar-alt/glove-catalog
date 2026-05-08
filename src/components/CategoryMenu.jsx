import { Sparkles, Wrench, Scissors } from 'lucide-react';

const categoryIcons = {
  '2': Sparkles,
  '3': Wrench,
  '7': Scissors,
};

export default function CategoryMenu({ activeCategory, setActiveCategory }) {
  const mainCategories = [
    { id: '2', name: 'ESMALTES GEL' },
    { id: '3', name: 'HERRAMIENTAS' },
    { id: '7', name: 'ACCESORIOS' }
  ];

  return (
    <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
      {mainCategories.map((cat) => {
        const Icon = categoryIcons[cat.id];
        const isActive = activeCategory === cat.id;
        
        return (
          <div 
            key={cat.id} 
            className={`category-card ${isActive ? 'active' : ''}`}
            onClick={() => setActiveCategory(isActive ? 'all' : cat.id)}
            style={{ padding: '12px 8px' }}
          >
            <div className="category-icon-container" style={{ marginBottom: '8px' }}>
              <Icon size={28} strokeWidth={1.5} />
            </div>
            <span className="category-name" style={{ fontSize: '0.65rem', textAlign: 'center', lineHeight: '1.2' }}>
              {cat.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
