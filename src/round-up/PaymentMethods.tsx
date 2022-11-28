import {PaymentMethod} from "./PaymentMethod";
import {Fragment} from "react";

export const PaymentMethods = ({
                                 paymentMethods,
                               }: {
  paymentMethods: PaymentMethod[];
}) => (
  <div className="paymentMethods">
    {paymentMethods.map((method) => (
      <label key={method.provider}>
        <input
          type="radio"
          name="payment"
          value={method.provider}
          defaultChecked={method.isDefaultMethod}
        />
        <span>{method.label}</span>
      </label>
    ))}
  </div>
);