import React from 'react';

type QuantityInputProps = {
  value: number;
  onChange: (value: number) => void;
};

const QuantityInput: React.FC<QuantityInputProps> = ({ value, onChange }) => {
  const handleDecrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={handleDecrease}
        className="bg-gray-700 text-white p-2 rounded border border-gray-600"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-20 p-2 bg-gray-800 text-white rounded border border-gray-600 text-center"
        min="1"
      />
      <button
        type="button"
        onClick={handleIncrease}
        className="bg-gray-700 text-white p-2 rounded border border-gray-600"
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;