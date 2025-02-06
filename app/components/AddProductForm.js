// app/components/AddProductForm.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductStart } from "@/store/slices/productsSlice";
import InputField from "./InputField"; // Import the reusable InputField

const AddProductForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { addProductLoading, addProductError } = useSelector(
    (state) => state.products
  );

  const [product, setProduct] = useState({
    product_code: "",
    product_name: "",
    manufacturer: "",
    combination: "",
    publish_status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductStart(product));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      {addProductError && <p className="error">{addProductError}</p>}

      {/* Use reusable InputField component */}
      <InputField
        label="Product Code"
        name="product_code"
        value={product.product_code}
        onChange={handleChange}
      />
      <InputField
        label="Product Name"
        name="product_name"
        value={product.product_name}
        onChange={handleChange}
      />
      <InputField
        label="Manufacturer"
        name="manufacturer"
        value={product.manufacturer}
        onChange={handleChange}
      />
      <InputField
        label="Combination"
        name="combination"
        value={product.combination}
        onChange={handleChange}
      />
      <InputField
        label="Publish Status"
        name="publish_status"
        value={product.publish_status}
        onChange={handleChange}
      />
      
      <button type="submit" disabled={addProductLoading}>
        {addProductLoading ? "Adding..." : "Add Product"}
      </button>
      <button type="button" onClick={closeModal}>
        Close
      </button>
    </form>
  );
};

export default AddProductForm;
