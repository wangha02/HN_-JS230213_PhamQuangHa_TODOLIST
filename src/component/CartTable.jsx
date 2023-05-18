import React from 'react';

const CartTable = ({
  cartItems,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  totalPrice,
  handlePayment,
  clearCart,
}) => {
  return (
    <>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>
                <img width={100} src={item.imageUrl} alt={item.name} />
              </td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => decreaseQuantity(index)}>
                  <i className="fa-solid fa-minus"></i>
                </button>
                {item.qty}
                <button onClick={() => increaseQuantity(index)}>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </td>
              <td>
                <button
                  onClick={() => removeFromCart(index, item.price, item.qty)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Tổng tiền: ${totalPrice}</p>
      <div className="actions">
        <button onClick={handlePayment}>Thanh Toán</button>
        <button onClick={clearCart}>
          <i className="fa-solid fa-delete-left"></i>
        </button>
      </div>
    </>
  );
};

export default CartTable;
