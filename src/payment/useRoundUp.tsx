import {useEffect, useState} from "react";
import {CountryCode, string} from "./types";

const roundUpToNearestN = (exp: number) => (amount: number) => {
  const power = Math.pow(10, exp - 1);
  return Math.floor(amount / power + 1) * power;
};

const formatNumber = (number: number) => parseFloat(number.toPrecision(10));

const calculateTipFor =
  (calculateRoundUpFor: (amount: number) => number) => (amount: number) => {
    return formatNumber(calculateRoundUpFor(amount) - amount);
  };

const roundUpToNearestInteger = roundUpToNearestN(1)
const roundUpToNearestTen = roundUpToNearestN(2);
const roundUpToNearestHundred = roundUpToNearestN(3);

type Algorithm = (amount: number) => number;

type AlgorithmMapType = {
  [key in CountryCode]: Algorithm;
};

const algorithmMap: AlgorithmMapType = {
  AU: roundUpToNearestInteger,
  DK: roundUpToNearestTen,
  JP: roundUpToNearestHundred
}

export function useRoundUp(amount: number, strategy: PaymentStrategy) {
  const [agreeToDonate, setRoundUp] = useState<boolean>(false);
  const [total, setTotal] = useState(amount);
  const [tip, setTip] = useState<number>(0);

  useEffect(() => {
    setTotal(agreeToDonate ? strategy.getRoundUpAmount(amount) : amount);
    setTip(strategy.getTip(amount));
  }, [amount, agreeToDonate, strategy]);

  const updateAgreeToDonate = () => {
    setRoundUp((shouldRoundUp) => !shouldRoundUp);
  };
  return { agreeToDonate, total, tip, updateAgreeToDonate };
}

export interface PaymentStrategy {
  getCurrencySign(): string;
  getRoundUpAmount(amount: number): number;
  getTip(amount: number): number;
  getPaymentMethods(): string[]
}

export class PaymentStrategyAU implements PaymentStrategy {
  private readonly algorithm: Algorithm;

  constructor() {
    this.algorithm = roundUpToNearestInteger
  }

  getCurrencySign(): string {
    return "$";
  }

  getPaymentMethods(): string[] {
    return ['apple'];
  }

  getRoundUpAmount(amount: number): number {
    return this.algorithm(amount);
  }

  getTip(amount: number): number {
    return calculateTipFor(this.algorithm.bind(this))(amount);
  }
}

export class PaymentStrategyJP implements PaymentStrategy {
  private readonly algorithm: Algorithm;

  constructor() {
    this.algorithm = roundUpToNearestHundred
  }

  getCurrencySign(): string {
    return "¥";
  }

  getPaymentMethods(): string[] {
    return [];
  }

  getRoundUpAmount(amount: number): number {
    return this.algorithm(amount);
  }

  getTip(amount: number): number {
    return calculateTipFor(this.algorithm.bind(this))(amount);
  }
}

export class PaymentStrategyDK implements PaymentStrategy {
  private readonly algorithm: Algorithm;

  constructor() {
    this.algorithm = roundUpToNearestTen
  }

  getCurrencySign(): string {
    return "Kr.";
  }

  getPaymentMethods(): string[] {
    return [];
  }

  getRoundUpAmount(amount: number): number {
    return this.algorithm(amount);
  }

  getTip(amount: number): number {
    return calculateTipFor(this.algorithm.bind(this))(amount);
  }
}