import { CountryCode } from "./types";
import {
  roundUpToNearestHundred,
  roundUpToNearestInteger,
  roundUpToNearestTen,
} from "./roundUpLogic";
import { Calculator } from "./Calculator";

const currencyMap = {
  JP: "¥",
  DK: "Kr.",
  AU: "$",
};

const getDollarSign = (countryCode: CountryCode) => currencyMap[countryCode];

export const formatInputLabel = (
  agreeToDonate: boolean,
  tip: number,
  countryCode: CountryCode
) =>
  agreeToDonate
    ? "Thanks for your donation."
    : `I would like to donate ${getDollarSign(countryCode)}${tip} to charity.`;

export const formatButtonLabel = (countryCode: CountryCode, total: number) =>
  `${getDollarSign(countryCode)}${total}`;

export const calculatorMap = {
  JP: new Calculator(roundUpToNearestHundred),
  DK: new Calculator(roundUpToNearestTen),
  AU: new Calculator(roundUpToNearestInteger),
};
