import React, { useState } from "react";

function GameBoard({ word, onQuit }) {
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
    <div>
      <h2>Guess the Word!</h2>
      <p>{displayedWord}</p>
      <p>
        Wrong guesses: {wrongGuesses} / {maxWrongGuesses}
      </p>
      {isWin && <p>🎉 You won!</p>}
      {isLose && <p>😞 You lost! The word was: {word}</p>}

      {!isWin && !isLose && (
        <div>
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

      <button onClick={onQuit}>Quit</button>
    </div>
  );
}

export default GameBoard;
