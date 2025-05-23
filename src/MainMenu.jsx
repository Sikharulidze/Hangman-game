import React from "react";

function MainMenu({ onPlay, onShowRules }) {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <button
        onClick={onPlay}
        style={{
          fontSize: "1.5rem",
          padding: "1rem 2rem",
          cursor: "pointer",
        }}
      >
        Play
      </button>

      <div onClick={onShowRules}>
        <h1 className="home-h1">How to play</h1>
      </div>
    </div>
  );
}

export default MainMenu;
