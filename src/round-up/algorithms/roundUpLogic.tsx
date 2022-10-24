const roundUpToNearestN = (exp: number) => (amount: number) => {
  const power = Math.pow(10, exp - 1);
  return Math.floor(amount / power + 1) * power;
};

export const roundUpToNearestInteger = roundUpToNearestN(1);
export const roundUpToNearestTen = roundUpToNearestN(2);
export const roundUpToNearestHundred = roundUpToNearestN(3);
