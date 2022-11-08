import { useMemo } from "react";
import {PaymentMethodType} from "../../types";

function transformPaymentMethods(methods: string[]) {
  if (methods.length > 0) {
    const extended = methods.map((method) => ({
      provider: method,
      label: `Pay with ${method}`,
    }));
    extended.push({ provider: "cash", label: "Pay in cash" });
    return extended;
  }
  return [];
}

function PaymentMethod(props: { method: PaymentMethodType }) {
  return (
    <label>
      <input
        type="radio"
        name="payment"
        value={props.method.provider}
        defaultChecked={props.method.provider === "cash"}
      />
      <span>{props.method.label}</span>
    </label>
  );
}

export const PaymentMethods = ({methods}: { methods: string[] }) => {
  const paymentMethods = useMemo(
    () => transformPaymentMethods(methods),
    [methods]
  );

  return (
    <div className="paymentMethods">
      {paymentMethods.map((method) => (
        <PaymentMethod key={method.provider} method={method}/>
      ))}
    </div>
  );
};
