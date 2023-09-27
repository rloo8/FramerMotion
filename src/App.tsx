import { motion } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BigBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: { rotateZ: 90 },
  click: { borderRadius: "100px" },
};

function App() {
  const bigBoxRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <BigBox ref={bigBoxRef}>
        <Box
          drag
          dragSnapToOrigin // 드래그 후 제자리로 돌아옴
          dragElastic={1} // 탄성력 0~1 (defalut 0.5)
          dragConstraints={bigBoxRef}
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
        />
      </BigBox>
    </Wrapper>
  );
}

export default App;
