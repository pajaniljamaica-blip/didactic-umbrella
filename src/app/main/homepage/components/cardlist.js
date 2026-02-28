import React, { useState } from "react";
import Card from "../../../../components/ui/card";

const products = [
  {
    id: 1,
    title: "Margherita Pizza",
    price: 465,
    rating: 4.5,
    image: "https://colavitarecipes.com/wp-content/uploads/2017/01/marg-1f-1200x1500.jpg"
  },
  {
    id: 2,
    title: "Cheeseburger",
    price: 75,
    rating: 4.3,
    image: "https://www.kitchensanctuary.com/wp-content/uploads/2021/05/Double-Cheeseburger-square-FS-42.jpg"
  },
  {
    id: 3,
    title: "Sushi Platter",
    price: 950,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754"
  },
  {
    id: 4,
    title: "Chocolate Cake",
    price: 650,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
  },
  {
    id: 5,
    title: "Strawberry Ice Cream",
    price: 1500,
    rating: 4.7,
    image: "https://decoranddelicious.org/wp-content/uploads/2025/03/strawberry-ice-cream.webp"
  },
  {
    id: 6,
    title: "Blueberry Pancakes",
    price: 195,
    rating: 4.4,
    image: "https://i.pinimg.com/736x/7a/70/fe/7a70fe889c975e922e3d16cb76e98b28.jpg"
  },
  {
    id: 7,
    title: "Iced Coffee",
    price: 85,
    rating: 4.6,
    image: "https://img.freepik.com/premium-photo/iced-coffee-isolated-white-background_988198-103.jpg"
  },
  {
    id: 8,
    title: "Fresh Lemonade",
    price: 65,
    rating: 4.5,
    image: "https://carlsbadcravings.com/wp-content/uploads/2023/08/lemonade-recipe-10a-1024x1536.jpg"
  }
];

const CardList = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll ? products : products.slice(0, 4);

  return (
    <>
      <div style={styles.container}>
        {visibleProducts.map((item) => (
          <Card
            key={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            rating={item.rating}
          />
        ))}
      </div>

      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "View Less" : "View More"}
        </button>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    padding: "40px 0"
  },
  buttonContainer: {
    textAlign: "center",
    marginBottom: "40px"
  },
  button: {
    padding: "12px 25px",
    fontSize: "16px",
    backgroundColor: "#ff7f50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default CardList;