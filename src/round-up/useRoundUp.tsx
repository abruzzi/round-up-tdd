import { useEffect, useState } from "react";
import {RoundUpStrategy} from "./algorithms/RoundUpStrategy";

export const useRoundUp = (
  amount: number,
  strategy: RoundUpStrategy,
) => {
  const [agreeToDonate, setAgreeToDonate] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(amount);
  const [tip, setTip] = useState<number>(0);

  const updateAgreeToDonate = () =>
    setAgreeToDonate((agreeToDonate) => !agreeToDonate);

  useEffect(() => {
    setTotal(agreeToDonate ? strategy.getRoundUp(amount) : amount);
    setTip(strategy.getTip(amount));
  }, [agreeToDonate, amount, strategy]);

  return {
    total,
    tip,
    agreeToDonate,
    updateAgreeToDonate
  };
};
