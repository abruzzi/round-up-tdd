import { CountryCode } from "./types";

const currencyMap = {
  JP: "¥",
  DK: "Kr.",
  AU: "$",
};

const getCurrencySign = (countryCode: CountryCode) => currencyMap[countryCode];

export function formatCheckboxLabel(
  agreeToDonate: boolean,
  tip: number,
  countryCode: CountryCode
) {
  const currencySign = getCurrencySign(countryCode);
  return agreeToDonate
    ? "Thanks for your donation."
    : `I would like to donate ${currencySign}${tip} to charity.`;
}

export function formatButtonLabel(total: number, countryCode: CountryCode = "AU") {
  const currencySign = getCurrencySign(countryCode);
  return `${currencySign}${total}`;
}
