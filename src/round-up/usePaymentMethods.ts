import { useEffect, useState } from "react";
import { PaymentMethod } from "./PaymentMethod";
import { FetchClient } from "./FetchClient";

const url =
  "https://5a2f495fa871f00012678d70.mockapi.io/api/payment-methods?countryCode=AU";
const client = new FetchClient(url);

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const methods = await client.fetch();
      setPaymentMethods(methods)
    };

    fetchPaymentMethods();
  });

  return {
    paymentMethods
  }
}