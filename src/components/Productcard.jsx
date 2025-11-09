import React from "react";
import { Link } from "react-router-dom";

const Productcard = ({ product }) => {
  return (
    <div className="border rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center">
      <img
        src={product.image}
        alt={product.title}
        className="w-32 h-32 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <Link
        to={`/product/${product.id}`}
        className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default Productcard;
