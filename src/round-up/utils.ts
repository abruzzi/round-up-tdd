import {PaymentStrategy} from "./models/PaymentStrategy";

export const formatCheckboxLabel = (
  agreeToDonate: boolean,
  tip: number,
  strategy: PaymentStrategy
) => {
  const currencySign = strategy.getCurrencySign();
  return agreeToDonate
    ? "Thanks for your donation."
    : `I would like to donate ${currencySign}${tip} to charity.`;
};

export const formatButtonLabel = (strategy: PaymentStrategy, total: number) =>
  `${strategy.getCurrencySign()}${total}`;

const roundUpToNearestN = (exp: number) => (amount: number) => {
  const power = Math.pow(10, exp - 1);
  return Math.floor(amount / power + 1) * power;
};

export const formatNumber = (number: number) => parseFloat(number.toPrecision(2));

export const roundUpToNearestInteger = roundUpToNearestN(1);
export const roundUpToNearestTen = roundUpToNearestN(2);
export const roundUpToNearestHundred = roundUpToNearestN(3);