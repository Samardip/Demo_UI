import React from "react";
export const Buttons = ({ button,icon }) => {
  const SearchIcon=icon;
  return (
    <div>
      <button className={button.buttonStyle}>
        <div className={button.divStyle}>
          <div>{icon!==null?<SearchIcon />:""}</div>
          <div className="">{button.name}</div>
        </div>
      </button>
    </div>
  );
};
