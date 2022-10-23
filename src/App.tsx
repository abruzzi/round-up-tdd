import React from 'react';
import {OrderDetails} from './order/OrderDetails';
import {Payment} from "./round-up/Payment";

import RoundUpStrategyDenmark from "./round-up/algorithms/RoundUpStrategyDenmark";
import RoundUpStrategyJapan from "./round-up/algorithms/RoundUpStrategyJapan";
import RoundUpStrategyAustralia from "./round-up/algorithms/RoundUpStrategyAustralia";

function App() {
  const roundUpForDK = new RoundUpStrategyDenmark();
  const roundUpForJP = new RoundUpStrategyJapan();
  const roundUpForAU = new RoundUpStrategyAustralia();

  return (
    <div className="app">
      <OrderDetails />
      <Payment amount={19.8} strategy={roundUpForAU} />
      <Payment amount={3459} strategy={roundUpForJP} />
      <Payment amount={37} strategy={roundUpForDK} />
    </div>
  );
}

export default App;
