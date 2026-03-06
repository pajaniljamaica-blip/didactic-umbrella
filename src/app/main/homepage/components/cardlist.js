import React, { useState } from 'react';
import Card from '../../../../components/ui/card';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '📍' },
  { id: 'pizza', label: 'Pizza', icon: '🍕' },
  { id: 'burgers', label: 'Burgers', icon: '🍔' },
  { id: 'drinks', label: 'Drinks', icon: '🍺' },
  { id: 'salads', label: 'Salads', icon: '🥗' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
];

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Margherita Pizza',
    price: 560,
    rating: 4.5,
    reviews: 5,
    category: 'pizza',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=80',
  },
  {
    id: 2,
    name: 'Cheeseburger',
    price: 85,
    rating: 4.5,
    reviews: 3,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
  },
  {
    id: 3,
    name: 'BBQ Burger',
    price: 95,
    rating: 4,
    reviews: 3,
    category: 'burgers',
    badge: "Chef's Pick",
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80',
  },
  {
    id: 4,
    name: 'Caesar Salad',
    price: 350,
    rating: 4,
    reviews: 3,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&q=80',
  },
  {
    id: 5,
    name: 'Chicken Tenders',
    price: 150,
    rating: 4.5,
    reviews: 3,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80',
  },
  {
    id: 6,
    name: 'Veggie Pizza',
    price: 500,
    rating: 4.5,
    reviews: 3,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80',
  },
  {
    id: 7,
    name: 'Lemonade',
    price: 75,
    rating: 5,
    reviews: 8,
    category: 'drinks',
    badge: 'Refreshing',
    image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=400&q=80',
  },
  {
    id: 8,
    name: 'Garden Salad',
    price: 250,
    rating: 4,
    reviews: 2,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
  },
  {
    id: 9,
    name: 'Chocolate Lava Cake',
    price: 185,
    rating: 5,
    reviews: 12,
    category: 'desserts',
    badge: 'Fan Favorite',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80',
  },
  {
    id: 10,
    name: 'Strawberry Cheesecake',
    price: 195,
    rating: 4.5,
    reviews: 9,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80',
  },
  {
    id: 11,
    name: 'Vanilla Ice Cream',
    price: 165,
    rating: 4.5,
    reviews: 6,
    category: 'desserts',
    badge: 'Classic',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=80',
  },
  {
    id: 12,
    name: 'Tiramisu',
    price: 295,
    rating: 5,
    reviews: 7,
    category: 'desserts',
    badge: 'Chef\'s Pick',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
  },
];

const INITIAL_COUNT = 3;

const CardList = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filtered =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleToggle = () => {
    if (hasMore) {
      setVisibleCount(filtered.length);
    } else {
      setVisibleCount(INITIAL_COUNT);
      document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="card-list-section">
      <div className="card-list-header">
        <h2>Popular Local Dishes</h2>
        <p>Freshly prepared with local ingredients</p>
      </div>

      <div className="filter-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`filter-tab${activeCategory === cat.id ? ' active' : ''}`}
            onClick={() => {
              setActiveCategory(cat.id);
              setVisibleCount(INITIAL_COUNT);
            }}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {visible.map((item) => (
          <Card key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>

      {filtered.length > INITIAL_COUNT && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
          <button className="view-more-btn" onClick={handleToggle}>
            {hasMore ? 'View More' : 'View Less'}
          </button>
        </div>
      )}
    </section>
  );
};

export default CardList;