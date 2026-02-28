import React from "react";
import CardList from "./components/cardlist";

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

      {/* HERO SECTION (INTRO) */}
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

      <section style={categorySection}>
        <div style={categoryContainer}>

          <div style={largeCard}>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              alt="Meals"
              style={cardImage}
            />
            <div style={cardLabel}>FEATURED MEALS</div>
          </div>

          <div style={rightGrid}>

            <div style={smallCard}>
              <img
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
                alt="Healthy"
                style={cardImage}
              />
              <div style={cardLabel}>HEALTHY DISHES</div>
            </div>

            <div style={bottomGrid}>
              <div style={smallCard}>
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                  alt="Kids"
                  style={cardImage}
                />
                <div style={cardLabel}>KIDS MEALS</div>
              </div>

              <div style={smallCard}>
                <img
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349"
                  alt="Promo"
                  style={cardImage}
                />
                <div style={cardLabel}>SPECIAL OFFERS</div>
              </div>
            </div>

          </div>
        </div>
      </section>


      <section style={{ padding: "40px", textAlign: "center" }}>
        <h2>POPULAR LOCAL DISHES</h2>
        <CardList />
      </section>

  
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

/* CATEGORY SECTION */

const categorySection = {
  padding: "50px 40px",
  backgroundColor: "#ffffff"
};

const categoryContainer = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "15px",
  maxWidth: "1000px",
  margin: "0 auto"
};

const largeCard = {
  position: "relative",
  height: "500px",
  borderRadius: "10px",
  overflow: "hidden"
};

const rightGrid = {
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  gap: "15px"
};

const bottomGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px"
};

const smallCard = {
  position: "relative",
  borderRadius: "10px",
  overflow: "hidden"
};

const cardImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover"
};

const cardLabel = {
  position: "absolute",
  bottom: "15px",
  left: "15px",
  backgroundColor: "rgba(0,0,0,0.7)",
  color: "white",
  padding: "8px 14px",
  borderRadius: "8px",
  fontSize: "14px"
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