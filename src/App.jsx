import React, { useState } from "react";
import "./App.css"; // Import custom CSS file

const App = () => {
  const [textFields, setTextFields] = useState([""]); // Start with one text field
  const [textSubtitle, setTextSubField] = useState(""); // Start with one text field
  const [copySuccess, setCopySuccess] = useState(false); // State for copy button feedback

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
    return `function createSlidesAndExportPDF() {
  var presentation = SlidesApp.create("${new Date(Date.now()).toUTCString()}");
  var slides = presentation.getSlides();

  // Slide dimensions (Google Slides default: 1920x1080 pixels)
  var slideWidth = 1080;
  var slideHeight = 1080;

  // Content - Split by new line
  var fullText = "${filteredText.join('\\n\\n" +\n    "')}";

  // Split content into slides
  var contentArray = fullText.split("\\n\\n").map(s => s.trim()).filter(s => s !== "");

  // Remove default empty slide
  if (slides.length > 0) {
    slides[0].remove();
  }

  // Create slides with RTL text and centered text box
  contentArray.forEach(function(text, index) {
    var slide = presentation.appendSlide(SlidesApp.PredefinedLayout.TITLE_AND_BODY);

    // Set title text
    var titleShape = slide.getShapes()[0].getText();
    
    titleShape.setText(index === 0 ? text : "${textSubtitle} " + index); 
    if(titleShape){
        titleShape.getTextStyle().setFontSize(${textSubtitle ? 22 : 0});
        titleShape.getParagraphStyle().setTextDirection(SlidesApp.TextDirection.RIGHT_TO_LEFT);
        titleShape.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.START);

        if(index === 0) {
        titleShape.getTextStyle().setFontSize(64).setBold(true);
        titleShape.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
        }
    }

    // Set body text
    var bodyShape = slide.getShapes()[1].getText();
    bodyShape.setText(index > 0 ? text : "");
    if(index > 0) {
      bodyShape.getTextStyle().setFontSize(44).setBold(true);
      bodyShape.getTextStyle().setForegroundColor("#000000");
      bodyShape.getParagraphStyle().setTextDirection(SlidesApp.TextDirection.RIGHT_TO_LEFT);
      bodyShape.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.START);
    }    
  });

  Logger.log("Presentation created: " + presentation.getUrl());
}`;
  };

  // Function to copy text to clipboard
  const copyToClipboard = () => {
    const textToCopy = generateArray();
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="app-container dark-mode">
      <div className="content-box">
        <h2>G Slides Generator</h2>

        <div className="text-fields">
          <input
            className="input"
            placeholder="Add pager text here..."
            value={textSubtitle}
            onChange={(e) => setTextSubField(e.target.value)}
          />
          {textFields.map((text, index) => (
            <div key={index} className="text-field-container">
              <textarea
                className="text-area"
                placeholder="Add text.."
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
          ➕ Add Paragraph
        </button>
        <button className="copy-button" onClick={copyToClipboard}>
          {copySuccess ? "✅ Copied!" : "📋 Copy Code"}
        </button>

        {/* Display Generated JavaScript Code */}
        <h3>📜 App Script code:</h3>
        <div className="code-container">
          <pre className="code-box">{generateArray()}</pre>
          <button className="copy-button" onClick={copyToClipboard}>
            {copySuccess ? "✅ Copied!" : "📋 Copy Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
