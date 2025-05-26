import React, { useState } from "react";
import GradientCircle from "./GradientCircle";

function GameBoard({ word, onQuit, category }) {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrongGuesses = 8;

  const displayedWord = word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  const guessLetter = (letter) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const isWin = word
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isLose = wrongGuesses >= maxWrongGuesses;

  return (
    <div className="game-board">
      {/* HEADER */}
      <div className="game-header">
        <div className="left">
          <GradientCircle
            size={94}
            className="menu-circle"
            onClick={() => console.log("Menu clicked")}
          >
            <img
              src="/images/icon-menu.svg"
              alt="Menu Icon"
              className="menu-icon-inside"
            />
          </GradientCircle>
          <span className="category-text">{category}</span>
        </div>
        <div className="right">
          <div className="progress-bar">
            <div
              className="fill"
              style={{
                width: `${
                  ((maxWrongGuesses - wrongGuesses) / maxWrongGuesses) * 240
                }px`,
              }}
            />
          </div>
          <img
            src="/images/icon-heart.svg"
            alt="Heart Icon"
            className="heart-icon"
          />
        </div>
      </div>

      {/* WORD DISPLAY */}
      <h2 className="guess-title">Countries</h2>
      <p className="word-display">{displayedWord}</p>
      <p className="guess-count">
        Wrong guesses: {wrongGuesses} / {maxWrongGuesses}
      </p>

      {/* GAME STATUS */}
      {isWin && <p className="game-result">🎉 You won!</p>}
      {isLose && (
        <p className="game-result">😞 You lost! The word was: {word}</p>
      )}

      {/* KEYBOARD */}
      {!isWin && !isLose && (
        <div className="keyboard">
          {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
            <button
              key={letter}
              onClick={() => guessLetter(letter)}
              disabled={guessedLetters.includes(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      {/* QUIT BUTTON */}
      <button onClick={onQuit} className="quit-button">
        Quit
      </button>
    </div>
  );
}

export default GameBoard;
