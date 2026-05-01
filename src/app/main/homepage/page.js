import React, { useState, useEffect, useRef } from 'react';
import CardList from './components/cardlist';
import './page.css';

const FEATURES = [
  { icon: '🛵', title: 'Fast Delivery', desc: 'Under 30 minutes guaranteed' },
  { icon: '🌿', title: 'Quality Food', desc: 'Fresh local ingredients' },
  { icon: '🕐', title: '24/7 Service', desc: 'Always open for orders' },
  { icon: '📱', title: 'Easy Order', desc: 'Simple & fast checkout' },
];

const NAV_LINKS = ['Home', 'Menu', 'About', 'Contact'];

const FOOTER_LINKS = {
  Company: ['About Us', 'Careers', 'Blog', 'Press'],
  Help: ['FAQ', 'Order Tracking', 'Contact Us', 'Support'],
  Policies: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'],
};

export default function Homepage() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [scrolled, setScrolled] = useState(false);
  const toastTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showToast = (msg) => {
    clearTimeout(toastTimer.current);
    setToast({ show: true, msg });
    toastTimer.current = setTimeout(() => setToast({ show: false, msg: '' }), 2200);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    showToast(`🛒 ${item.name} added to cart!`);
  };

  const updateQty = (id, delta) =>
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const removeItem = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const scrollToMenu = () =>
    document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' });

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <button className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="logo-icon">🍽️</div>
              <span className="logo-text">Lokal<span>Eats</span></span>
            </button>

            <nav className="nav">
              {NAV_LINKS.map((n) => (
                <button key={n} className="nav-link"
                  onClick={n === 'Menu' ? scrollToMenu : () => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  {n}
                </button>
              ))}
            </nav>

            <div className="header-actions">
  {/* Cart icon */}
  <button className="icon-btn" title="Cart" onClick={() => setCartOpen(true)}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
    </svg>
    {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
  </button>

  {/* Profile icon */}
  <button className="icon-btn" title="Account">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  </button>

  <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
    <span /><span /><span />
  </button>
</div>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map((n) => (
          <button key={n} className="mobile-nav-link"
            onClick={() => {
              setMenuOpen(false);
              if (n === 'Menu') scrollToMenu();
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
            {n}
          </button>
        ))}
      </div>

      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <span className="hero-tag">🍃 Fresh & Local</span>
              <h1 className="hero-title">
                Delicious <em>Local Food</em><br />Delivered to You
              </h1>
              <p className="hero-desc">
                Order fresh and tasty meals from your favorite local restaurants.
                Hot, fast, and always satisfying.
              </p>
              <div className="hero-btns">
                <button className="btn-order" onClick={scrollToMenu}>Order Now</button>
                <button className="btn-secondary" onClick={scrollToMenu}>View Menu</button>
              </div>
            </div>
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=85"
                alt="Delicious food spread"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="features-strip">
        <div className="container">
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div className="feature-item" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="container" id="menu-section">
        <CardList onAddToCart={addToCart} />
      </main>

      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-inner">
            <div className="newsletter-text">
              <h3>Order Now & Save</h3>
              <p>Sign up for our newsletter to get special offers and discounts!</p>
              <div className="payment-badges" style={{ marginTop: 16 }}>
                {['VISA', 'Mastercard', 'PayPal', 'Apple Pay'].map((p) => (
                  <span className="pay-badge" key={p}>{p}</span>
                ))}
              </div>
            </div>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">🍽️</div>
                LokalEats
              </div>
              <p>Fresh, local meals delivered to your door.</p>
            </div>
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div className="footer-col" key={section}>
                <h5>{section}</h5>
                {links.map((link) => (
                  <button key={link} className="footer-link" type="button">{link}</button>
                ))}
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <p>© 2026 LokalEats. All rights reserved.</p>
            <div className="social-links">
              {['f', 't', 'in', '▶'].map((s) => (
                <button className="social-btn" key={s} type="button">{s}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      
      <div className={`cart-overlay${cartOpen ? ' open' : ''}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-sidebar${cartOpen ? ' open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart {totalItems > 0 && `(${totalItems})`}</h3>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span>🍽️</span>
              <p>Your cart is empty.<br />Add some delicious items!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">${(item.price * item.qty).toFixed(2)}</p>
                  <div className="cart-qty">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className="cart-remove" onClick={() => removeItem(item.id)}>🗑</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
            <button className="checkout-btn" onClick={() => alert('Proceeding to checkout!')}>
              Checkout · ${totalPrice.toFixed(2)}
            </button>
            <button className="clear-cart-btn" onClick={() => setCart([])}>Clear Cart</button>
          </div>
        )}
      </aside>

      
      <div className={`toast${toast.show ? ' show' : ''}`}>{toast.msg}</div>

      
      <button
        className={`scroll-top${scrolled ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to top"
      >↑</button>
    </>
  );
}