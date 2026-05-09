const categoryIcons = {
  '2': '/icon1.png',
  '3': '/icon2.png',
  '7': '/icon3.png',
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
        const iconSrc = categoryIcons[cat.id];
        const isActive = activeCategory === cat.id;
        
        return (
          <div 
            key={cat.id} 
            className={`category-card ${isActive ? 'active' : ''}`}
            onClick={() => setActiveCategory(isActive ? 'all' : cat.id)}
            style={{ padding: '15px 5px', height: '110px' }}
          >
            <div className="category-icon-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px' }}>
              <img 
                src={iconSrc} 
                alt={cat.name} 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  objectFit: 'contain',
                  filter: isActive ? 'none' : 'brightness(0.8) grayscale(0.2)'
                }} 
              />
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
