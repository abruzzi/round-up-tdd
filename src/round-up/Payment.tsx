import {useState} from "react";
import {useRoundUp} from "./useRoundUp";

function formatMessage(agreeToDonate: boolean, tip: number) {
  return agreeToDonate ? 'Thanks for your donation.' : `I would like to donate $${tip} to charity.`;
}

export const Payment = ({amount}: { amount: number }) => {
  const [agreeToDonate, setAgreeToDonate] = useState<boolean>(false);
  const {total, tip} = useRoundUp(amount, agreeToDonate);

  const handleChange = () => {
    setAgreeToDonate(agreeToDonate => !agreeToDonate)
  }

  return <div className="container">
    <h3>Payment</h3>
    <label>
      <input type="checkbox" onChange={handleChange} checked={agreeToDonate}/>
      <p>{formatMessage(agreeToDonate, tip)}</p>
    </label>
    <button>${total}</button>
  </div>
}