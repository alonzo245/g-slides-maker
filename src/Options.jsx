import React from "react";

const Options = ({ removeItem, handleChange, index, item, items, isTitle }) => {
  return (
    <div className="options">
      <label>
        <input
          type="checkbox"
          checked={isTitle ? item.isBoldTitle : item.isBold}
          onChange={(e) =>
            handleChange(
              index,
              isTitle ? "isBoldTitle" : "isBold",
              e.target.checked
            )
          }
        />
        Bold
      </label>

      <label>
        <input
          type="color"
          value={isTitle ? item.colorTitle : item.color}
          onChange={(e) =>
            handleChange(
              index,
              isTitle ? "colorTitle" : "color",
              e.target.value
            )
          }
        />
        Color
      </label>

      <label>
        <input
          type="checkbox"
          checked={isTitle ? item.isCenteredTitle : item.isCentered}
          onChange={(e) =>
            handleChange(
              index,
              isTitle ? "isCenteredTitle" : "isCentered",
              e.target.checked
            )
          }
        />
        Center Text
      </label>

      <label>
        Font Size:
        <input
          type="number"
          value={isTitle ? item.fontSizeTitle : item.fontSize}
          min="10"
          max="50"
          onChange={(e) =>
            handleChange(
              index,
              isTitle ? "fontSizeTitle" : "fontSize",
              parseInt(e.target.value)
            )
          }
        />
      </label>

      {items.length > 1 && (
        <button className="remove-button" onClick={() => removeItem(index)}>
          ❌
        </button>
      )}
    </div>
  );
};

export default Options;
