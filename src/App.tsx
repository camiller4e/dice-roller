import React, { useState } from 'react'

function App() {
  const [selectedDie, setSelectedDie] = useState<number>(20)
  const [rollResult, setRollResult] = useState<number | null>(null)

  const diceTypes = [4, 6, 8, 10, 12, 20]

  const rollDice = () => {
    const result = Math.floor(Math.random() * selectedDie) + 1
    setRollResult(result)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center mb-4">
            D&D Dice Roller
          </div>
          
          <div className="mb-6">
            <label htmlFor="dice-select" className="block text-sm font-medium text-gray-700 mb-2">
              Choose your die:
            </label>
            <select
              id="dice-select"
              value={selectedDie}
              onChange={(e) => setSelectedDie(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {diceTypes.map((die) => (
                <option key={die} value={die}>
                  D{die}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={rollDice}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 mb-6"
          >
            Roll D{selectedDie}
          </button>

          {rollResult !== null && (
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Result:</div>
              <div className="text-4xl font-bold text-indigo-600 bg-gray-50 rounded-lg py-4">
                {rollResult}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App