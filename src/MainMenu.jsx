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
      <div
        onClick={onShowRules}
        style={{
          marginTop: "1rem",
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline",
          fontSize: "1.2rem",
          userSelect: "none",
        }}
      >
        How to play
      </div>
    </div>
  );
}

export default MainMenu;
