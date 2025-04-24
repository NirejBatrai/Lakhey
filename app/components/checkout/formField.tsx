// Properly implemented FormField component for Next.js
interface FormFieldProps {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    type?: string;
    maxLength?: number;
  }
  
  const FormField: React.FC<FormFieldProps> = ({
    name,
    label,
    value,
    onChange,
    error,
    type = "text",
    maxLength,
  }) => {
    return (
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-black mb-1"
        >
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={`w-full px-4 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md text-black`}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  };
  
  export default FormField;