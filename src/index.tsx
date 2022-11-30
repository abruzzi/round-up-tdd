import $ from "jquery";
import "./index.css";

import { FetchClient } from "./round-up/FetchClient";
import type { PaymentMethod } from "./round-up/PaymentMethod";
import { PaymentStrategy, PaymentStrategyAU } from "./round-up/PaymentStrategy";
import { formatButtonLabel, formatCheckboxLabel } from "./round-up/utils";

const renderPaymentMethods = (paymentMethods: PaymentMethod[]) => {
  return $("<div>", { class: "paymentMethods" }).append(
    paymentMethods.map((method) => {
      const $label = $("<label>");

      const $input = $("<input>", {
        name: "payment",
        type: "radio",
        value: method.provider,
        checked: method.isDefaultMethod,
      });

      const $span = $("<span>").text(method.label);

      $label.append($input);
      $label.append($span);

      return $label;
    })
  );
};

const renderPaymentButton = (strategy: PaymentStrategy, total: number) => {
  return $("<button>", { class: "paymentButton" }).text(
    formatButtonLabel(strategy, total)
  );
};

const renderCheckbox = (
  onChange: () => void,
  checked: boolean,
  content: string
) => {
  const $input = $("<input>", { type: "checkbox", checked: checked }).on(
    "change",
    onChange
  );
  const $p = $("<p>", { class: "checkbox-content" }).text(content);
  const $label = $("<label>").append($input).append($p);

  return $("<div>", { class: "donation" }).append($label);
};

$(() => {
  const paymentContainer = $("<div>", { class: "container" });
  paymentContainer.appendTo("#root");

  const container = $("#root").find(".container");

  const url =
    "https://5a2f495fa871f00012678d70.mockapi.io/api/payment-methods?countryCode=AU";
  const client = new FetchClient(url);

  const strategy = new PaymentStrategyAU();
  const amount = 19.8;
  const tip = strategy.getTip(amount);

  client.fetch().then((paymentMethods) => {
    const $paymentMethods = renderPaymentMethods(paymentMethods);
    $paymentMethods.appendTo(container);

    const $button = renderPaymentButton(strategy, amount);

    let agreeToDonate = false;
    const onChange = () => {
      agreeToDonate = !agreeToDonate;
      const total = agreeToDonate ? strategy.getRoundUpAmount(amount) : amount;

      $("button.paymentButton").text(formatButtonLabel(strategy, total));
      $("p.checkbox-content").text(
        formatCheckboxLabel(agreeToDonate, tip, strategy)
      );
    };

    const $checkbox = renderCheckbox(
      onChange,
      agreeToDonate,
      formatCheckboxLabel(agreeToDonate, tip, strategy)
    );

    $checkbox.appendTo(container);
    $button.appendTo(container);
  });
});
