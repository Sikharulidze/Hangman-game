import React, { useState } from "react";
import GradientCircle from "./GradientCircle";

function GameBoard({ word, onQuit, goToCategory }) {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const maxWrongGuesses = 8;

  const displayedWordArray = word.split("");

  const guessLetter = (letter) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!word.toLowerCase().includes(letter.toLowerCase())) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const isWin = displayedWordArray
    .filter((l) => l !== " ")
    .every((letter) => guessedLetters.includes(letter.toLowerCase()));
  const isLose = wrongGuesses >= maxWrongGuesses;

  return (
    <div className="game-board">
      {/* HEADER */}
      <div className="game-header">
        <GradientCircle
          size={94}
          className="menu-circle"
          onClick={() => setMenuOpen(true)}
        >
          <img
            src="/images/icon-menu.svg"
            alt="Menu Icon"
            className="menu-icon-inside"
          />
        </GradientCircle>

        <h2 className="guess-title">Countries</h2>

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

      {/* PAUSE POPUP */}
      {menuOpen && (
        <>
          <div className="game-overlay"></div>
          <div className="paused-menu">
            <div className="paused-wrapper">
              <h1 className="paused">Paused</h1>
            </div>

            <button
              className="pause-buttons  continue-button"
              onClick={() => setMenuOpen(false)}
            >
              CONTINUE
            </button>

            <button
              className="pause-buttons new-category-button"
              onClick={() => {
                setMenuOpen(false);
                goToCategory();
              }}
            >
              NEW CATEGORY
            </button>

            <button
              className="pause-buttons quit-button"
              onClick={() => {
                setMenuOpen(false);
                onQuit();
              }}
            >
              QUIT GAME
            </button>
          </div>
        </>
      )}

      {/* WORD DISPLAY */}
      <div className="word-display">
        {(() => {
          const middleIndex = Math.floor(displayedWordArray.length / 2);
          const firstRow = displayedWordArray.slice(0, middleIndex);
          const secondRow = displayedWordArray.slice(middleIndex);

          const renderRow = (row, rowIdx) => (
            <div key={rowIdx} className="letter-row">
              {row.map((letter, idx) => {
                if (letter === " ") {
                  return <div key={idx} className="letter-box space-box" />;
                }

                const isGuessed = guessedLetters.includes(letter.toLowerCase());

                return (
                  <div
                    key={idx}
                    className={`letter-box ${isGuessed ? "filled" : ""}`}
                  >
                    <span className="letter-text">
                      {isGuessed ? letter.toUpperCase() : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          );

          return (
            <>
              {renderRow(firstRow, 0)}
              {renderRow(secondRow, 1)}
            </>
          );
        })()}
      </div>

      {/* GAME STATUS */}
      {isWin && <p className="game-result">🎉 You won!</p>}
      {isLose && (
        <p className="game-result">😞 You lost! The word was: {word}</p>
      )}

      {/* KEYBOARD */}
      {!isWin && !isLose && (
        <div className="keyboard-container">
          <div className="keyboard-inner">
            {["abcdefghi", "jklmnopqr", "stuvwxyz"].map((row, rowIdx) => (
              <div key={rowIdx} className="keyboard-row">
                {row.split("").map((letter) => {
                  const isGuessed = guessedLetters.includes(letter);
                  return (
                    <div
                      key={letter}
                      className={`keyboard-letter-box keyboard-letter-box-${letter} ${
                        guessedLetters.includes(letter) ? "guessed" : ""
                      }`}
                    >
                      <button
                        onClick={() => guessLetter(letter)}
                        disabled={isGuessed}
                        className="keyboard-letter-button"
                      >
                        <span
                          className={`keyboard-letter-text keyboard-letter-text-${letter}`}
                        >
                          {letter.toUpperCase()}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GameBoard;
