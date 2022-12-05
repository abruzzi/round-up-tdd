import { FetchClient } from "./FetchClient";

import { useQuery } from "@tanstack/react-query";

const url =
  "https://5a2f495fa871f00012678d70.mockapi.io/api/payment-methods?countryCode=AU";
const client = new FetchClient(url);

export const usePaymentMethods = () => {
  const {
    data: paymentMethods = [],
    error,
    status,
  } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: () => client.fetch(),
  });

  return {
    paymentMethods,
    error,
    status,
  };
};
