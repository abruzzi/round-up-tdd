import {useEffect, useState} from "react";

export const useRoundUp = (amount: number) => {
  const [total, setTotal] = useState<number>(amount);
  const [tipMessage, setTipMessage] = useState<string>("");
  const [agreeToDonate, setAgreeToDonate] = useState<boolean>(false);

  const getTipMessage = (agreeToDonate: boolean, tip: number) => {
    return agreeToDonate
      ? "Thanks for your donation."
      : `I would like to donate $${tip} to charity.`;
  };

  useEffect(() => {
    setTotal(agreeToDonate ? Math.floor(amount + 1) : amount);
    const tip = parseFloat((Math.floor(amount + 1) - amount).toPrecision(2));
    setTipMessage(getTipMessage(agreeToDonate, tip));
  }, [agreeToDonate, amount]);

  const updateAgreeToDonate = () => {
    setAgreeToDonate((agreeToDonate) => !agreeToDonate);
  };

  return {
    total,
    tipMessage,
    agreeToDonate,
    updateAgreeToDonate,
  };
};