import React from 'react';
import {OrderDetails} from './order/OrderDetails';
import Payment from "./payment";
import {PaymentStrategyAU} from "./payment";

function App() {
  return (
    <div className="app">
      <OrderDetails />
      <Payment amount={19.8} strategy={new PaymentStrategyAU()} />
    </div>
  );
}

export default App;
