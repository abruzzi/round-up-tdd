type DonationCheckboxProps = {
  onChange: () => void;
  checked: boolean;
  content: string;
};

export const DonationCheckbox = ({
  onChange,
  checked,
  content,
}: DonationCheckboxProps) => {
  return (
    <div className="donation">
      <label>
        <input type="checkbox" onChange={onChange} checked={checked} />
        <p>{content}</p>
      </label>
    </div>
  );
};
