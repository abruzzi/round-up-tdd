import React from "react";
import { OrderDetails } from "./order/OrderDetails";
import { Payment } from "./round-up/Payment";

import RoundUpStrategyContext from "./round-up/RoundUpStrategyContext";

import RoundUpStrategyAustralia from "./round-up/algorithms/RoundUpStrategyAustralia";
import RoundUpStrategyJapan from "./round-up/algorithms/RoundUpStrategyJapan";
import RoundUpStrategyDenmark from "./round-up/algorithms/RoundUpStrategyDenmark";

function App() {
  return (
    <div className="app">
      <OrderDetails />
      <RoundUpStrategyContext.Provider
        value={{
          strategy: new RoundUpStrategyAustralia(),
        }}
      >
        <Payment amount={19.8} />
      </RoundUpStrategyContext.Provider>

      <RoundUpStrategyContext.Provider
        value={{
          strategy: new RoundUpStrategyJapan(),
        }}
      >
        <Payment amount={3459} />
      </RoundUpStrategyContext.Provider>

      <RoundUpStrategyContext.Provider
        value={{
          strategy: new RoundUpStrategyDenmark(),
        }}
      >
        <Payment amount={37} />
      </RoundUpStrategyContext.Provider>
    </div>
  );
}

export default App;
