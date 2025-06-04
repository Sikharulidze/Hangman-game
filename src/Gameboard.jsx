import React, { useState, useEffect } from "react";
import GradientCircle from "./GradientCircle";

function GameBoard({
  word,
  category = "Countries",
  onQuit,
  goToCategory,
  onContinueGame,
   onPlayAgain,
}) {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const maxWrongGuesses = 8;

  const displayedWordArray = word.split("");

  const guessLetter = (letter) => {
    const upperLetter = letter.toUpperCase();
    if (guessedLetters.includes(upperLetter) || gameEnded || menuOpen) return;

    setGuessedLetters([...guessedLetters, upperLetter]);

    if (!word.toUpperCase().includes(upperLetter)) {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  const isWin = displayedWordArray
    .filter((l) => l !== " ")
    .every((letter) => guessedLetters.includes(letter.toUpperCase()));

  const isLose = wrongGuesses >= maxWrongGuesses;

  useEffect(() => {
    if ((isWin || isLose) && !gameEnded) {
      setGameEnded(true);
    }
  }, [isWin, isLose, gameEnded]);

  const handlePlayAgain = () => {
    onPlayAgain();   
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameEnded(false);
    setMenuOpen(false);
  };

  return (
    <div className="game-board">
      {/* HEADER */}
      <div className="game-header">
        <GradientCircle
          size={94}
          className="menu-circle game-circle gameboard-menu"
          onClick={() => setMenuOpen(true)}
        >
          <img
            src="/images/icon-menu.svg"
            alt="Menu Icon"
            className="menu-icon-inside"
          />
        </GradientCircle>

        <h2 className="guess-title">{category}</h2>

        {/* UPDATED PROGRESS BAR */}
        <div className="progress-bar">
          <div
            className="fill"
            style={{
              width: `${
                ((maxWrongGuesses - wrongGuesses) / maxWrongGuesses) * 140
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
              className="pause-buttons continue-button"
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

      {/* GAME END SCREEN */}
      {gameEnded && (
        <>
          <div className="game-overlay"></div>
          <div className="paused-menu">
            <div className="paused-wrapper">
              <h1 className="paused game-result-heading">
                {isWin ? "You Win" : "You Lose"}
              </h1>
            </div>

            {isWin ? (
              <button
                className="pause-buttons continue-button"
                onClick={() => {
                  onContinueGame();
                  setGuessedLetters([]);
                  setGameEnded(false);
                }}
              >
                CONTINUE GAME
              </button>
            ) : (
              <button
                className="pause-buttons continue-button"
                onClick={handlePlayAgain}
              >
                PLAY AGAIN
              </button>
            )}

            <button
              className="pause-buttons new-category-button"
              onClick={() => {
                setGameEnded(false);
                goToCategory();
              }}
            >
              NEW CATEGORY
            </button>

            <button
              className="pause-buttons quit-button"
              onClick={() => {
                setGameEnded(false);
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

                const isGuessed = guessedLetters.includes(
                  letter.toUpperCase()
                );

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

      {/* KEYBOARD */}
      <div
        className="keyboard-container"
        style={{
          pointerEvents: menuOpen || gameEnded ? "none" : "auto",
          opacity: menuOpen || gameEnded ? 0.6 : 1,
        }}
      >
        <div className="keyboard-inner">
          {["abcdefghi", "jklmnopqr", "stuvwxyz"].map((row, rowIdx) => (
            <div key={rowIdx} className="keyboard-row">
              {row.split("").map((letter) => {
                const upperLetter = letter.toUpperCase();
                const isGuessed = guessedLetters.includes(upperLetter);
                return (
                  <div
                    key={letter}
                    className={`keyboard-letter-box keyboard-letter-box-${letter} ${
                      isGuessed ? "guessed" : ""
                    }`}
                  >
                    <button
                      onClick={() => guessLetter(upperLetter)}
                      disabled={isGuessed || menuOpen || gameEnded}
                      className="keyboard-letter-button"
                    >
                      <span
                        className={`keyboard-letter-text keyboard-letter-text-${letter}`}
                      >
                        {upperLetter}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
