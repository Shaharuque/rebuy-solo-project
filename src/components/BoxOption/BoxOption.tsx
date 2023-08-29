import React from "react";

interface BoxOptionButtonProps {
  type: "button";
  text: string;
  value?: string;
  onClick: () => void;
}

const BoxOptionButton: React.FC<BoxOptionButtonProps> = ({
  type,
  text,
  value,
  onClick,
}) => {
  return (
    <button
      className={`${value === text ? 'bg-red-400 text-white' : 'bg-white'} box-option-button border border-gray-200 rounded-md p-[5px] text-sm transition`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BoxOptionButton;