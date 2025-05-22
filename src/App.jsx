import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import CategorySelect from "./CategorySelect";
import GameBoard from "./Gameboard";
import data from "./data.json";
import Rules from "./Rules";
import "./App.css";
import GradientCircle from "./GradientCircle";

function Home() {
  const navigate = useNavigate();

  return (
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
          onClick={() => navigate("/categorySelect")}
        >
          <img src="/images/icon-play.svg" alt="Play" className="play-icon" />
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
          onClick={() => navigate("/rules")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate("/rules");
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
      </div>
    </div>
  );
}

function App() {
  const [category, setCategory] = useState(null);
  const [word, setWord] = useState("");
  const [usedWords, setUsedWords] = useState([]);
  const [categories, setCategories] = useState(data.categories);

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
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route
          path="/categorySelect"
          element={
            <CategorySelect
              categories={categories}
              onSelectCategory={(selectedCategory) => {
                startGame(selectedCategory);
                window.location.href = "/game"; // force navigation
              }}
              onBack={() => window.history.back()}
            />
          }
        />
        <Route
          path="/game"
          element={
            <GameBoard
              word={word}
              onQuit={() => (window.location.href = "/")}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
