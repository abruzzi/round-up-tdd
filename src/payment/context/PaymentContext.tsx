import {createContext} from "react";
import {PaymentStrategy} from "../types";
import {PaymentStrategyAU} from "../strategies/PaymentStrategyAU";

export type PaymentContextType = {
  strategy: PaymentStrategy;
}

export const PaymentContext = createContext<PaymentContextType>({
  strategy: new PaymentStrategyAU()
})