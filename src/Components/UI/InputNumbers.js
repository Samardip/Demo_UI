import React from "react";

export const InputNumbers = ({ inputNumber,stylesheet}) => {
  return (
    <div>
      <input style={stylesheet}
        className={inputNumber.style}
        type={inputNumber.type}
        placeholder={inputNumber.placeholder}
        name={inputNumber.name}
        required={inputNumber.require}
      />
    </div>
  );
};
