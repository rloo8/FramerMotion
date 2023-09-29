import { atom } from "recoil";

export const timerState = atom({
  key: "timerState",
  default: {
    minutes: 25,
    seconds: 0,
    isRunning: false,
  },
});

export const roundState = atom({
  key: "roundState",
  default: 0,
});

export const goalState = atom({
  key: "goalState",
  default: 0,
});
