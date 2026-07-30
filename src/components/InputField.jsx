import { forwardRef } from "react";

const InputField = forwardRef(function InputField(
  { label, type, placeholder, icon, error, ...rest },
  ref
) {
  return (
    <div>
      <label className="font-semibold text-gray-700">{label}</label>

      <div
        className={`mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 ${
          error
            ? "border-red-400 focus-within:ring-red-400"
            : "focus-within:ring-orange-500"
        }`}
      >
        <span className="text-gray-400">{icon}</span>

        <input
          ref={ref}
          className="w-full ml-3 outline-none"
          type={type}
          placeholder={placeholder}
          {...rest}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

export default InputField;
