import React from "react";
import GradientCircle from "./GradientCircle";

function Rules({ setScreen }) {
  return (
    <div className="main-rules-div">
      <div className="top-rules">
        <GradientCircle
          size={94}
          onClick={() => setScreen("home")}
          className="back-button-circle"
        >
          <img
            src="/images/icon-back.svg"
            alt="Back"
            style={{ width: 41, height: 38 }}
          />
        </GradientCircle>

        <h1 className="rules-h1">How to Play</h1>
      </div>

      <div className="rules-container">
        <div className="rule-box">
          <h1 className="rule-number1">01</h1>
          <strong className="rule-title">CHOOSE A CATEGORY</strong>
          <p className="rule-p">
            First, choose a word category, like animals or movies. The computer
            then randomly selects a secret word from that topic and shows you
            blanks for each letter of the word.
          </p>
        </div>

        <div className="rule-box">
          <h1 className="rule-number">02</h1>
          <strong className="rule-title">GUESS LETTERS</strong>
          <p className="rule-p">
            Take turns guessing letters. The computer fills in the relevant
            blank spaces if your guess is correct. If it's wrong, you lose some
            health, which empties after eight incorrect guesses.
          </p>
        </div>

        <div className="rule-box">
          <h1 className="rule-number">03</h1>
          <h2 className="rule-title">WIN OR LOSE</h2>
          <p className="rule-p">
            You win by guessing all the letters in the word before your health
            runs out. If the health bar empties before you guess the word, you
            lose.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Rules;
