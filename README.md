# G-Slides-Maker React App

## Overview

G-Slides-Maker is a React-based web application that allows users to generate a structured JavaScript array containing slide content. The generated array can be used to create Google Slides presentations using Google Apps Script. The tool provides an intuitive interface for users to input titles and text, customize formatting, and export the slide data.

## Features

- **Dynamic Slide Content Creation**: Users can add multiple slides with customizable text and titles.
- **Custom Formatting**:
  - Bold text options for both title and body.
  - Adjustable font sizes.
  - Custom text colors.
  - Alignment options (centered or left-aligned).
- **JavaScript Code Generation**: Converts user inputs into a JavaScript function that generates Google Slides.
- **Clipboard Support**: Copy the generated JavaScript code with a single click for easy pasting into Google Apps Script.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/alonzo245/g-slides-maker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd g-slides-maker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open the app in your browser after running `npm start`.
2. Enter a title and text for each slide.
3. Customize text appearance using the available options.
4. Click **"➕ הוסף טקסט"** to add more slides.
5. The JavaScript function for Google Slides will be generated automatically.
6. Click **"📋 העתק לקליפבורד"** to copy the script.
7. Paste the script into a Google Apps Script project and run it to create a Google Slides presentation.

## Code Generation

The app generates JavaScript code similar to this:

```javascript
function createSlidesAndExportPDF() {
  var presentation = SlidesApp.create(new Date(Date.now()).toUTCString());
  var slides = presentation.getSlides();
  var fullText = [ ... ]; // User-generated slide data

  if (slides.length > 0) slides[0].remove();

  fullText.forEach(text => {
    var slide = presentation.appendSlide(SlidesApp.PredefinedLayout.TITLE_AND_BODY);
    if (text.title) {
      var titleShape = slide.getShapes()[0].getText();
      titleShape.setText(text.title);
    }
    if (text.text) {
      var bodyShape = slide.getShapes()[1].getText();
      bodyShape.setText(text.text);
    }
  });
  Logger.log("Presentation created: " + presentation.getUrl());
}
```

## Contributing

Contributions are welcome! If you want to enhance the functionality, submit a pull request with your improvements.

## License

This project is licensed under the MIT License.

---

Developed with ❤️ by [Alon Alush](https://github.com/alonzo245).
