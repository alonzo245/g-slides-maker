import React, { useState, useEffect } from "react";
import "./App.css"; // Import custom CSS file

const App = () => {
  const [textFields, setTextFields] = useState([""]); // Start with one text field

  // Function to add a new text field
  const addTextField = () => {
    setTextFields([...textFields, ""]);
  };

  // Function to remove a text field by index
  const removeTextField = (index) => {
    const newFields = textFields.filter((_, i) => i !== index);
    setTextFields(newFields);
  };

  // Function to handle text input changes
  const handleTextChange = (index, value) => {
    const newFields = [...textFields];
    newFields[index] = value;
    setTextFields(newFields);
  };

  // Function to generate the fullText JavaScript array
  const generateArray = () => {
    const filteredText = textFields.filter((text) => text.trim() !== "");
    return (
      `var fullText = \n    "` + filteredText.join('\\n\\n" +\n    "') + '";'
    );
  };

  return (
    <div className={`app-container dark-mode`}>
      <div className="content-box">
        <h2>🔹 יצירת fullText Array</h2>
        <p>הזן כל קטע של טקסט בשדה נפרד. ניתן להוסיף או להסיר שדות.</p>

        {/* Dynamic Text Fields */}
        <div className="text-fields">
          {textFields.map((text, index) => (
            <div key={index} className="text-field-container">
              <textarea
                className="text-area"
                placeholder="כתוב כאן טקסט..."
                value={text}
                onChange={(e) => handleTextChange(index, e.target.value)}
              />
              {textFields.length > 1 && (
                <button
                  className="remove-button"
                  onClick={() => removeTextField(index)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add New Text Field */}
        <button className="add-button" onClick={addTextField}>
          ➕ הוסף טקסט
        </button>

        {/* Display Generated JavaScript Code */}
        <h3>📜 קוד JavaScript שנוצר:</h3>
        <pre className="code-box">{generateArray()}</pre>
      </div>
    </div>
  );
};

export default App;
