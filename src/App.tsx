import { useRecoilState } from "recoil";
import { goalState, roundState, timerState } from "./atom";
import { useEffect } from "react";

function App() {
  const [timer, setTimer] = useRecoilState(timerState);
  const [round, setRound] = useRecoilState(roundState);
  const [goal, setGoal] = useRecoilState(goalState);

  const MM = timer.minutes.toString().padStart(2, "0");
  const SS = timer.seconds.toString().padStart(2, "0");

  useEffect(() => {
    let timerInterval: any;

    if (timer.isRunning) {
      timerInterval = setInterval(() => {
        if (timer.seconds === 0) {
          if (timer.minutes !== 0) {
            setTimer({ ...timer, minutes: timer.minutes - 1, seconds: 59 });
          } else {
            clearInterval(timerInterval);
            setTimer({ minutes: 25, seconds: 0, isRunning: false });
            if (round === 3) {
              setRound(0);
              setGoal(goal + 1);
            } else {
              setRound(round + 1);
            }
          }
        } else {
          setTimer({ ...timer, seconds: timer.seconds - 1 });
        }
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [timer]);

  const startTimer = () => {
    setTimer({ ...timer, isRunning: true });
  };
  const pauseTimer = () => {
    setTimer({ ...timer, isRunning: false });
  };

  return (
    <div>
      <h1>Pomodoro</h1>
      <div>
        {MM} : {SS}
      </div>
      <button onClick={timer.isRunning ? pauseTimer : startTimer}>
        {timer.isRunning ? "정지" : "시작"}
      </button>
      <div>ROUND: {round}/4</div>
      <div>GOAL: {goal}/4</div>
      <div>{goal === 4 ? "FINISH!" : null}</div>
    </div>
  );
}

export default App;
