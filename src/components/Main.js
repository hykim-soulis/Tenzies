import React from 'react';
import Die from './Die';
import Confetti from 'react-confetti';

export default function Main() {
  const [dice, setDice] = React.useState(allNewDice());
  const [answer, setAnswer] = React.useState('');
  const [status, setStatus] = React.useState('Roll');

  function generateNewDie() {
    return { value: Math.floor(Math.random() * 6) + 1, isHeld: false };
  }
  function allNewDice() {
    return Array(10)
      .fill()
      .map(() => generateNewDie());
  }

  const diceElements = dice.map((el, index) => {
    return (
      <Die
        key={index}
        id={index}
        value={el.value}
        isHeld={el.isHeld}
        onClick={handleDieClick}
      />
    );
  });

  function hold(id) {
    setDice((prev) => {
      const newDice = [...prev];
      newDice[id] = { ...prev[id], isHeld: true };
      if (newDice.every((el) => el.isHeld)) {
        setStatus('Reset Game');
      }
      return newDice;
    });
  }

  function handleDieClick(id) {
    if (answer === '') {
      setAnswer(dice[id].value);
      hold(id);
    } else if (answer === dice[id].value) {
      hold(id);
    }
  }

  function rollDice() {
    if (status === 'Roll') {
      setDice((prev) => {
        return prev.map((el) => (el.isHeld ? el : generateNewDie()));
      });
    } else if (status === 'Reset Game') {
      setAnswer('');
      setDice(allNewDice());
      setStatus('Roll');
    }
  }
  return (
    <main className="Main">
      {status === 'Reset Game' && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="para">
        Roll Until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice">{diceElements}</div>
      <button className="roll" onClick={rollDice}>
        {status}
      </button>
    </main>
  );
}
