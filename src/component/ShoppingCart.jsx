import React, { useState } from 'react';
import ProductItem from './ProductItem';
import ShoppingCartModal from './ShoppingCartModal';
import "../css/itemList.css"

const ShoppingCart = () => {
    const products = [
        {
            name: 'Airpods Pro',
            price: 150,
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJiKtlpQGkIeOyAPV3qQMNkl8uuRzfGWZtIDb_WgDnam8WjhpL&usqp=CAU',
            qty: 10,
            heading: 'Wireless Noise Cancelling Earphones',
            des:
                'AirPods Pro have been designed to deliver active Noise Cancellation for immersive sound. Transparency mode so you can hear your surroundings.',
        },
        {
            name: 'Apple Watch',
            price: 40900,
            imageUrl: 'https://purepng.com/public/uploads/large/apple-watch-pcq.png',
            qty: 15,
            heading: 'You’ve never seen a watch like this',
            des:
                'The most advanced Apple Watch yet, featuring the Always-On Retina display, the ECG app, international emergency calling, fall detection, and a built-in compass.',
        },
        {
            name: 'Macbook Pro',
            price: 199900,
            imageUrl: 'https://pngimg.com/uploads/macbook/macbook_PNG8.png',
            qty: 20,
            heading: 'The best for the brightest',
            des:
                'Designed for those who defy limits and change the world, the new MacBook Pro is by far the most powerful notebook we’ve ever made. It’s the ultimate pro notebook for the ultimate user.',
        },
        {
            name: 'iPhone 11 pro',
            price: 106600,
            imageUrl:
                'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-midnight-green-select-2019?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1566954990073',
            qty: 35,
            heading: 'Pro cameras. Pro display. Pro performance',
            des:
                'A mind‑blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
        },
        {
            name: 'iPad Pro',
            price: 71900,
            imageUrl:
                'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-wifi-spacegray-202003_FMT_WHH?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1583553704156',
            qty: 25,
            heading: 'Your next computer is not a computer',
            des:
                'It’s a magical piece of glass. It’s so fast most PC laptops can’t catch up. And you can use it with touch, pencil, keyboard, and now trackpad. It’s the new iPad Pro.',
        },
    ];

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isPaymentCompleted, setPaymentCompleted] = useState(false);

    const addToCart = (product) => {
        const existingItemIndex = cartItems.findIndex((item) => item.name === product.name);

        if (existingItemIndex !== -1) {
            const updatedItems = [...cartItems];
            updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                qty: updatedItems[existingItemIndex].qty + 1,
            };
            setCartItems(updatedItems);
        } else {
            setCartItems((prevItems) => [...prevItems, { ...product, qty: 1 }]);
        }

        setTotalPrice((prevTotal) => prevTotal + product.price);
        console.log(`Đã thêm ${product.name} vào giỏ hàng`);
    };


    const removeFromCart = (itemIndex, itemPrice, itemQty) => {
        setCartItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems.splice(itemIndex, 1);
            return updatedItems;
        });
        setTotalPrice((prevTotal) => prevTotal - itemPrice * itemQty);
    };

    const decreaseQuantity = (itemIndex) => {
        setCartItems((prevItems) => {
            const updatedItems = [...prevItems];
            if (updatedItems[itemIndex].qty > 1) {
                updatedItems[itemIndex] = {
                    ...updatedItems[itemIndex],
                    qty: updatedItems[itemIndex].qty - 1,
                };
                setTotalPrice((prevTotal) => prevTotal - updatedItems[itemIndex].price);
            }
            return updatedItems;
        });
    };


    const increaseQuantity = (itemIndex) => {
        setCartItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[itemIndex] = {
                ...updatedItems[itemIndex],
                qty: updatedItems[itemIndex].qty + 1,
            };
            const itemPrice = updatedItems[itemIndex].price;
            const itemQty = updatedItems[itemIndex].qty;
            const updatedTotalPrice = totalPrice - itemPrice * (itemQty - 1) + itemPrice * itemQty;
            setTotalPrice(updatedTotalPrice);
            return updatedItems;
        });
    };



    const handleToggleModal = () => {
        setModalOpen((prevOpen) => !prevOpen);
    };

    const handlePayment = () => {
        setCartItems([]);
        setTotalPrice(0);
        setPaymentCompleted(true);
    };

    const clearCart = () => {
        setCartItems([]);
        setTotalPrice(0);
    };

    return (
        <div className="shopping-cart">
            {isPaymentCompleted ? (
                <p className="purchase-thank-you">Cảm ơn khách hàng đã mua hàng!</p>
            ) : (
                <>
                    <button
                        style={{ width: '100px', height: '50px', fontSize: '30px' }}
                        onClick={handleToggleModal}
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                    <div className="item-list">
                        <ul>
                            {products.map((product, index) => (
                                <ProductItem
                                    key={index}
                                    product={product}
                                    addToCart={addToCart}
                                />
                            ))}
                        </ul>
                    </div>
                    {isModalOpen && (
                        <ShoppingCartModal
                            cartItems={cartItems}
                            decreaseQuantity={decreaseQuantity}
                            increaseQuantity={increaseQuantity}
                            removeFromCart={removeFromCart}
                            totalPrice={totalPrice}
                            handlePayment={handlePayment}
                            clearCart={clearCart}
                            handleToggleModal={handleToggleModal}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ShoppingCart;
