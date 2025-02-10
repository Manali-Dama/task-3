import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance"; // Import the custom axios instance

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    isAssured: "",
    isRefrigerated: "",
    status: "",
    combinations: "",
    manufacturer: "",
  });

  const [molecules, setMolecules] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  // Fetch molecules and manufacturers on component mount
  useEffect(() => {
    const fetchMolecules = async () => {
      try {
        const response = await api.get('/master/molecules');
        console.log("Molecules Response:", response); // Log the response to check the structure
        if (response.data && Array.isArray(response.data.molecules)) {
          setMolecules(response.data.molecules.map(molecule => molecule.name)); // Extract the names
        } else {
          console.error("Unexpected response format for molecules:", response);
        }
      } catch (error) {
        console.error("Error fetching molecules:", error);
      }
    };

    const fetchManufacturers = async () => {
      try {
        const response = await api.get('/master/manufacturers');
        console.log("Manufacturers Response:", response); // Log the response to check the structure
        if (response.data && Array.isArray(response.data.manufacturers)) {
          setManufacturers(response.data.manufacturers.map(manufacturer => manufacturer.name)); // Extract the names
        } else {
          console.error("Unexpected response format for manufacturers:", response);
        }
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      }
    };

    fetchMolecules();
    fetchManufacturers();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters); // Pass the updated filter values to the parent
  };

  // Function to generate the API URL based on selected filters
  const generateApiUrl = () => {
    let url = "https://i-stage.mkwms.dev/api/v1/master/products/unpublished";
    const params = [];

    if (filters.isAssured) params.push(`is_assured=${filters.isAssured}`);
    if (filters.isRefrigerated) params.push(`is_refrigerated=${filters.isRefrigerated}`);
    if (filters.status) params.push(`publish_status=${filters.status}`);
    if (filters.manufacturer) params.push(`manufacturer=${filters.manufacturer}`);
    if (filters.molecule) params.push(`molecule=${filters.molecule}`); // Assuming you want to filter by molecule as well.

    // Add sorting if needed
    params.push("sort_by=product_code,d");

    // Add pagination parameters
    params.push("page=1");

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    console.log("Generated API URL:", url);
    return url;
  };

  // You can call `generateApiUrl()` to get the URL whenever the filters change

  return (
    <div className="filter-container">
      <select name="isAssured" onChange={handleFilterChange} value={filters.isAssured}>
        <option value="">Is Assured</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <select name="isRefrigerated" onChange={handleFilterChange} value={filters.isRefrigerated}>
        <option value="">Is Refrigerated</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <select name="status" onChange={handleFilterChange} value={filters.status}>
        <option value="">Status</option>
        <option value="unpublished">Unpublished</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <select name="manufacturer" onChange={handleFilterChange} value={filters.manufacturer}>
        <option value="">Manufacturer</option>
        {manufacturers.map((manufacturer, idx) => (
          <option key={idx} value={manufacturer}>{manufacturer}</option>
        ))}
      </select>
      <select name="molecule" onChange={handleFilterChange} value={filters.molecule}>
        <option value="">Molecule</option>
        {molecules.map((molecule, idx) => (
          <option key={idx} value={molecule}>{molecule}</option>
        ))}
      </select>

      {/* You can use the URL to make the API request here or display it */}
      <button onClick={() => alert(generateApiUrl())}>Generate API URL</button>
    </div>
  );
};

export default Filter;

