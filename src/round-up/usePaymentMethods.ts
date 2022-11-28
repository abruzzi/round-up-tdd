import { useEffect, useState } from "react";
import { PaymentMethod, RemotePaymentMethod } from "./PaymentMethod";

const payInCash = new PaymentMethod({ name: "cash" });

const convertPaymentMethods = (methods: RemotePaymentMethod[]) => {
  if (methods.length === 0) {
    return [];
  }

  const extended: PaymentMethod[] = methods.map(
    (method) => new PaymentMethod(method)
  );
  extended.push(payInCash);

  return extended;
};

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const url =
        "https://5a2f495fa871f00012678d70.mockapi.io/api/payment-methods?countryCode=AU";

      const response = await fetch(url);
      const methods: RemotePaymentMethod[] = await response.json();

      setPaymentMethods(convertPaymentMethods(methods))
    };

    fetchPaymentMethods();
  });

  return {
    paymentMethods
  }
}