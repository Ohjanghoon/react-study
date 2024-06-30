import { useState } from 'react';
import Button from './Button';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from './utils';
import './App.css';

import resetIcon from './assets/ic-reset.svg';


const INITIAL_VALUE = 'rock';

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    const comparison = compareHand(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) setOtherScore(otherScore + bet);
  };

  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
  };

  const handleBetChange = (e) => {
    let bet = e.target.value;
    if (Number.isInteger(parseInt(bet))){
      bet %= 10;
      setBet(bet);
    }
  };

  return (
    <div className='App'>
      <h1 className="App-heading">가위바위보</h1>
      <img className="App-reset" src={resetIcon} alt="초기화" onClick={handleClearClick} />
      <div className="App-scores">
        <div className='Score'>
          <div className="Score-num">{score}</div>
          <div className="Score-name">나</div>
        </div>
        <div class="App-versus">:</div>
          <div className="Score">
            <div className="Score-num">{otherScore}</div>
            <div className="Score-name">상대</div>
          </div>
      </div>
      <div className='Box App-box'>
        <div className="Box-inner">
          <div className="App-hands">
            <div className="Hand">
              <HandIcon className='Hand-icon' value={hand} />
            </div>
            <div className="App-versus">VS</div>
            <div className="Hand">
              <HandIcon className='Hand-icon' value={otherHand} />
            </div>
          </div>
          <div className="App-bet">
            <span>배점</span><input type="number" value={bet} min={1} max={9} onChange={handleBetChange} /><span>배</span>
          </div>
          <div className="App-history">
              <h2>승부기록</h2>
              <p>{gameHistory.join(', ')}</p>
            </div>
        </div>
      </div>
      <HandButton value="rock" onClick={handleButtonClick} />
      <HandButton value="scissor" onClick={handleButtonClick} />
      <HandButton value="paper" onClick={handleButtonClick} />
    </div>
  );
}

export default App;