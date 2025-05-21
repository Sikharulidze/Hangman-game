import React from "react";

function Rules({ onBack }) {
  return (
    <div>
      <h1>How to Play</h1>
      <ol>
        <li>
          <strong>Choose a category</strong>
          <br />
          First, choose a word category, like animals or movies. The computer
          then randomly selects a secret word from that topic and shows you
          blanks for each letter of the word.
        </li>
        <li>
          <strong>Guess letters</strong>
          <br />
          Take turns guessing letters. The computer fills in the relevant blank
          spaces if your guess is correct. If it's wrong, you lose some health,
          which empties after eight incorrect guesses.
        </li>
        <li>
          <strong>Win or lose</strong>
          <br />
          You win by guessing all the letters in the word before your health
          runs out. If the health bar empties before you guess the word, you
          lose.
        </li>
      </ol>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default Rules;
