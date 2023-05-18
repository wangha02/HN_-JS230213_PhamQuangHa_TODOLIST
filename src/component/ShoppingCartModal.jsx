import React from 'react';
import CartTable from './CartTable';

const ShoppingCartModal = ({
  cartItems,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  totalPrice,
  handleToggleModal,
  handlePayment,
  clearCart,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Giỏ của bạn trống không.</p>
        ) : (
          <CartTable
            cartItems={cartItems}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            removeFromCart={removeFromCart}
            totalPrice={totalPrice}
            handlePayment={handlePayment}
            clearCart={clearCart}
          />
        )}
        <button onClick={handleToggleModal}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartModal;
