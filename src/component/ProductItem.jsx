import React from 'react';

const ProductItem = ({ product, addToCart }) => {
  return (
    <li>
      <div>
        <img src={product.imageUrl} alt={product.name} />
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="price">Giá: ${product.price}</p>
          <p className="heading">{product.heading}</p>
          <p className="description">{product.des}</p>
          <button
            style={{ width: '60px', height: '40px', fontSize: '25px' }}
            onClick={() => addToCart(product)}
          >
            <i className="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
