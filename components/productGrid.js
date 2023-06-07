import React, { useState, useEffect } from 'react';
import getProducts from './getProducts';
import ProductCard from './productCard';

//gets data from mock shop API
//get card markup
//render cards using data in a grid

export default function ProductGrid() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const renderCard = (current_item) => {
    return <ProductCard key={current_item.id} product={current_item} />;
  };

  const containerStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    padding: "60px 80px",
    gridGap: "40px 40px"
  };

  const cards = products.map((current_item) => renderCard(current_item));

  return <div style={containerStyles}>{cards}</div>;

}