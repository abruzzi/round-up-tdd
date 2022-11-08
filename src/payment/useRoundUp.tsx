import {useEffect, useState} from "react";
import {CountryCode} from "./types";

const roundUpToNearestN = (exp: number) => (amount: number) => {
  const power = Math.pow(10, exp - 1);
  return Math.floor(amount / power + 1) * power;
};

const formatNumber = (number: number) => parseFloat(number.toPrecision(10));

const calculateTipFor =
  (calculateRoundUpFor: (amount: number) => number) => (amount: number) => {
    return formatNumber(calculateRoundUpFor(amount) - amount);
  };

type AlgorithmMapType = {
  [key in CountryCode]: (amount: number) => number;
};

const roundUpToNearestInteger = roundUpToNearestN(1)
const roundUpToNearestTen = roundUpToNearestN(2);
const roundUpToNearestHundred = roundUpToNearestN(3);

const algorithmMap: AlgorithmMapType = {
  AU: roundUpToNearestInteger,
  DK: roundUpToNearestTen,
  JP: roundUpToNearestHundred
}

export function useRoundUp(amount: number, countryCode: CountryCode) {
  const [agreeToDonate, setRoundUp] = useState<boolean>(false);
  const [total, setTotal] = useState(amount);
  const [tip, setTip] = useState<number>(0);

  useEffect(() => {
    const calculateRoundUp = algorithmMap[countryCode];
    const calculateTip = calculateTipFor(calculateRoundUp);
    setTotal(agreeToDonate ? calculateRoundUp(amount) : amount);
    setTip(calculateTip(amount));
  }, [amount, agreeToDonate, countryCode]);

  const updateAgreeToDonate = () => {
    setRoundUp(shouldRoundUp => !shouldRoundUp)
  }
  return {agreeToDonate, total, tip, updateAgreeToDonate};
}

