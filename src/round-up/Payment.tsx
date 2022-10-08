import { useEffect, useState } from "react";

export const Payment = ({ amount = 0 }: { amount?: number }) => {
  const [shouldRoundUp, setRoundUp] = useState<boolean>(false);
  const [total, setTotal] = useState(amount);

  useEffect(() => {
    if (shouldRoundUp) {
      setTotal(Math.floor(amount + 1));
    } else {
      setTotal(amount);
    }
  }, [shouldRoundUp]);

  return (
    <div>
      <h4>Payment</h4>
      <label>
        I'd to donate $0.1 to charity
        <input
          type="checkbox"
          checked={shouldRoundUp}
          onChange={() => setRoundUp(true)}
        />
      </label>
      <button>${total}</button>
    </div>
  );
};
