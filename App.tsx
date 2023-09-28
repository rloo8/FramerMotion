import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const boxVarient = {
  initial: {
    x: 300,
    opacity: 0,
    scale: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    x: -300,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 1,
    },
  },
};

function App() {
  const [visible, setVisible] = useState(1);
  const nextBtn = () => setVisible((prev) => (prev === 10 ? 10 : prev + 1));

  return (
    <Wrapper>
      <AnimatePresence>
        <Box
          variants={boxVarient}
          initial="initial"
          animate="visible"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>

      <button onClick={nextBtn}>next</button>
    </Wrapper>
  );
}

export default App;
