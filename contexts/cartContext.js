import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {

  //use state on cart variables which will be updated

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState();

  //use effect for updating cart total whenever cart is updated 

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  //calculate and set total value of the cart, including multiple quantities

  const calculateCartTotal = () => {
    let total = 0;
    for (const product of cartItems) {
      const price = product.variants.edges[0].node.price.amount;
      const quantity = product.quantity;
      total += price * quantity;
    }
    setCartTotal(total);
  };

  //add item to cart
  //first check if this item is already in the cart. if yes update the quantity counter, if not add the item

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...product, quantity: 1 }]);
    }
  };

  //update quantities

  const increaseQuantity = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item === product ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item === product && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  //return context data as provider to be able to access it globally

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };