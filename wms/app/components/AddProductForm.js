"use client"
import React, { useState } from "react";
import { form_fields } from "@/data/AddProductForm";
import "@/app/styles/AddProduct.css";

const AddProductForm = () => {
  const [activeSection, setActiveSection] = useState(
    form_fields.sections.find((section) => section.title === "variable")?.fields[0]?.title || ""
  );
  const [formData, setFormData] = useState({});

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field.field_key]: e.target.value });
  };

  const renderField = (field) => {
    switch (field.type) {
      case "input":
        return (
          <div className="form-group" key={field.field_key}>
            <label>
              {field.label} {field.required && <span className="required">*</span>}
            </label>
            <input
              type="text"
              className="form-input"
              required={field.required}
              onChange={(e) => handleInputChange(e, field)}
            />
          </div>
        );
      case "dropdown":
        return (
          <div className="form-group" key={field.field_key}>
            <label>
              {field.label} {field.required && <span className="required">*</span>}
            </label>
            <select
              className="form-input"
              required={field.required}
              onChange={(e) => handleInputChange(e, field)}
            >
              <option value="">Select {field.label}</option>
              {/* Replace with actual options if available */}
            </select>
          </div>
        );
      case "boolean":
        return (
          <div className="form-group" key={field.field_key}>
            <label>
              <input
                type="checkbox"
                onChange={(e) => handleInputChange(e, field)}
              />
              {field.label} {field.required && <span className="required">*</span>}
            </label>
          </div>
        );
      case "button":
        return (
          <button key={field.label} className="menu-button">
            {field.label}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Add Product</h2>
        
        {/* Fixed Section Fields */}
        {form_fields.sections
          .find((section) => section.title === "fixed")
          ?.fields.map(renderField)}

        {/* Variable Sections Menu */}
        <div className="menu-bar">
          {form_fields.sections
            .find((section) => section.title === "variable")
            ?.fields.map((section) => (
              <button
                key={section.title}
                className={`menu-button ${activeSection === section.title ? "active" : ""}`}
                onClick={() => setActiveSection(section.title)}
              >
                {section.title}
              </button>
            ))}
        </div>

        {/* Dynamic Section Fields */}
        {form_fields.sections
          .find((section) => section.title === "variable")
          ?.fields.filter((sec) => sec.title === activeSection)
          .flatMap((sec) => sec.fields.map(renderField))}

        <button className="submit-button">Save</button>
      </div>
    </div>
  );
};

export default AddProductForm;





// import React, { useState } from "react";
// import { form_fields } from "@/data/AddProductForm";

// const DynamicForm = () => {
//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});
//   const [activeSection, setActiveSection] = useState(null);

//   const handleChange = (fieldKey, value) => {
//     setFormData((prev) => ({ ...prev, [fieldKey]: value }));
//     if (errors[fieldKey]) {
//       setErrors((prev) => ({ ...prev, [fieldKey]: "" }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let newErrors = {};
//     form_fields.sections.forEach((section) => {
//       section.fields.forEach((field) => {
//         if (field.required && !formData[field.field_key]) {
//           newErrors[field.field_key] = `${field.label} is required`;
//         }
//       });
//     });
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length === 0) {
//       console.log("Form submitted successfully", formData);
//     }
//   };

//   const renderField = (field) => {
//     switch (field.type) {
//       case "input":
//         return (
//           <input
//             type="text"
//             className="border p-2 w-full"
//             value={formData[field.field_key] || ""}
//             onChange={(e) => handleChange(field.field_key, e.target.value)}
//           />
//         );
//       case "dropdown":
//         return (
//           <select
//             className="border p-2 w-full"
//             onChange={(e) => handleChange(field.field_key, e.target.value)}
//           >
//             <option value="">Select {field.label}</option>
//           </select>
//         );
//       case "checkbox":
//       case "boolean":
//         return (
//           <input
//             type="checkbox"
//             onChange={(e) => handleChange(field.field_key, e.target.checked)}
//           />
//         );
//       case "button":
//         return <button className="bg-blue-500 text-white p-2">{field.label}</button>;
//       default:
//         return (
//           <input
//             type="text"
//             className="border p-2 w-full"
//             value={formData[field.field_key] || ""}
//             onChange={(e) => handleChange(field.field_key, e.target.value)}
//           />
//         );
//     }
//   };

//   return (
//     <div className="p-5 border rounded-md w-full max-w-xl">
//       {form_fields.sections.map((section, index) => (
//         <div key={index} className="mb-5">
//           {section.title === "fixed" ? (
//             <div>
//               <h2 className="font-bold text-lg mb-3">{section.title}</h2>
//               <form onSubmit={handleSubmit}>
//                 {section.fields.map((field, fIdx) => (
//                   <div key={fIdx} className="mb-4">
//                     {field.label && <label className="block mb-1">{field.label}</label>}
//                     {renderField(field)}
//                     {errors[field.field_key] && <p className="text-red-500 text-sm">{errors[field.field_key]}</p>}
//                   </div>
//                 ))}
//               </form>
//             </div>
//           ) : section.title === "variable" ? (
//             <div>
//               <div className="flex space-x-4 mb-4">
//                 {section.fields.map((subSection, idx) => (
//                   <button
//                     key={idx}
//                     className={`px-4 py-2 border ${activeSection === subSection.title ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//                     onClick={() => setActiveSection(subSection.title)}
//                   >
//                     {subSection.title}
//                   </button>
//                 ))}
//               </div>
//               {section.fields.map((subSection, idx) => (
//                 activeSection === subSection.title ? (
//                   <div key={idx} className="mb-5">
//                     <h2 className="font-bold text-lg mb-3">{subSection.title}</h2>
//                     {subSection.fields.map((field, fIdx) => (
//                       <div key={fIdx} className="mb-4">
//                         {field.label && <label className="block mb-1">{field.label}</label>}
//                         {renderField(field)}
//                         {errors[field.field_key] && <p className="text-red-500 text-sm">{errors[field.field_key]}</p>}
//                       </div>
//                     ))}
//                   </div>
//                 ) : null
//               ))}
//             </div>
//           ) : null}
//         </div>
//       ))}
//       <button type="submit" className="bg-green-500 text-white p-2">Submit</button>
//     </div>
//   );
// };

// export default DynamicForm;
