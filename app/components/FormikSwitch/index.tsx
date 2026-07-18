import React from "react";
import { useField } from "formik";
import Switch from "../Input/Switch";
import { AlertCircle } from "lucide-react";

interface FormikSwitchProps {
  name: string;
  label?: string;
  disabled?: boolean;
}

export const FormikSwitch = ({
  name,
  label,
  disabled = false,
}: FormikSwitchProps) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  return (
    <div>
      <Switch
        name={name}
        checked={field.value}
        onChange={(value) => setValue(value)}
        label={label || (field.value ? "فعال" : "غیرفعال")}
        disabled={disabled}
      />
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle size={14} />
          {meta.error}
        </p>
      )}
    </div>
  );
};
