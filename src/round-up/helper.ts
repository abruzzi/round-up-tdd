import { RoundUpStrategy } from "./types";

export function formatInputLabel(
  agreeToDonate: boolean,
  strategy: RoundUpStrategy,
  tip: number
) {
  return agreeToDonate
    ? "Thanks for your donation."
    : `I would like to donate ${strategy.getCurrencySign()}${tip} to charity.`;
}

export function formatButtonLabel(strategy: RoundUpStrategy, total: number) {
  return `${strategy.getCurrencySign()}${total}`;
}