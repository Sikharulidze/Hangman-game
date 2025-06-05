import React, { useState, useEffect } from "react";
import CategorySelect from "./CategorySelect";
import GameBoard from "./Gameboard";
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
          <h1 className="home-h1">HOW TO PLAY</h1>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [categories, setCategories] = useState([]);
  const [screen, setScreen] = useState("home");
  const [category, setCategory] = useState(null);
  const [usedWords, setUsedWords] = useState([]);
  const [currentWordd, setCurrentWordd] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        const formatted = Object.entries(json.categories).map(
          ([categoryName, items]) => ({
            name: categoryName,
            words: items.map((item) => item.name),
          })
        );
        setCategories(formatted);
      })
      .catch((err) => {
        console.error("Failed to load data.json", err);
      });
  }, []);

  const getNewWordFromCategory = (selectedCategory = category) => {
    if (!selectedCategory) return "";

    const availableWords = selectedCategory.words.filter(
      (word) => !usedWords.includes(word)
    );

    if (availableWords.length === 0) {
      alert("No more words left in this category!");
      return "";
    }

    const newWord =
      availableWords[Math.floor(Math.random() * availableWords.length)];

    setUsedWords((prev) => [...prev, newWord]);
    return newWord;
  };

  const getNewWord = () => {
    const newWord = getNewWordFromCategory();
    if (newWord) {
      setCurrentWordd(newWord);
    }
  };

  const handleCategorySelect = (categoryName) => {
    const selected = categories.find((cat) => cat.name === categoryName);
    if (!selected) return;

    const newWord = getNewWordFromCategory(selected);
    if (newWord) {
      setCategory(selected);
      setCurrentWordd(newWord);
      setScreen("game");
    }
  };

  const handleContinueGame = () => {
    getNewWord();
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
      {screen === "game" && category && currentWordd && (
        <GameBoard
          word={currentWordd}
          category={category.name}
          onQuit={() => setScreen("home")}
          goToCategory={() => setScreen("categorySelect")}
          onContinueGame={handleContinueGame}
          onPlayAgain={getNewWord}
        />
      )}
    </>
  );
}

export default App;
