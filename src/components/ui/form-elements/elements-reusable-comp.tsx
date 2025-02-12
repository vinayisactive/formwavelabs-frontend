import { LucideIcon, Save, X } from "lucide-react";
import { GripVertical } from "lucide-react";

interface ElementLayerTileProps {
  label: string;
  typeLabel: string;
}

interface SettingWrapperProps {
  children: React.ReactNode;
}

interface SettingHeaderProps {
  title: string;
  description?: string;
  onClose: () => void;
  icon: LucideIcon;
}

interface InputTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  placeholder?: string;
  helperText?: string;
  onChange: (value: string) => void;
}

interface RequiredCheckTileProps {
  icon: LucideIcon;
  label: string;
  checked: boolean;
  helperText?: string;
  onChange: (checked: boolean) => void;
}

interface SettingFooterProps {
  onCancel: () => void;
  onSave: () => void;
}

interface SelectTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  placeholder?: string;
  helperText?: string;
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
  errorLable?: string
}


export const ElementLayerTile= ({ label, typeLabel }: ElementLayerTileProps) => {
  return (
    <div className="cursor-grab hover:shadow-sm transition-all">
      <div className="flex items-center gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground/50" />
        <div className="flex flex-col">
          <span className="text-xs font-medium text-foreground/80 overflow-hidden">
            {label.slice(0, 10)}...
          </span>
          <span className="text-[0.7rem] text-muted-foreground">{typeLabel}</span>
        </div>
      </div>
    </div>
  );
};

export const SettingWrapper = ({ children }: SettingWrapperProps) => (
  <div className="w-full p-4 space-y-5 max-w-lg mx-auto bg-white border rounded-lg">{children}</div>
);

export const SettingHeader = ({title, description, onClose, icon: Icon }: SettingHeaderProps) => (
  <div className="flex items-center justify-between pb-4 border-b border-gray-150">
    <div className="flex items-center space-x-3">
      <Icon className="w-5 h-5 text-gray-600" />
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
    <button
      onClick={onClose}
      className="p-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-600"
    >
      <X className="w-5 h-5" />
    </button>
  </div>
);

export const InputTile = ({icon: Icon, label, value, placeholder, helperText, onChange}: InputTileProps) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-150">
    <div className="flex items-center space-x-2 mb-3">
      <Icon className="w-4 h-4 text-gray-500" />
      <label className="text-sm font-medium text-gray-700">{label}</label>
    </div>
    <input
      type="text"
      className="w-full p-2 rounded-md bg-white border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
    {helperText && <p className="mt-2 text-xs text-gray-400">{helperText}</p>}
  </div>
);

export const RequiredCheckTile = ({ icon: Icon, label, checked, helperText, onChange }: RequiredCheckTileProps) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-150">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Icon className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
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
    {helperText && <p className="mt-2 text-xs text-gray-400">{helperText}</p>}
  </div>
);

export const SettingFooter = ({onCancel, onSave}: SettingFooterProps) => (
  <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-gray-150">
    <button
      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      onClick={onCancel}
    >
      <X className="w-4 h-4" />
      Cancel
    </button>
    <button
      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-900 rounded-lg transition-colors"
      onClick={onSave}
    >
      <Save className="w-4 h-4" />
      Save Changes
    </button>
  </div>
);

export const RequiredFieldError = ({errorLable}: {errorLable?: string}) => {
  return (
    <div className="text-[12px] py-1 text-red-400">{errorLable ? errorLable : "Field is required" } </div>
  );
};

export const SelectTile = ({icon: Icon, label, value, placeholder = "Select an option", helperText, options, onChange }: SelectTileProps) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-150">
    <div className="flex items-center space-x-2 mb-3">
      <Icon className="w-4 h-4 text-gray-500" />
      <label className="text-sm font-medium text-gray-700">{label}</label>
    </div>
    <select
      className="w-full p-2 rounded-md bg-white border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-sm appearance-none"
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
    {helperText && <p className="mt-2 text-xs text-gray-400">{helperText}</p>}
  </div>
);

export const SubmitComponentWrapper = ({id, label, required, helperText, currentElementToValidate, isFormError, children, labelClass = "text-xl text-black", helperTextClassName = "text-xs text-gray-500 px-2 bg-black/5 mt-1",errorLable = "Field is required"}: SubmitComponentWrapperProps) => {
  return (
    <div className="flex flex-col gap-1 p-2 border-black items-start">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-red-500 ml-1"></span>}
      </label>

      {children}

      {helperText && <span className={helperTextClassName}>{helperText}</span>}

      {currentElementToValidate === "" && isFormError && <RequiredFieldError errorLable={errorLable}/>}
    </div>
  );
};

export const SplitSubmitComponentWrapper = ({id, label, required, helperText, currentElementToValidate, isFormError, children, labelClass = "md:text-xl text-black flex flex-col", helperTextClassName = "text-xs text-gray-500 px-1 bg-black/5 mt-1 self-start",}: SubmitComponentWrapperProps) => {
  return (
    <div className="flex  gap-3 p-2 border-black items-start justify-between ">
      <div className="flex flex-col w-1/2 pt-2">
        <label htmlFor={id} className={labelClass}>
          {label}
          {helperText && (
            <span className={helperTextClassName}>{helperText}</span>
          )}
          {required && <span className="text-red-500 ml-1"></span>}
          {currentElementToValidate === "" && isFormError && (
            <RequiredFieldError />
          )}
        </label>
      </div>
      <div className="w-1/2">{children}</div>
    </div>
  );
};