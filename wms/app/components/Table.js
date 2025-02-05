import React from "react";
import "@/app/styles/Table.css";

const Table = ({ headers, data, variant = "default" }) => {
    return (
      <div className="table-container">
        <table className={`custom-table ${variant}`}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length}>No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;
