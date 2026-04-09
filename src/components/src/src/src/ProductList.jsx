import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: "$15", description: "Produces oxygen at night, improving air quality." },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: "$12", description: "Filters formaldehyde and xylene from the air." }
            ]
        },
        {
            category: "Aromatic",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", cost: "$20", description: "Calming scent used for relaxation and stress relief." },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", cost: "$18", description: "Sweet fragrance that blooms beautifully." }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div>
            <div className="navbar">
                <div className="tag">Paradise Nursery</div>
                <div className="cart" onClick={() => setShowCart(true)}>
                    <a href="#">
                        <h1 className="cart_icon">
                            <span className="cart_quantity_count">{totalItems}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68"><rect width="256" height="256" fill="none"></rect><circle cx="80" cy="216" r="12"></circle><circle cx="184" cy="216" r="12"></circle><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.3A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                        </h1>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2 className="category-title">{category.category}</h2>
                            <div className="plant-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="plant-card" key={plantIndex}>
                                        <img className="plant-image" src={plant.image} alt={plant.name} />
                                        <div className="plant-title">{plant.name}</div>
                                        <p>{plant.description}</p>
                                        <div className="plant-cost">{plant.cost}</div>
                                        <button 
                                            className="add-to-cart-button" 
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={cartItems.some(item => item.name === plant.name)}
                                        >
                                            {cartItems.some(item => item.name === plant.name) ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
