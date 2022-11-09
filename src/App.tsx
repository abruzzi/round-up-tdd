import React, {useMemo, useState} from 'react';
import {OrderDetails} from './order/OrderDetails';
import Payment, {PaymentStrategyAU, PaymentStrategyDK, PaymentStrategyJP} from "./payment";
import {PaymentContext} from './payment/context/PaymentContext';

import './index.css';

type CountryCode = 'AU' | 'JP' | 'DK';

const strategyMap = {
  AU: new PaymentStrategyAU(),
  JP: new PaymentStrategyJP(),
  DK: new PaymentStrategyDK()
}

function App() {
  const [location, setLocation] = useState<CountryCode>('AU')

  const context = useMemo(() => {
    return {
      strategy: strategyMap[location]
    }
  }, [location]);

  const changeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const location = event.target.value as CountryCode;
    setLocation(location);
  }

  return (
    <div className="app">
      <PaymentContext.Provider value={context}>
        <div className="location-switcher">
          <label>
            <input type="radio" name="strategy" value="AU" onChange={changeLocation}/> Switch Location to Australia
          </label>

          <label>
            <input type="radio" name="strategy" value="JP" onChange={changeLocation}/> Switch Location to Japan
          </label>

          <label>
            <input type="radio" name="strategy" value="DK" onChange={changeLocation}/> Switch Location to Denmark
          </label>
        </div>
        <OrderDetails />
        <Payment amount={18.8} />
      </PaymentContext.Provider>
    </div>
  );
}

export default App;
