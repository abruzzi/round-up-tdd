import React from 'react';
import {OrderDetails} from './order/OrderDetails';
import {Payment} from "./payment/Payment";

function App() {
  return (
    <div className="app">
      <OrderDetails />
      <Payment amount={19.8} methods={['apple']} />
    </div>
  );
}

export default App;
