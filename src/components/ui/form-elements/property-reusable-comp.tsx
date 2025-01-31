import { LucideIcon, Save, X } from "lucide-react";

interface PropertiesWrapperProps {
  children: React.ReactNode;
}

export const PropertiesWrapper = ({ children }: PropertiesWrapperProps) => (
  <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-5 border border-gray-100">
    {children}
  </div>
);

interface PropertiesHeaderProps {
  title: string;
  description?: string;
  onClose: () => void;
  icon: LucideIcon;
}

export const PropertiesHeader = ({
  title,
  description,
  onClose,
  icon: Icon,
}: PropertiesHeaderProps) => (
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

interface InputTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  placeholder?: string;
  helperText?: string;
  onChange: (value: string) => void;
}

export const InputTile = ({
  icon: Icon,
  label,
  value,
  placeholder,
  helperText,
  onChange,
}: InputTileProps) => (
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

interface RequiredCheckTileProps {
  icon: LucideIcon;
  label: string;
  checked: boolean;
  helperText?: string;
  onChange: (checked: boolean) => void;
}

export const RequiredCheckTile = ({
  icon: Icon,
  label,
  checked,
  helperText,
  onChange,
}: RequiredCheckTileProps) => (
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

interface PropertiesFooterProps {
  onCancel: () => void;
  onSave: () => void;
}

export const PropertiesFooter = ({
  onCancel,
  onSave,
}: PropertiesFooterProps) => (
  <div className="flex gap-3 pt-4 border-t border-gray-150">
    <button
      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      onClick={onCancel}
    >
      <X className="w-4 h-4" />
      Cancel
    </button>
    <button
      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 rounded-lg transition-colors"
      onClick={onSave}
    >
      <Save className="w-4 h-4" />
      Save Changes
    </button>
  </div>
);
