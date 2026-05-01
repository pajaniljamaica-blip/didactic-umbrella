import React, { useState } from "react";
import ProductList from "./view";

export default function ProductForm() {
    const [product, setProduct] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3300/api/v1/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product,
                category,
            }),
        });

        if (response.ok) {
            alert("Product added successfully!");
            setProduct("");
            setCategory("");
        } else {
            alert("Failed to add product");
        }
    };

    return (
        <div style={{ padding: 20}}>
            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Product Name"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                />

                <br /><br />

                <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                />

                <br /><br />

                <button type="submit">Submit</button>
            </form>
            {/* /<ProductList /> */}
        </div>
    );
}