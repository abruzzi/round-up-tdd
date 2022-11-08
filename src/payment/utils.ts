import { CountryCode } from "./types";
import {PaymentStrategy} from "./useRoundUp";

const currencyMap = {
  JP: "¥",
  DK: "Kr.",
  AU: "$",
};

const getCurrencySign = (countryCode: CountryCode) => currencyMap[countryCode];

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
