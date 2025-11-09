import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold mb-4">Product Details</h2>
      <p>Showing details for product ID: {id}</p>
    </div>
  );
};

export default ProductDetails;
