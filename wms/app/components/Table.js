import React from "react";
import "@/app/styles/Table.css";

const Table = ({ headers, data, actions, variant = "default" }) => {
    return (
      <div className="table-container">
        <table className={`custom-table ${variant}`}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header.Label}</th>
              ))}
              <th></th>    
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
                    {actions.map((action) => (
                      <button onClick={action.event} key={action.use} className="px-2"><img src={action.icon}/></button>
                    ))}
                    </td>
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
