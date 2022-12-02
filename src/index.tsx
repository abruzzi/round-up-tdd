// import $ from "jquery";
// import "./index.css";
//
// import { FetchClient } from "./round-up/FetchClient";
// import type { PaymentMethod } from "./round-up/PaymentMethod";
// import { PaymentStrategy, PaymentStrategyDK } from "./round-up/PaymentStrategy";
// import { formatButtonLabel, formatCheckboxLabel } from "./round-up/utils";
//
// const renderPaymentMethods = (paymentMethods: PaymentMethod[]) => {
//   return $("<div>", { class: "paymentMethods" }).append(
//     paymentMethods.map((method) => {
//       const item = $(`
//         <label>
//           <input type="radio" name="payment">
//           <span></span>
//         </label>
//       `);
//
//       item.find("input").attr({
//         value: method.provider,
//         checked: method.isDefaultMethod,
//       });
//
//       item.find("span").text(method.label);
//       return item;
//     })
//   );
// };
//
//
//
// const renderPaymentButton = (strategy: PaymentStrategy, total: number) => {
//   return $("<button>", { class: "paymentButton" }).text(
//     formatButtonLabel(strategy, total)
//   );
// };
//
// const renderCheckbox = (
//   onChange: () => void,
//   checked: boolean,
//   content: string
// ) => {
//   const element = $(`
//   <div class="donation">
//     <label>
//        <input type="checkbox">
//        <p class="checkbox-content"></p>
//     </label>
//   </div>
//   `);
//
//   element
//     .find("input")
//     .attr({
//       checked: checked,
//     })
//     .on("change", onChange);
//
//   element.find("p.checkbox-content").text(content);
//
//   return element;
// };
//
// $(() => {
//   const container = $("#root").find(".container");
//
//   const url =
//     "https://5a2f495fa871f00012678d70.mockapi.io/api/payment-methods?countryCode=AU";
//   const client = new FetchClient(url);
//
//   const strategy = new PaymentStrategyDK();
//   const amount = 13.8;
//   const tip = strategy.getTip(amount);
//
//   client.fetch().then((methods) => {
//     let agreeToDonate = false;
//
//     const paymentMethods = renderPaymentMethods(methods);
//
//     const onChange = () => {
//       agreeToDonate = !agreeToDonate;
//       const total = agreeToDonate ? strategy.getRoundUpAmount(amount) : amount;
//
//       $("button.paymentButton").text(formatButtonLabel(strategy, total));
//       $("p.checkbox-content").text(
//         formatCheckboxLabel(agreeToDonate, tip, strategy)
//       );
//     };
//
//     const checkbox = renderCheckbox(
//       onChange,
//       agreeToDonate,
//       formatCheckboxLabel(agreeToDonate, tip, strategy)
//     );
//     const button = renderPaymentButton(strategy, amount);
//
//     paymentMethods.appendTo(container);
//     checkbox.appendTo(container);
//     button.appendTo(container);
//   });
// });

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);