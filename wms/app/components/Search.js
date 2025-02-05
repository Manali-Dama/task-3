import { useState, useEffect, useRef } from "react";

const Search = ({ headers, onSearch }) => {
  const [term, setTerm] = useState("");
  const [selectedHeader, setSelectedHeader] = useState(headers[0]);
  const abortControllerRef = useRef(null);

  const handleSearchChange = (e) => {
    setTerm(e.target.value);
  };

  const handleHeaderChange = (e) => {
    setSelectedHeader(e.target.value);
  };

  // Trigger search on term change and cancel previous request if any
  useEffect(() => {
    if (!term) return; // Skip if no search term

    // Cancel the previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Call onSearch with the current header and term
    onSearch(selectedHeader, term, controller.signal);
    
    return () => controller.abort(); // Cleanup on unmount or term change
  }, [term, selectedHeader, onSearch]);

  return (
    <div className="search-container">
      <select onChange={handleHeaderChange} value={selectedHeader}>
        {headers.map((header, index) => (
          <option key={index} value={header.toLowerCase().replace(/\s+/g, "_")}>
            {header}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={term}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
