import React, { useState } from "react";
import CategorySelect from "./CategorySelect";
import GameBoard from "./Gameboard";
import data from "./data.json";
import Rules from "./Rules";
import "./App.css";
import GradientCircle from "./GradientCircle";

function Home({ setScreen }) {
  return (
    <div
      style={{
        backgroundImage: "url(/images/background-desktop.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
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
          <img src="/images/icon-play.svg" alt="Play" className="play-icon" />
        </GradientCircle>

        <div
          className="rules-button"
          role="button"
          tabIndex={0}
          onClick={() => setScreen("rules")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setScreen("rules");
            }
          }}
        >
          <h1 className="home-h1">How To Play</h1>
        </div>
      </div>
    </div>
  );
}

function App() {
  // Format categories from data.json object to array
  const formattedCategories = Object.entries(data.categories).map(
    ([categoryName, items]) => ({
      name: categoryName,
      words: items.map((item) => item.name),
    })
  );

  const [categories, setCategories] = useState(formattedCategories);
  const [screen, setScreen] = useState("home");
  const [category, setCategory] = useState(null);
  const [word, setWord] = useState("");
  const [usedWords, setUsedWords] = useState([]);

  const handleCategorySelect = (categoryName) => {
    const selected = categories.find((cat) => cat.name === categoryName);
    if (!selected) return;

    const availableWords = selected.words.filter((w) => !usedWords.includes(w));

    if (availableWords.length === 0) {
      alert("No more words left in this category!");
      return;
    }

    const randomWord =
      availableWords[Math.floor(Math.random() * availableWords.length)];

    setWord(randomWord);
    setUsedWords((prev) => [...prev, randomWord]);
    setCategory(selected);
    setScreen("game");
  };

  return (
    <>
      {screen === "home" && <Home setScreen={setScreen} />}
      {screen === "rules" && <Rules setScreen={setScreen} />}
      {screen === "categorySelect" && (
        <CategorySelect
          categories={categories}
          onSelectCategory={handleCategorySelect}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "game" && category && word && (
        <GameBoard
          word={word}
          category={category.name}
          onQuit={() => setScreen("home")}
          goToCategory={() => setScreen("categorySelect")}
        />
      )}
    </>
  );
}

export default App;
