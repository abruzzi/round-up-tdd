import { PaymentStrategy } from "../types";

export function formatCheckboxLabel(
  agreeToDonate: boolean,
  tip: number,
  strategy: PaymentStrategy
) {
  const currencySign = strategy.getCurrencySign();
  return agreeToDonate
    ? "Thanks for your donation."
    : `I would like to donate ${currencySign}${tip} to charity.`;
}

export function formatButtonLabel(total: number, strategy: PaymentStrategy) {
  const currencySign = strategy.getCurrencySign();
  return `${currencySign}${total}`;
}

const roundUpToNearestN = (exp: number) => (amount: number) => {
  const power = Math.pow(10, exp - 1);
  return Math.floor(amount / power + 1) * power;
};
const formatNumber = (number: number) => parseFloat(number.toPrecision(10));

export const calculateTipFor =
  (calculateRoundUpFor: (amount: number) => number) => (amount: number) => {
    return formatNumber(calculateRoundUpFor(amount) - amount);
  };

export const roundUpToNearestInteger = roundUpToNearestN(1);
export const roundUpToNearestTen = roundUpToNearestN(2);
export const roundUpToNearestHundred = roundUpToNearestN(3);