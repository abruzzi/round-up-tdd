import {useEffect, useState} from "react";
import {PaymentStrategy} from "./PaymentStrategy";

export const useRoundUp = (amount: number, strategy: PaymentStrategy) => {
  const [total, setTotal] = useState<number>(amount);
  const [tip, setTip] = useState<number>(0);
  const [agreeToDonate, setAgreeToDonate] = useState<boolean>(false);

  useEffect(() => {
    setTotal(agreeToDonate ? strategy.getRoundUpAmount(amount) : amount);
    setTip(strategy.getTip(amount));
  }, [agreeToDonate, amount, strategy]);

  const updateAgreeToDonate = () => {
    setAgreeToDonate((agreeToDonate) => !agreeToDonate);
  };

  return {
    total,
    tip,
    agreeToDonate,
    updateAgreeToDonate,
  };
};

