import React from "react";
import CardList from "./components/cardlist";
import { FaLeaf, FaMotorcycle, FaTags } from "react-icons/fa";

function Homepage() {
  return (
    <div style={{ backgroundColor: "#f4f4f4", fontFamily: "Arial" }}>

      {/* HEADER */}
      <header style={headerStyle}>
        <h2>
          <span style={{ color: "green" }}>Lokal</span>
          <span style={{ color: "orange" }}>Feast</span>
        </h2>

        <nav>
          <a href="home" style={linkStyle}>HOME</a>
          <a href="menu" style={linkStyle}>MENU</a>
          <a href="about" style={linkStyle}>ABOUT</a>
          <a href="contact" style={linkStyle}>CONTACT</a>
        </nav>
      </header>

      {/* HERO */}
      <section style={heroStyle}>
        <div>
          <h1>Delicious Local Food Delivered to You</h1>
          <p>Order fresh and tasty meals from your favorite local restaurants.</p>
          <button style={buttonStyle}>ORDER NOW</button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1525755662778-989d0524087e"
          alt="food"
          style={imageStyle}
        />
      </section>

      {/* CATEGORY GRID */}
      <section style={categorySection}>
        <div style={categoryContainer}>

          <div style={{ ...largeCard, gridArea: "dessert" }}>
            <img src="https://rare-gallery.com/thumbs/813966-Sweets-Little-cakes-Many.jpg" alt="Dessert" style={cardImage}/>
            <div style={cardLabel}>DESSERT</div>
          </div>

          <div style={{ ...smallCard, gridArea: "side" }}>
            <img src="https://pantryandlarder.com/wp-content/uploads/2022/09/What-To-Serve-With-Chicken-Wings-1024x1024.jpg" alt="Side" style={cardImage}/>
            <div style={cardLabel}>SIDE DISHES</div>
          </div>

          <div style={{ ...smallCard, gridArea: "snacks" }}>
            <img src="https://img.freepik.com/premium-photo/delicious-snacks-drinks-isolated-black-background_787273-71033.jpg" alt="Snacks" style={cardImage}/>
            <div style={cardLabel}>SNACKS & DRINKS</div>
          </div>

          <div style={{ ...smallCard, gridArea: "appetizer" }}>
            <img src="https://i.pinimg.com/originals/db/59/58/db595894dbab4b117f0831492d9ee58e.jpg" alt="Appetizer" style={cardImage}/>
            <div style={cardLabel}>APPETIZER</div>
          </div>

        </div>
      </section>

      {/* POPULAR DISHES */}
      <section style={{ padding: "40px", textAlign: "center" }}>
        <h2>POPULAR LOCAL DISHES</h2>
        <CardList />
      </section>

      {/* PROMO FRAME */}
      <section style={promoSection}>

        <div style={promoBanner}>
          <div>
            <h2>Discover Amazing Local Flavors</h2>
            <p>Enjoy freshly prepared meals from trusted local kitchens near you.</p>
            <button style={promoButton}>EXPLORE MENU</button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="Promo"
            style={promoImage}
          />
        </div>

        {/* FEATURE CARDS */}
        <div style={featureGrid}>

          <div style={featureCard}>
            <div style={iconWrapper}>
              <FaLeaf size={28} color="green" />
            </div>
            <h4>Fresh Ingredients</h4>
            <p>Meals prepared daily using high-quality local produce.</p>
          </div>

          <div style={featureCard}>
            <div style={iconWrapper}>
              <FaMotorcycle size={28} color="orange" />
            </div>
            <h4>Fast Delivery</h4>
            <p>Quick and reliable delivery straight to your doorstep.</p>
          </div>

          <div style={featureCard}>
            <div style={iconWrapper}>
              <FaTags size={28} color="#333" />
            </div>
            <h4>Affordable Prices</h4>
            <p>Delicious food that fits your everyday budget.</p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={footerStyle}>
        <div style={footerContainerStyle}>
          <div style={footerSectionStyle}>
            <h3>LokalFeast</h3>
            <p>Delivering happiness to your doorstep.</p>
          </div>

          <div style={footerSectionStyle}>
            <h4>Quick Links</h4>
            <p>Home</p>
            <p>Menu</p>
            <p>About</p>
            <p>Contact</p>
          </div>

          <div style={footerSectionStyle}>
            <h4>Contact</h4>
            <p>Email: support@lokalfeast.com</p>
            <p>Phone: +63 912 345 6789</p>
          </div>
        </div>

        <p style={{ marginTop: "30px", fontSize: "14px" }}>
          © 2026 LokalFeast. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

export default Homepage;


const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  backgroundColor: "#efeae2"
};

const linkStyle = {
  margin: "0 10px",
  textDecoration: "none",
  color: "black"
};

const heroStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "50px",
  backgroundColor: "#efeae2"
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "orange",
  color: "white",
  border: "none",
  marginTop: "10px",
  cursor: "pointer"
};

const imageStyle = {
  width: "500px",
  borderRadius: "20px"
};

const categorySection = {
  padding: "50px 40px",
  backgroundColor: "#ffffff"
};

const categoryContainer = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  gridTemplateAreas: `
    "dessert side side"
    "dessert snacks appetizer"
  `,
  gap: "15px",
  height: "500px",
  maxWidth: "1000px",
  margin: "0 auto"
};

const largeCard = { 
    position: "relative", 
    borderRadius: "15px", 
    overflow: "hidden" };
const smallCard = { 
    position: "relative", 
    borderRadius: "15px", 
    overflow: "hidden" };

const cardImage = { 
    width: "100%", 
    height: "100%", 
    objectFit: "cover" };

const cardLabel = {
  position: "absolute",
  bottom: "10px",
  left: "10px",
  backgroundColor: "rgba(0,0,0,0.7)",
  color: "white",
  padding: "6px 12px",
  borderRadius: "8px"
};

const promoSection = { 
    backgroundColor: "#f0f0f0", 
    padding: "60px 40px" };

const promoBanner = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  alignItems: "center",
  gap: "30px",
  backgroundColor: "#e5e5e5",
  padding: "40px",
  borderRadius: "12px",
  maxWidth: "1100px",
  margin: "0 auto 40px auto"
};

const promoButton = {
  marginTop: "15px",
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const promoImage = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "10px"
};

const featureGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "30px",
  maxWidth: "1100px",
  margin: "0 auto",
  textAlign: "center"
};

const featureCard = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const iconWrapper = {
  width: "60px",
  height: "60px",
  backgroundColor: "#f2f2f2",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 15px auto"
};

const footerStyle = {
  backgroundColor: "#333",
  color: "white",
  padding: "20px 0",
  textAlign: "center"
};

const footerContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 20px"
};

const footerSectionStyle = {
  flex: "1",
  minWidth: "200px",
  marginBottom: "20px"
};