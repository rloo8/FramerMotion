import { useRecoilState } from "recoil";
import { goalState, roundState, timerState } from "./atom";
import { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Wrapper = styled.div`
  height: 100vh;
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;
const Title = styled.h1`
  font-size: 50px;
  color: white;
  font-weight: 600;
`;
const TimerContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 80px;
  color: white;
`;
const Box = styled(motion.div)`
  background-color: white;
  color: #903cda;
  padding: 60px 30px;
  border-radius: 10px;
  font-weight: 600;
`;
const PlayBtn = styled(motion.div)`
  width: 100px;
`;
const RecordBox = styled.div`
  display: flex;
  gap: 100px;
`;
const Record = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
  strong {
    font-size: 25px;
    font-weight: 600;
    color: white;
  }
`;

const boxVar = {
  start: { scale: 0.7 },
  end: {
    scale: 1,
    transition: {
      type: "spring",
    },
  },
};

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
    <Wrapper>
      <Title>Pomodoro</Title>

      <TimerContainer>
        <Box variants={boxVar} initial="start" animate="end" key={MM}>
          {MM}
        </Box>
        :
        <Box variants={boxVar} initial="start" animate="end" key={SS}>
          {SS}
        </Box>
      </TimerContainer>

      <PlayBtn
        whileHover={{ scale: 1.2 }}
        onClick={timer.isRunning ? pauseTimer : startTimer}
      >
        {timer.isRunning ? (
          <svg
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5zm4 0a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5z"
            ></path>
          </svg>
        ) : (
          <svg
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
            ></path>
          </svg>
        )}
      </PlayBtn>

      <RecordBox>
        <Record>
          <strong>ROUND</strong>
          {round}/4
        </Record>
        <Record>
          <strong>GOAL</strong>
          {goal}/12
        </Record>
      </RecordBox>
    </Wrapper>
  );
}

export default App;
