import React, { useState } from "react";
import CategorySelect from "./CategorySelect";
import GameBoard from "./Gameboard";
import data from "./data.json";
import Rules from "./Rules";

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
        <div>
          <button onClick={() => setScreen("categorySelect")}>Play</button>
          <p
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
            onClick={() => setScreen("rules")}
          >
            How to Play
          </p>
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
