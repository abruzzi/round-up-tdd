export function formatCheckboxLabel(
  agreeToDonate: boolean,
  tip: number,
  countryCode: string
) {
  const currencySign = countryCode === "JP" ? "¥" : `$`;
  return agreeToDonate
    ? "Thanks for your donation."
    : `I would like to donate ${currencySign}${tip} to charity.`;
}

export function formatButtonLabel(total: number, countryCode: string = "AU") {
  const currencySign = countryCode === "JP" ? "¥" : `$`;
  return `${currencySign}${total}`;
}