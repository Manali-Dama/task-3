"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "@/store/slices/productsSlice";
import "@/app/globals.css";

const ProductMaster = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Unpublished Products</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Manufacturer</th>
            <th>Price</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_code}</td>
                <td>{product.ws_code}</td>
                <td>₹{product.product_name}</td>
                <td>{product.manufacturer}</td>
                <td>{product.combination}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductMaster;
