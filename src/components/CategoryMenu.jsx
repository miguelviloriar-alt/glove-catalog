// Custom Neon Silhouette Icons
const NailPolishIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="neon-icon">
    <path d="M9 3h6v4H9z" />
    <path d="M6 7h12v2a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V7z" />
    <path d="M7 13v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6" />
  </svg>
);

const CuticleScissorsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="neon-icon">
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="18" r="3" />
    <path d="M9 15.5 18 4" />
    <path d="M15 15.5 6 4" />
  </svg>
);

const BrushIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="neon-icon">
    <path d="m13 10 6-6" />
    <path d="m3 21 7-7" />
    <path d="M14 6.5C14.5 7 15 8 15 9.5s-1.5 2-3 2.5-3-1-3.5-2.5 1-3 2.5-3.5 2 .5 2.5 1z" />
    <path d="M3 21c.5-2 1.5-3.5 3-4.5" />
    <path d="M7 18c1 1.5 2.5 2.5 4.5 3" />
  </svg>
);

const categoryIcons = {
  '2': NailPolishIcon,
  '3': CuticleScissorsIcon,
  '7': BrushIcon,
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
            style={{ padding: '15px 5px', height: '110px' }}
          >
            <div className="category-icon-container">
              <Icon />
            </div>
            <span className="category-name" style={{ fontSize: '0.6rem', fontWeight: '700', letterSpacing: '0.5px' }}>
              {cat.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
