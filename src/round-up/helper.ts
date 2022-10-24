import { CountryCode } from "./types";
import {
  roundUpToNearestHundred,
  roundUpToNearestInteger,
  roundUpToNearestTen,
} from "./roundUpLogic";

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

const formatNumber = (number: number) => parseFloat(number.toPrecision(2));

const calculateTipFor =
  (calculateRoundUpFor: (amount: number) => number) => (amount: number) => {
    return formatNumber(calculateRoundUpFor(amount) - amount);
  };

export const getCalculateRoundUpFunc = (countryCode: CountryCode) =>
  calculatorMap[countryCode]

export const getCalculateTipFunc = (countryCode: CountryCode) =>
  calculateTipFor(calculatorMap[countryCode])

export const calculatorMap = {
  JP: roundUpToNearestHundred,
  DK: roundUpToNearestTen,
  AU: roundUpToNearestInteger,
};

