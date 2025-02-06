"use client"

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "@/store/slices/productsSlice";
import Table from "@/app/components/Table"; 
import "@/app/globals.css";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
// import Search from "@/app/components/Search";

const ProductMaster = () => {
  const dispatch = useDispatch();
  const { products, loading, error, current_page, last_page } = useSelector(
    (state) => state.products
  );

  const abortControllerRef = useRef(null); // To hold the AbortController reference

  useEffect(() => {
    dispatch(fetchProductsStart({ page: current_page }));
  }, [dispatch, current_page]);

  const nextPage = () => {
    if (current_page < last_page) {
      dispatch(fetchProductsStart({ page: current_page + 1 }));
    }
  };

  const prevPage = () => {
    if (current_page > 1) {
      dispatch(fetchProductsStart({ page: current_page - 1 }));
    }
  };

  const handleSearch = (header, term) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Prepare search query
    const formattedHeader = header.toLowerCase().replace(/\s+/g, "_");
    // const searchQuery = `search=${term},${formattedHeader}&sort_by=created,d&page=${current_page}`;

    // Dispatch action without the signal, handle it locally
  //   dispatch(fetchProductsStart({ 
  //     url: `https://i-stage.mkwms.dev/api/v1/master/products/unpublished?${searchQuery}`,
  //     controller, // Pass the controller to handle cancellation within the action
  //   }));
  // };

  dispatch(fetchProductsStart({ 
    url: `https://i-stage.mkwms.dev/api/v1/master/products/unpublished?$`,
    controller, // Pass the controller to handle cancellation within the action
  }));
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const headers = [
    {Label:"Product Code", fieldkey:"product_code"},
    {Label:"Wondersoft Code", fieldkey:"ws_code"},
    {Label:"Product Name", fieldkey:"product_name"},
    {Label:"Manufacturer", fieldkey:"manufacturer"},
    {Label:"Combination", fieldkey:"combination"},
    {Label:"Publish Status", fieldkey:"publish_status"},
    ]
  // ]} data={products}]
    
  //  [ "Product Code", "Wondersoft Code", "Product Name", "Manufacturer", "Combination", "Publish Status"];

  // const tableData = products.map((product) => [
  //   product.product_code,
  //   product.ws_code,
  //   product.product_name,
  //   product.manufacturer,
  //   product.combination,
  //   product.publish_status,
  // ]);

  return (
    <div className="py-3">
      <Breadcrumbs paths={[{ name: "Home", link: "/" }, { name: "Product Master" }]} />

      <div className="bg-white mt-3">
        <h1>Unpublished Products</h1>
{/* 
        <Search headers={headers.slice(0, 4)} onSearch={handleSearch} /> */}

        <Table headers={headers} data={products} variant="products" />

        <div className="pagination">
          <button onClick={prevPage} disabled={current_page === 1}>
            Previous
          </button>
          <span>Page {current_page} of {last_page}</span>
          <button onClick={nextPage} disabled={current_page >= last_page}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductMaster;




// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsStart } from "@/store/slices/productsSlice";
// import Table from "@/app/components/Table"; // Import reusable table
// import "@/app/globals.css";
// import { Breadcrumbs } from "@/app/components/Breadcrumbs";
// import Search from "@/app/components/Search"; // Import Search component

// const ProductMaster = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error, current_page, last_page } = useSelector(
//     (state) => state.products
//   );

//   const [filteredProducts, setFilteredProducts] = useState(products);

//   useEffect(() => {
//     dispatch(fetchProductsStart({ page: current_page }));
//   }, [dispatch, current_page]);

//   useEffect(() => {
//     setFilteredProducts(products); // Reset filter when products change
//   }, [products]);

//   const nextPage = () => {
//     if (current_page < last_page) {
//       dispatch(fetchProductsStart({ page: current_page + 1 }));
//     }
//   };

//   const prevPage = () => {
//     if (current_page > 1) {
//       dispatch(fetchProductsStart({ page: current_page - 1 }));
//     }
//   };

//   const handleSearch = (header, term) => {
//     const filtered = products.filter((product) => {
//       const value = product[header.toLowerCase().replace(/\s+/g, "_")]; // Match header to product field
//       return value && value.toString().toLowerCase().includes(term.toLowerCase());
//     });
//     setFilteredProducts(filtered);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   // Define table headers
//   const headers = [
//     "Product Code",
//     "Wondersoft Code",
//     "Product Name",
//     "Manufacturer",
//     "Combination",
//     "Publish Status",
//   ];

//   // Transform product data into table format
//   const tableData = filteredProducts.map((product) => [
//     product.product_code,
//     product.ws_code,
//     product.product_name,
//     product.manufacturer,
//     product.combination,
//     product.publish_status,
//   ]);

//   return (
//     <div className="py-3">
//       <Breadcrumbs
//         paths={[
//           { name: "Home", link: "/" },
//           { name: "Product Master" },
//         ]}
//       />

//       <div className="bg-white mt-3">
//         <h1>Unpublished Products</h1>

//         {/* Search component */}
//         <Search headers={headers} onSearch={handleSearch} />

//         <Table headers={headers} data={tableData} variant="products" />

//         {/* Pagination Controls */}
//         <div className="pagination">
//           <button onClick={prevPage} disabled={current_page === 1}>
//             Previous
//           </button>
//           <span>
//             Page {current_page} of {last_page}
//           </span>
//           <button onClick={nextPage} disabled={current_page >= last_page}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductMaster;




// pages/product-master.js
// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsStart } from "@/store/slices/productsSlice";
// import Table from "@/app/components/Table"; // Import reusable table
// import AddProductForm from "@/app/components/AddProductForm"; // Import AddProductForm component
// import "@/app/globals.css";

// const ProductMaster = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error, current_page, last_page } = useSelector(
//     (state) => state.products
//   );
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     dispatch(fetchProductsStart({ page: current_page }));
//   }, [dispatch, current_page]);

//   const nextPage = () => {
//     if (current_page < last_page) {
//       dispatch(fetchProductsStart({ page: current_page + 1 }));
//     }
//   };

//   const prevPage = () => {
//     if (current_page > 1) {
//       dispatch(fetchProductsStart({ page: current_page - 1 }));
//     }
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   // Define table headers
//   const headers = [
//     "Product Code",
//     "Wondersoft Code",
//     "Product Name",
//     "Manufacturer",
//     "Combination",
//     "Publish Status",
//   ];

//   // Transform product data into table format
//   const tableData = products.map((product) => [
//     product.product_code,
//     product.ws_code,
//     product.product_name,
//     product.manufacturer,
//     product.combination,
//     product.publish_status,
//   ]);

//   return (
//     <div className="bg-white">
//       <h1>Unpublished Products</h1>
//       <button onClick={openModal}>Add Product</button>

//       <Table headers={headers} data={tableData} variant="products" />

//       {/* Pagination Controls */}
//       <div className="pagination">
//         <button onClick={prevPage} disabled={current_page === 1}>
//           Previous
//         </button>
//         <span>
//           Page {current_page} of {last_page}
//         </span>
//         <button onClick={nextPage} disabled={current_page >= last_page}>
//           Next
//         </button>
//       </div>

//       {/* Add Product Modal */}
//       {isModalOpen && (
//         <div className="modal">
//           <AddProductForm closeModal={closeModal} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductMaster;




