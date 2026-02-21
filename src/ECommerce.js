import React from "react";
import "./ECommerce.css";

function ECommerce() {
  const foods = [
    { id: 1, name: "Grilled Chicken", price: "$12", image: "https://via.placeholder.com/200" },
    { id: 2, name: "Veggie Pizza", price: "$15", image: "https://via.placeholder.com/200" },
    { id: 3, name: "Beef Burger", price: "$10", image: "https://via.placeholder.com/200" },
    { id: 4, name: "Pasta Alfredo", price: "$14", image: "https://via.placeholder.com/200" },
    { id: 5, name: "Sushi Platter", price: "$18", image: "https://via.placeholder.com/200" },
    { id: 6, name: "Local Fried Rice", price: "$9", image: "https://via.placeholder.com/200" },
    { id: 7, name: "Seafood Soup", price: "$16", image: "https://via.placeholder.com/200" },
    { id: 8, name: "Chocolate Cake", price: "$7", image: "https://via.placeholder.com/200" }
  ];

  return (
    <div className="App">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">LocalBites</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Menu</li>
          <li>Restaurants</li>
          <li>Contact</li>
        </ul>
        <button className="order-btn">Order Now</button>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h1>Fresh Local Food Delivered To You</h1>
          <p>Order from your favorite local restaurants anytime.</p>
          <button>Explore Menu</button>
        </div>
        <div className="hero-img">
          <img src="https://via.placeholder.com/400" alt="Food Banner" />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <div className="category-card large">
          <h3>🍲 Traditional Dishes</h3>
          <button>View Menu</button>
        </div>

        <div className="category-right">
          <div className="category-card small">
            <h3>🍕 Fast Food</h3>
          </div>
          <div className="category-card small">
            <h3>🥗 Healthy Meals</h3>
          </div>
          <div className="category-card small">
            <h3>🎁 Gift Cards</h3>
          </div>
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="products">
        <h2>Our Popular Dishes</h2>

        <div className="product-grid">
          {foods.map(food => (
            <div className="product-card" key={food.id}>
              <img src={food.image} alt={food.name} />
              <h4>{food.name}</h4>
              <p className="price">{food.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* DEAL OF THE WEEK */}
      <section className="deal">
        <div className="deal-text">
          <h2>🔥 Deal of the Week</h2>
          <p>Get 25% off on all Traditional Dishes!</p>
          <button>Order Now</button>
        </div>
        <div className="deal-img">
          <img src="https://via.placeholder.com/300" alt="Deal Food" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature">
          <h4>🚚 Fast Delivery</h4>
          <p>Quick and reliable delivery service.</p>
        </div>
        <div className="feature">
          <h4>🥗 Fresh Ingredients</h4>
          <p>Locally sourced fresh food.</p>
        </div>
        <div className="feature">
          <h4>💳 Easy Payment</h4>
          <p>Secure and flexible payment options.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-left">
          <h3>QuickBites</h3>
          <p>Delivering happiness through food.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <p>About</p>
            <p>Careers</p>
            <p>Blog</p>
          </div>

          <div>
            <h4>Support</h4>
            <p>Help Center</p>
            <p>Terms</p>
            <p>Privacy</p>
          </div>

          <div>
            <h4>Subscribe</h4>
            <input type="email" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ECommerce;