import React, { useEffect, useState, useCallback, useMemo } from "react";

const Game = () => {
  const [value, setValue] = useState("");
  const [comvalue, setComvalue] = useState("");
  const [win, setWin] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  // Memoize the data array to ensure it is stable
  const data = useMemo(() => ["rock", "paper", "scissors"], []);

  const determineWinner = useCallback((userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
      return "It's a tie!";
    }
    if (
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      setUserScore(prevScore => prevScore + 1);
      return "You won!";
    }
    setComputerScore(prevScore => prevScore + 1);
    return "Computer won!";
  }, []);

  // Use useCallback for handleRes to stabilize the function
  const handleRes = useCallback(() => {
    if (value) {
      const randIndex = Math.floor(Math.random() * data.length);
      const computerChoice = data[randIndex];
      setComvalue(computerChoice);
      const result = determineWinner(value, computerChoice);
      setWin(result);
    }
  }, [value, data, determineWinner]); // Ensure dependencies are correct

  useEffect(() => {
    handleRes();
  }, [handleRes]); // Correct dependency

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mt-12">ROCK PAPER SCISSORS</h2>

      <div className="font-bold text-lg text-center mt-8">Score Board</div>
      <div className="flex flex-col sm:flex-row mt-4 justify-center gap-4 sm:gap-10">
        <div className="text-lg sm:text-xl lg:text-2xl">Your Score: {userScore}</div>
        <div className="text-lg sm:text-xl lg:text-2xl">Computer's Score: {computerScore}</div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 mt-10">
        <div className="flex flex-col items-center">
          <div className="font-bold text-lg sm:text-xl lg:text-2xl">Your Choice</div>

          <div className="h-40 w-40 sm:h-48 sm:w-48 lg:h-56 lg:w-56 border mt-8 flex items-center justify-center">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">{value}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {data.map(choice => (
              <div
                key={choice}
                className="border w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 cursor-pointer hover:bg-gray-200 flex items-center justify-center"
                onClick={() => setValue(choice)}
              >
                <img
                  src={`./Untitled-${choice === "rock" ? "1" : choice === "paper" ? "2" : "3"}.png`}
                  alt={choice}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl sm:text-2xl lg:text-3xl">{win}</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="font-bold text-lg sm:text-xl lg:text-2xl">Computer's Choice</div>

          <div className="h-40 w-40 sm:h-48 sm:w-48 lg:h-56 lg:w-56 border mt-8 flex items-center justify-center">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">{comvalue}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {data.map(choice => (
              <div key={choice} className="border w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 flex items-center justify-center">
                <img
                  src={`./Untitled-${choice === "rock" ? "1" : choice === "paper" ? "2" : "3"}.png`}
                  alt={choice}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
