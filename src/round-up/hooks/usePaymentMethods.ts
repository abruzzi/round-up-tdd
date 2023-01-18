import { fetchPaymentMethods } from "../fetch-payment-methods";

import { useQuery } from "@tanstack/react-query";

export const usePaymentMethods = () => {
  const {
    data: paymentMethods = [],
    error,
    status,
  } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: fetchPaymentMethods,
  });

  return {
    paymentMethods,
    error,
    status,
  };
};
