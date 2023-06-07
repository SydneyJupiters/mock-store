import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/cartContext';
import styles from '../styles/Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';

export default function Header() {

  //set state for item quantity in the cart and for cart visibility

  //cart icon will show the number of items in cart if any are added
  //hovering over cart icon will open the cart, showing items there and allowing to update quantity

  const { cartItems, increaseQuantity, decreaseQuantity, cartTotal } = useContext(CartContext);
  const [isCartVisible, setCartVisible] = useState(false);

  const handleIncreaseQuantity = (product) => {
    increaseQuantity(product);
  };

  const handleDecreaseQuantity = (product) => {
    decreaseQuantity(product);
  };

  const handleMouseEnter = () => {
    setCartVisible(true);
  };

  const handleMouseLeave = () => {
    setCartVisible(false);
  };

  return (
    <header className={styles.header}>
      <h1>Mock Store</h1>
      <div className={styles.cartIcon} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <FontAwesomeIcon icon={faCartShopping} />
        
        {cartItems.length > 0 && (
          <span className={styles.cartIcon__counter}>{cartItems.length}</span>
        )}

        {cartItems.length > 0 && isCartVisible && (
          <div className={styles.cart}>
            <div className={styles.cart__heading}>Your Cart</div>

            {cartItems.map((product, index) => (
              <div className={styles.cart__item} key={index}>
                <div className={styles.cart__image}>
                  <img src={product.featuredImage.url} title={product.title} alt={product.title}></img>
                </div>

                <div className={styles.cart__content}>
                  <div className={styles.cart__title}>{product.title} - £{product.variants.edges[0].node.price.amount}</div>
                
                  <div className={styles.cart__quantity}>
                    <button onClick={() => handleDecreaseQuantity(product)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(product)}>+</button>
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.cart__total}>Total: <span>£{cartTotal}</span></div>
            <button className={styles.cart__button}>Checkout</button>            
          </div>
        )}
      </div>
    </header>
  );
}