import { createContext } from "react";
import { RoundUpStrategy } from "./algorithms/RoundUpStrategy";
import RoundUpStrategyAustralia from "./algorithms/RoundUpStrategyAustralia";

type RoundUpStrategyContextType = {
  strategy: RoundUpStrategy;
};

export default createContext<RoundUpStrategyContextType>({
  strategy: new RoundUpStrategyAustralia(),
});
