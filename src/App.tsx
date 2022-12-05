import React from 'react';
import {OrderDetails} from './order/OrderDetails';
import {Payment} from "./round-up/Payment";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <OrderDetails />
        <Payment amount={19.8} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
