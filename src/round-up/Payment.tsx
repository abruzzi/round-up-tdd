import { useEffect, useState } from "react";

export const Payment = ({ amount = 0 }: { amount?: number }) => {
  const [shouldRoundUp, setRoundUp] = useState<boolean>(false);
  const [total, setTotal] = useState(amount);

  const [tip, setTip] = useState<number>(0);
  useEffect(() => {
    const total = Math.floor(amount + 1);
    if (shouldRoundUp) {
      setTotal(total);
    } else {
      setTotal(amount);
    }
    setTip(parseFloat((total - amount).toPrecision(10)))
  }, [shouldRoundUp]);

  const handleChange = () => {
    setRoundUp(shouldRoundUp => !shouldRoundUp)
  }

  return (
    <div>
      <h4>Payment</h4>
      <label>
        I'd to donate ${tip} to charity
        <input
          type="checkbox"
          checked={shouldRoundUp}
          onChange={handleChange}
        />
      </label>
      <button>${total}</button>
    </div>
  );
};
