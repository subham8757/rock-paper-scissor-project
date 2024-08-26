import { useEffect, useState } from "react";

const Game = () => {
  const [value, setValue] = useState("");
  const [comvalue, setComvalue] = useState("");
  const [win, setWin] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const data = ["rock", "paper", "scissors"];

  const determineWinner = (userChoice, computerChoice) => {
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
  };

  const handleRes = () => {
    if (value) {
      const randIndex = Math.floor(Math.random() * data.length);
      const computerChoice = data[randIndex];
      setComvalue(computerChoice);
      const result = determineWinner(value, computerChoice);
      setWin(result);
    }
  };

  useEffect(() => {
    if (value) handleRes();
  }, [value]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mt-12">ROCK PAPER SCISSORS</h2>

      <div className="font-bold text-lg text-center mt-8">Score Board</div>
      <div className="flex flex-col sm:flex-row mt-4 justify-center gap-4 sm:gap-10">
        <div>Your Score: {userScore}</div>
        <div>Computer's Score: {computerScore}</div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 mt-10">
        <div className="flex flex-col items-center">
          <div className="font-bold text-lg">Your Choice</div>

          <div className="h-24 w-24 sm:h-32 sm:w-32 border mt-8 flex items-center justify-center">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">{value}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {data.map(choice => (
              <div
                key={choice}
                className="border w-24 h-24 sm:w-32 sm:h-32 cursor-pointer hover:bg-gray-200 flex items-center justify-center"
                onClick={() => setValue(choice)}
              >
                <img
                  src={`./Untitled-${choice === "rock" ? "1" : choice === "paper" ? "2" : "3"}.png`}
                  alt={choice}
                  className="w-2/3 h-2/3 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl sm:text-2xl lg:text-3xl">{win}</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="font-bold text-lg">Computer's Choice</div>

          <div className="h-24 w-24 sm:h-32 sm:w-32 border mt-8 flex items-center justify-center">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">{comvalue}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {data.map(choice => (
              <div key={choice} className="border w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                <img
                  src={`./Untitled-${choice === "rock" ? "1" : choice === "paper" ? "2" : "3"}.png`}
                  alt={choice}
                  className="w-2/3 h-2/3 object-contain"
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
