import GradientCircle from "./GradientCircle";
import React, { useState, useEffect } from "react";

function CategorySelect({ onBack, onSelectCategory }) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let circleSize = 94;
  if (viewportWidth <= 767) {
    circleSize = 50;
  } else if (viewportWidth >= 768 && viewportWidth <= 1024) {
    circleSize = 64;
  }
  console.log("circleSize is:", circleSize);
  return (
    <div className="page-wrapper">
      <div className="main-categories-div">
        <div className="top-things">
          <GradientCircle
            size={circleSize}
            onClick={onBack}
            className="back-button-circle"
            
          >
            
            <img
              src="/images/icon-back.svg"
              alt="Back"
              className="back-icon2"
            />
          </GradientCircle>

          <h1 className="categories-h1">Pick a Category</h1>
        </div>

        <div className="categories-box">
          <div className="items-container">
            <div
              className="category-container"
              onClick={() => onSelectCategory("Movies")}
            >
              <div className="category-item-wrapper">
                <h1 className="category-item">MOVIES</h1>
              </div>
            </div>
            <div
              className="category-container"
              onClick={() => onSelectCategory("TV Shows")}
            >
              <div className="category-item-wrapper">
                <h1 className="category-item">TV SHOWS</h1>
              </div>
            </div>
            <div
              className="category-container"
              onClick={() => onSelectCategory("Countries")}
            >
              <div className="category-item-wrapper">
                <h1 className="category-item">COUNTRIES</h1>
              </div>
            </div>
          </div>
          <div className="items-container">
            <div
              className="category-container"
              onClick={() => onSelectCategory("Capital Cities")}
            >
              <div className="category-item-wrapper">
                <h1 className="category-item">CAPITAL CITIES</h1>
              </div>
            </div>
            <div
              className="category-container"
              onClick={() => onSelectCategory("Animals")}
            >
              <div className="category-item-wrapper">
                <h1 className="category-item">ANIMALS</h1>
              </div>
            </div>
            <div
              className="category-container"
              onClick={() => onSelectCategory("Sports")}
            >
              <div className="category-item-wrapper">
                <h1 className="category-item">SPORTS</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategorySelect;
