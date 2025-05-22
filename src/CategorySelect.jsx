import GradientCircle from "./GradientCircle";

function CategorySelect({ onBack }) {
  return (
    <div className="main-categories-div">
      <h1 className="rules-h1">Pick a Category</h1>

      <GradientCircle size={55} onClick={onBack} className="back-button-circle">
        <img
          src="/images/icon-back.svg"
          alt="Back"
          style={{ width: 24, height: 24 }}
        />
      </GradientCircle>

      <div className="categories-grid">
        <div
          className="category-container"
          onClick={() => onSelectCategory("Movies")}
        >
          <div className="category-item">MOVIES</div>
        </div>
        <div
          className="category-container"
          onClick={() => onSelectCategory("TV Shows")}
        >
          <div className="category-item">TV SHOWS</div>
        </div>
        <div
          className="category-container"
          onClick={() => onSelectCategory("Countries")}
        >
          <div className="category-item">COUNTRIES</div>
        </div>
        <div
          className="category-container"
          onClick={() => onSelectCategory("Capital Cities")}
        >
          <div className="category-item">CAPITAL CITIES</div>
        </div>
        <div
          className="category-container"
          onClick={() => onSelectCategory("Animals")}
        >
          <div className="category-item">ANIMALS</div>
        </div>
        <div
          className="category-container"
          onClick={() => onSelectCategory("Sports")}
        >
          <div className="category-item">SPORTS</div>
        </div>
      </div>
    </div>
  );
}

export default CategorySelect;
