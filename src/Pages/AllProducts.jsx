import React from "react";
import Productcard from "../components/Productcard.jsx";

const products = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    price: 999,
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-select-202309?wid=512&hei=512&fmt=jpeg&qlt=90&.v=1693082440549",
  },
  {
    id: 2,
    title: "MacBook Air M3",
    price: 1299,
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba15-midnight-select-202306?wid=512&hei=512&fmt=jpeg&qlt=90&.v=1684340991291",
  },
  {
    id: 3,
    title: "Samsung Galaxy S24 Ultra",
    price: 899,
    image: "https://images.samsung.com/is/image/samsung/p6pim/bd/sm-s928blgibdc/gallery/bd-galaxy-s24-ultra-s928-sm-s928blgibdc-thumb-538484142",
  },
];

const AllProducts = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Productcard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
