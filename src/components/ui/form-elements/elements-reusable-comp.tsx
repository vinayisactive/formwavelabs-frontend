import {
  Settings2,
  X,
  ChevronDown,
  ChevronUp,
  GripVertical,
} from "lucide-react";
import { FC } from "react";

interface ElementLayerTileProps {
  label: string;
  typeLabel: string;
}

interface SettingWrapperProps {
  children: React.ReactNode;
}

interface SettingHeaderProps {
  title: string;
  onClose: () => void;
}

interface InputTileProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

interface RequiredCheckTileProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface SettingFooterProps {
  onCancel: () => void;
  onSave: () => void;
}

interface SelectTileProps {
  label: string;
  value: string;
  placeholder?: string;
  options: string[];
  onChange: (value: string) => void;
}

interface SubmitComponentWrapperProps {
  id: string;
  label: string;
  required?: boolean;
  helperText?: string;
  currentElementToValidate?: string;
  isFormError?: boolean;
  children: React.ReactNode;
  labelClass?: string;
  helperTextClassName?: string;
  errorLable?: string;
}

interface OptionsButtonProps {
  option: string;
  removeHandler: (option: string) => void;
}

export const ElementLayerTile = ({
  label,
  typeLabel,
}: ElementLayerTileProps) => {
  return (
    <div className="cursor-grab hover:shadow-sm transition-all p-2 rounded-md border-2">
      <div className="flex items-center gap-2 pr-2">
        <GripVertical className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
        <div className="flex flex-col  w-full rounded-md">
          <span className="text-[11px] font-medium text-foreground/80 overflow-hidden truncate whitespace-nowrap max-w-[90%]">
            {label}
          </span>
          <div className="text-[11px] text-muted-foreground mt-1.5 flex flex-wrap justify-start items-center gap-2">
            <span className="px-1.5 py-0.5 bg-gray-200 rounded-md self-start whitespace-nowrap">
              {typeLabel}
            </span>
            {(typeLabel === "Layout Image" || typeLabel === "Header") && (
              <span className="px-1.5 py-0.5 bg-pink-100 rounded-md self-start whitespace-nowrap">
                design 🎨
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SettingWrapper = ({ children }: SettingWrapperProps) => (
  <div className="w-full p-6 space-y-7 max-w-lg mx-auto bg-white rounded-xl">
    {children}
  </div>
);

export const SettingHeader = ({ title }: SettingHeaderProps) => (
  <div className="flex items-center justify-start gap-2">
    <Settings2 className="" />
    <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
  </div>
);

export const InputTile = ({
  label,
  value,
  placeholder,
  onChange,
}: InputTileProps) => (
  <div className="space-y-2 w-full">
    <label className="block text-sm font-medium text-gray-700">{label}</label>

    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 border rounded-lg border-gray-300 focus:border-gray-400 
               focus:ring-2 focus:ring-gray-200 placeholder-gray-400 text-sm transition-all"
      placeholder={placeholder}
    />
  </div>
);

export const RequiredCheckTile = ({
  checked,
  onChange,
}: RequiredCheckTileProps) => (
  <div className="flex items-center justify-start gap-2 pt-2">
    <span className="text-sm font-semibold text-gray-700">Required</span>

    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-800"></div>
    </label>
  </div>
);

export const OptionsButton: FC<OptionsButtonProps> = ({
  option,
  removeHandler,
}) => {
  return (
    <button className=" px-5 py-2 border text-black text-xs relative rounded-md">
      <span
        className=" absolute -top-2 -right-2 bg-black text-white rounded"
        onClick={() => removeHandler(option)}
      >
        <X size={18} />
      </span>
      <span className="text-black">{option}</span>
    </button>
  );
};

export const SelectTile = ({
  label,
  value,
  placeholder = "Select an option",
  options,
  onChange,
}: SelectTileProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <select
        className="w-full px-3 py-2.5 border rounded-lg border-gray-300 focus:border-gray-400 placeholder-gray-400 text-sm transition-all appearance-none pr-10 bg-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled className="text-gray-400">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex flex-col">
        <ChevronUp className=" text-gray-400 mb-[1px]" size={12} />
        <ChevronDown className=" text-gray-400" size={12} />
      </div>
    </div>
  </div>
);

export const SettingFooter = ({ onCancel, onSave }: SettingFooterProps) => (
  <div className=" w-full flex gap-3 justify-end items-center ">
    <button
      className="w-[25%] flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-black border hover:bg-gray-200 rounded-lg transition-colors"
      onClick={onCancel}
    >
      Cancel
    </button>

    <button
      className="w-[25%] flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-black hover:bg-black/85 rounded-lg transition-colors"
      onClick={onSave}
    >
      Update
    </button>
  </div>
);

export const RequiredFieldError = ({
  errorLable,
  requiredStyleClass,
}: {
  errorLable?: string;
  requiredStyleClass?: string;
}) => {
  return (
    <div
      className={`text-xs text-red-500 px-2 bg-red-50 self-start rounded-sm ${requiredStyleClass}`}
    >
      {errorLable ? errorLable : "Field is required"}{" "}
    </div>
  );
};

export const SubmitComponentWrapper = ({
  id,
  label,
  required,
  helperText,
  currentElementToValidate,
  isFormError,
  children,
  labelClass = "text-xl text-black",
  helperTextClassName = "text-xs text-gray-500 px-2 bg-black/5 mt-1",
  errorLable = "Field is required",
}: SubmitComponentWrapperProps) => {
  return (
    <div className="flex flex-col gap-1 items-start px-2">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-xs ml-1">{"(req)"}</span>}
      </label>

      {children}

      <span className="flex gap-2 items-center justify-start">
        {helperText && (
          <span className={helperTextClassName}>{helperText}</span>
        )}
        {currentElementToValidate === "" && isFormError && (
          <RequiredFieldError
            requiredStyleClass="mt-1"
            errorLable={errorLable}
          />
        )}
      </span>
    </div>
  );
};

export const SplitSubmitComponentWrapper = ({
  id,
  label,
  required,
  helperText,
  currentElementToValidate,
  isFormError,
  children,
  labelClass = "md:text-xl text-black flex flex-col",
  helperTextClassName = "text-xs text-gray-500 px-1 bg-black/5 mt-1 self-start",
}: SubmitComponentWrapperProps) => {
  return (
    <div className="flex  gap-3 items-start justify-between px-2 ">
      <div className="flex flex-col w-1/2 pt-2">
        <label htmlFor={id} className={labelClass}>
          {label}
          <span className="flex gap-2 items-center justify-start">
            {helperText && (
              <span className={helperTextClassName}>{helperText}</span>
            )}
            {currentElementToValidate === "" && isFormError && (
              <RequiredFieldError requiredStyleClass="mt-1" />
            )}
          </span>
          {required && <span className="text-xs mt-1">{"(req)"}</span>}
        </label>
      </div>
      <div className="w-1/2">{children}</div>
    </div>
  );
};
