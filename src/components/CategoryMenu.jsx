import { categories } from '../data';

export default function CategoryMenu({ activeCategory, setActiveCategory }) {
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.id === 'all') return -1;
    if (b.id === 'all') return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="category-menu-container">
      <select 
        className="category-select"
        value={activeCategory}
        onChange={(e) => setActiveCategory(e.target.value)}
      >
        {sortedCategories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
