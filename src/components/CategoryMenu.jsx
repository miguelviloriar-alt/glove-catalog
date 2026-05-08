import { Paintbrush, Sparkles, Wrench, MoreHorizontal } from 'lucide-react';

const categoryIcons = {
  'all': MoreHorizontal,
  'esmaltes': Paintbrush,
  'accesorios': Sparkles,
  'herramientas': Wrench,
};

export default function CategoryMenu({ activeCategory, setActiveCategory }) {
  // We'll show the 3 main ones plus 'all' as 'Más'
  const mainCategories = [
    { id: 'esmaltes', name: 'Esmaltes' },
    { id: 'accesorios', name: 'Accesorios' },
    { id: 'herramientas', name: 'Herramientas' },
    { id: 'all', name: 'Más' }
  ];

  return (
    <div className="categories-grid">
      {mainCategories.map((cat) => {
        const Icon = categoryIcons[cat.id] || MoreHorizontal;
        return (
          <div 
            key={cat.id} 
            className={`category-card ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <div className="category-icon-container">
              <Icon size={24} strokeWidth={1.5} />
            </div>
            <span className="category-name">{cat.name}</span>
          </div>
        );
      })}
    </div>
  );
}
