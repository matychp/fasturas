import { useMemo, useState } from "react";
import { Input } from "~/components/ui/input";

interface CurrencyInputProps {
  amount: number;
  onAmountChange?: (amount: number) => void;
}

export const CurrencyInput = ({
  amount,
  onAmountChange,
}: CurrencyInputProps) => {
  const [isEditing, toggleEditing] = useState(false);

  const amountToDisplay = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(amount));
  }, [amount]);

  return (
    <>
      {isEditing === true ? (
        <Input
          type="number"
          min={0}
          step={0.01}
          value={amount}
          onChange={(e) => {
            if (onAmountChange !== undefined) {
              onAmountChange(Number(e.target.value));
            }
          }}
          onBlur={() => toggleEditing(false)}
        />
      ) : (
        <Input
          type="text"
          value={amountToDisplay}
          onFocus={() => toggleEditing(true)}
          readOnly
        />
      )}
    </>
  );
};
