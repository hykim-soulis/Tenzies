import React from 'react';
import Die from './Die';
export default function Main() {
  const [dice, setDice] = React.useState(allNewDice());
  const [status, setStatus] = React.useState('Roll');
  const [answer, setAnswer] = React.useState('');
  function allNewDice() {
    return Array(10)
      .fill()
      .map(() => {
        return { value: Math.floor(Math.random() * 6) + 1, isHeld: false };
      });
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
      if (newDice.map((el) => el.isHeld).every((el) => el === true)) {
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
        const newDice = allNewDice();
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].isHeld) {
            newDice[i] = { ...prev[i] };
          }
        }
        return newDice;
      });
    } else if (status === 'Reset Game') {
      setAnswer('');
      setDice(allNewDice());
      setStatus('Roll');
    }
  }
  return (
    <div className="Main">
      <h1 className="title">Tenzies</h1>
      <p className="para">
        Roll Until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice">{diceElements}</div>
      <button className="roll" onClick={rollDice}>
        {status}
      </button>
    </div>
  );
}
