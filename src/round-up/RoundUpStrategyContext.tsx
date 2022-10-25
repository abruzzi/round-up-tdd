import { RoundUpStrategy } from "./types";
import {createContext} from "react";
import {RoundUpStrategyAustralia} from "./strategy/RoundUpStrategyAustralia";

export type RoundUpStrategyContextType = {
  strategy: RoundUpStrategy;
}

export default createContext<RoundUpStrategyContextType>({
  strategy: new RoundUpStrategyAustralia()
})