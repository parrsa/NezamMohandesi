import React from "react";

interface CustomSwitchProps {
  id?: string;
  name?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  whiteLabel?: boolean;
  sizeLabel?: string;
}

export default function Switch({
  id,
  name,
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
  whiteLabel,
  sizeLabel = "text-sm",
}: CustomSwitchProps) {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const switchId = id || name;

  return (
    <label
      htmlFor={switchId}
      className={`flex items-center  gap-2 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div className="relative inline-flex items-center">
        <input
          id={switchId}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => handleToggle()}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={`
              w-14 h-8 bg-neutral-700 rounded-full
              transition-colors duration-200 ease-in-out
              peer-checked:bg-purple-600
              after:content-['']
              after:absolute after:top-1 after:left-[4px]
              after:bg-white after:rounded-full after:h-6 after:w-6
              after:transition-all after:duration-200
              peer-checked:after:translate-x-6
            `}
        />
      </div>
      {label && (
        <span
          className={` ${sizeLabel} ${whiteLabel ? "text-white" : checked ? "text-purple-600" : "text-neutral-700"}`}
        >
          {label}
        </span>
      )}
    </label>
  );
}
