import React, { useState } from "react";
import CategorySelect from "./CategorySelect";
import GameBoard from "./Gameboard";
import data from "./data.json";
import Rules from "./Rules";
import "./App.css";
import GradientCircle from "./GradientCircle";

function App() {
  const [screen, setScreen] = useState("main");
  const [category, setCategory] = useState(null);
  const [word, setWord] = useState("");
  const [usedWords, setUsedWords] = useState([]);
  const [categories, setCategories] = useState(data.categories); // ✅ good now

  const startGame = (selectedCategory) => {
    setCategory(selectedCategory);

    const availableWords = selectedCategory.words.filter(
      (w) => !usedWords.includes(w)
    );
    if (availableWords.length === 0) {
      alert("No more words left in this category!");
      return;
    }

    const randomWord =
      availableWords[Math.floor(Math.random() * availableWords.length)];
    setWord(randomWord);
    setUsedWords([...usedWords, randomWord]);
    setScreen("game");
  };

  return (
    <div>
      {screen === "main" && (
        <div
          style={{
            backgroundImage: "url(/images/background-desktop.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <div className="centered-div">
            <img src="/images/logo.svg" alt="Logo" className="logo-image" />

            <GradientCircle
              className="play-button"
              onClick={() => setScreen("categorySelect")}
            >
              <img
                src="/images/icon-play.svg"
                alt="Play"
                className="play-icon"
              />
            </GradientCircle>

            <svg
              width="260"
              height="62"
              viewBox="0 0 260 62"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: "drop-shadow(2px 2px 3px black)",
                cursor: "pointer",
              }}
              onClick={() => setScreen("rules")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setScreen("rules");
                }
              }}
            >
              <rect width="260" height="62" rx="31" fill="#2463FF" />
              <text
                x="130"
                y="38"
                fill="white"
                fontSize="24"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
                style={{ userSelect: "none", pointerEvents: "none" }}
              >
                How To Play
              </text>
            </svg>

            <p
              style={{
                cursor: "pointer",
                color: "lightblue",
                textDecoration: "underline",
                marginTop: "1rem",
              }}
              onClick={() => setScreen("rules")}
            >
              How to Play
            </p>
          </div>
        </div>
      )}

      {screen === "rules" && <Rules onBack={() => setScreen("main")} />}

      {screen === "categorySelect" && (
        <CategorySelect
          categories={categories}
          onSelectCategory={startGame}
          onBack={() => setScreen("main")}
        />
      )}

      {screen === "game" && (
        <GameBoard word={word} onQuit={() => setScreen("main")} />
      )}
    </div>
  );
}

export default App;
