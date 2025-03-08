import React, { useState } from "react";
import "./App.css";
import Options from "./Options";

const App = () => {
  const [items, setItems] = useState([
    {
      text: "",
      title: "",
      isBold: false,
      color: "#000000",
      isCentered: false,
      fontSize: 25,
      isBoldTitle: true,
      colorTitle: "#000000",
      isCenteredTitle: false,
      fontSizeTitle: 33,
    },
  ]);

  const [copySuccess, setCopySuccess] = useState(false);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Add new item
  const addItem = () => {
    setItems([
      ...items,
      {
        text: "",
        title: items.at(-1).title,
        isBold: items.at(-1).isBold,
        color: items.at(-1).color,
        isCentered: items.at(-1).isCentered,
        fontSize: items.at(-1).fontSize,
        isBoldTitle: items.at(-1).isBoldTitle,
        colorTitle: items.at(-1).colorTitle,
        isCenteredTitle: items.at(-1).isCenteredTitle,
        fontSizeTitle: items.at(-1).fontSizeTitle,
      },
    ]);
  };

  // Remove item
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Generate JavaScript array
  const generateArray = () => {
    return `function createSlidesAndExportPDF() {
  var presentation = SlidesApp.create(new Date(Date.now()).toUTCString());
  var slides = presentation.getSlides();



  var fullText = ${JSON.stringify(items, null, 2)};

// Remove default empty slide
  if (slides.length > 0) {
    slides[0].remove();
  }


  // Create slides with RTL text and centered text box
  fullText.forEach(function(text, index) {
    var slide = presentation.appendSlide(SlidesApp.PredefinedLayout.TITLE_AND_BODY);

        if(text.title){
            var titleShape = slide.getShapes()[0].getText();
            titleShape.setText(text.title);
            titleShape.getTextStyle().setForegroundColor(text.colorTitle);
            titleShape.getParagraphStyle().setTextDirection(SlidesApp.TextDirection.RIGHT_TO_LEFT);
            titleShape.getParagraphStyle().setParagraphAlignment(text.isCenteredTitle ? SlidesApp.ParagraphAlignment.CENTER : SlidesApp.ParagraphAlignment.START);
            titleShape.getTextStyle().setFontSize(text.fontSizeTitle).setBold(text.isBoldTitle);
        }

        if(text.text){
            var bodyShape = slide.getShapes()[1].getText();
            bodyShape.setText(text.text);
            bodyShape.getTextStyle().setFontSize(text.fontSize).setBold(text.isBold);
            bodyShape.getTextStyle().setForegroundColor(text.color);
            bodyShape.getParagraphStyle().setTextDirection(SlidesApp.TextDirection.RIGHT_TO_LEFT);
            bodyShape.getParagraphStyle().setParagraphAlignment(text.isCentered ? SlidesApp.ParagraphAlignment.CENTER : SlidesApp.ParagraphAlignment.START);
        }
  });

  Logger.log("Presentation created: " + presentation.getUrl());
}`;
  };

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateArray()).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 sec
    });
  };

  return (
    <div className="app-container">
      <div className="content-box">
        <h2>🔹 יצירת fullText Array</h2>

        {items.map((item, index) => (
          <div key={index} className="text-field-container">
            <Options
              removeItem={removeItem}
              handleChange={handleChange}
              index={index}
              item={item}
              items={items}
              isTitle={true}
            />
            <textarea
              className="text-area"
              placeholder="כתוב כאן כותרת..."
              value={item.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
            />
            <Options
              removeItem={removeItem}
              handleChange={handleChange}
              index={index}
              item={item}
              items={items}
            />
            <textarea
              className="text-area"
              placeholder="כתוב כאן טקסט..."
              value={item.text}
              onChange={(e) => handleChange(index, "text", e.target.value)}
            />
          </div>
        ))}

        <button className="add-button" onClick={addItem}>
          ➕ הוסף טקסט
        </button>

        <h3>📜 קוד JavaScript שנוצר:</h3>
        <button className="copy-button" onClick={copyToClipboard}>
          📋 {copySuccess ? "הועתק!" : "העתק לקליפבורד"}
        </button>
        <pre className="code-box">{generateArray()}</pre>

        {/* Copy to Clipboard Button */}
        <button className="copy-button" onClick={copyToClipboard}>
          📋 {copySuccess ? "הועתק!" : "העתק לקליפבורד"}
        </button>
      </div>
    </div>
  );
};

export default App;
