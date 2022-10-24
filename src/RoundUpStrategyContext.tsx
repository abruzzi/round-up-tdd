import { RoundUpStrategy } from "./round-up/algorithms/RoundUpStrategy";
import { createContext } from "react";
import RoundUpStrategyAustralia from "./round-up/algorithms/RoundUpStrategyAustralia";

type RoundUpStrategyContextType = {
  strategy: RoundUpStrategy;
};
export const RoundUpStrategyContext = createContext<RoundUpStrategyContextType>({
  strategy: new RoundUpStrategyAustralia()
})