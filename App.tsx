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
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Circle = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: #00a5ff;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const toggleClicked = () => setIsClicked((prev) => !prev);

  return (
    <Wrapper onClick={toggleClicked}>
      <Box>{!isClicked ? <Circle layoutId="circle" /> : null}</Box>
      <Box>{isClicked ? <Circle layoutId="circle" /> : null}</Box>
    </Wrapper>
  );
}

export default App;
