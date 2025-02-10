"use client";

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonForm from "./CommonForm";
import { fetchDropdownsRequest } from "@/store/slices/dropdownSlice";
import { form_fields as baseFormFields } from "@/data/AddProductForm";
import "@/app/styles/AddProduct.css";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const dropdowns = useSelector((state) => state.dropdowns.dropdowns);

  useEffect(() => {
    dispatch(fetchDropdownsRequest());
  }, [dispatch]);

  // Transform API response to match the expected dropdown structure
  const transformDropdownOptions = (key) => {
    const items = dropdowns?.[key]; // Safely access the key
  
    if (!Array.isArray(items)) {
      console.warn(`Expected an array for key '${key}', but got:`, items);
      return []; // Return an empty array if the key is missing or not an array
    }
  
    return items.map((item) => ({
      field_key: item,
      label: item,
    }));
  };
  

  // Memoize dropdown options to prevent unnecessary re-renders
  const transformedDropdowns = useMemo(() => {
    return Object.keys(dropdowns || {}).reduce((acc, key) => {
      acc[key] = transformDropdownOptions(key);
      return acc;
    }, {});
  }, [dropdowns]);

  // Debugging logs (only runs when dropdowns change)
  useEffect(() => {
    if (dropdowns) {
      console.log("Dropdowns from API:", dropdowns);
      console.log("Transformed Dropdowns:", transformedDropdowns);
    }
  }, [dropdowns, transformedDropdowns]);

  // Inject transformed dropdown options into form_fields
  const form_fields = {
    ...baseFormFields,
    sections: baseFormFields.sections.map((section) => ({
      ...section,
      fields: section.fields.map((field) =>
        field.type === "dropdown"
          ? { ...field, options: transformedDropdowns[field.field_key] || [] }
          : field
      ),
    })),
  };

  const handleSubmit = (formData) => {
    dispatch({ type: "addProduct", payload: formData });
  };

  return <CommonForm title="Add Product" formFields={form_fields} onSubmit={handleSubmit} />;
};

export default AddProductForm;




// 'use client';

// import React from "react";
// import CommonForm from "./CommonForm";
// import { form_fields } from "@/data/AddProductForm";
// import "@/app/styles/AddProduct.css";

// const AddProductForm = () => {
//   const handleSubmit = (formData) => {
//     console.log("Form Submitted", formData);
//     // Handle form submission logic here
//   };

//   return <CommonForm title="Add Product" formFields={form_fields} onSubmit={handleSubmit} />;
// };

// export default AddProductForm;

