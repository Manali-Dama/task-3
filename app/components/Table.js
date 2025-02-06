import React from "react";
import "@/app/styles/Table.css";

const Table = ({ headers, data, variant = "default" }) => {
    return (
      <div className="table-container">
        <table className={`custom-table ${variant}`}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header.Label}</th>
              ))}
              <th>Actions</th>
            </tr>
            
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((cell, cellIndex) => (
                    <td key={cellIndex}>{row[cell?.fieldkey]}</td>
                  ))}
                  <td>
                    <button><img src="https://stage.mkwms.dev/assets/table/Edit-button.svg" width={20} height={20}/></button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length+1}>No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;
