import React, { useState } from 'react';
import closedFistImage from './assets/closed-fist.png';
import openHandImage from './assets/open-hand.png';
import styles from './styles/Hand.module.css';
import diceStyles from './styles/DiceResult.module.css';

function App() {
  const [selectedDie, setSelectedDie] = useState<number>(20);
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const diceTypes = [4, 6, 8, 10, 12, 20];

  const rollDice = () => {
    setIsRolling(true);
    setRollResult(null);

    // Start dropping animation halfway through the roll
    setTimeout(() => {
      const result = Math.floor(Math.random() * selectedDie) + 1;
      setRollResult(result);
    }, 1000);

    // End rolling state after animation completes
    setTimeout(() => {
      setIsRolling(false);
    }, 2000);
  };

  const isDiceTriangle = (diceType: number) => {
    return [4, 8].includes(diceType);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Hand-drawn style title */}
      <div className="text-center pt-12 mb-16">
        <h1 className="text-6xl font-black text-black transform mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          ROLL ANYTHING
        </h1>
      </div>

      {/* Controls container */}
      <div className="max-w-md mx-auto px-8" style={{ position: 'relative', zIndex: 2 }}>
        {/* Dice selector - hand-drawn style */}
        <div className="mb-8">
          <div className="relative">
            <div className="border-4 border-black bg-white p-6 transform " style={{ borderRadius: '20px' }}>
              <div className="text-2xl font-bold text-black mb-4 text-center transform">
                [D{selectedDie}]
              </div>
              <div className="text-lg font-bold text-black mb-2 transform ">
                (ROLL)
              </div>

              <select
                value={selectedDie}
                onChange={(e) => setSelectedDie(Number(e.target.value))}
                className="w-full p-3 border-3 border-black bg-white text-lg font-bold transform"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                {diceTypes.map((die) => (
                  <option key={die} value={die}>
                    D{die}
                  </option>
                ))}
              </select>

              <button
                onClick={rollDice}
                disabled={isRolling}
                className={`w-full mt-4 p-4 border-3 border-black font-black text-xl transform  transition-all ${
                  isRolling
                    ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                    : 'bg-yellow-300 hover:bg-yellow-400 text-black hover:scale-105'
                }`}
                style={{ fontFamily: 'Comic Sans MS, cursive', borderRadius: '15px' }}
              >
                {isRolling ? 'ROLLING...' : `ROLL D${selectedDie}!`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hand animation container */}
      <div className={styles.handContainer}>
        {/* Dice Result - positioned behind hand */}
        {isRolling && rollResult !== null && (
          <div 
            className={`${diceStyles.diceResult} ${
              isDiceTriangle(selectedDie) ? diceStyles.triangle : diceStyles.square
            }`}
          >
            {rollResult}
          </div>
        )}
        
        {/* Hand image - appears on top */}
        <img
          src={isRolling ? openHandImage : closedFistImage}
          alt="Hand Animation"
          style={{
            width: '69vw',  
            maxWidth: '800px', 
            minWidth: '300px',
            position: 'relative',  /* Create new stacking context */
            zIndex: 1            /* Ensure hand stays above dice */
          }}
        />
      </div>
    </div>
  );
}

export default App;