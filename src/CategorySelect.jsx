import GradientCircle from "./GradientCircle";

function CategorySelect({ onBack }) {
  return (
    <div class="page-wrapper">
      <div className="main-categories-div">
        <div className="top-things">
          <GradientCircle
            size={94}
            onClick={onBack}
            className="back-button-circle"
          >
            <img
              src="/images/icon-back.svg"
              alt="Back"
              style={{ width: 41, height: 38 }}
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
