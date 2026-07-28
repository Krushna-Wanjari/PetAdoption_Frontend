function InputField({
  label,
  type,
  placeholder,
  icon
}) {
  return (
    <div>

      <label className="font-semibold text-gray-700">
        {label}
      </label>

      <div
        className="
        mt-2
        flex
        items-center
        border
        rounded-xl
        px-4
        py-3
        focus-within:ring-2
        focus-within:ring-orange-500
        "
      >
        <span className="text-gray-400">
          {icon}
        </span>

        <input
          className="w-full ml-3 outline-none"
          type={type}
          placeholder={placeholder}
        />
      </div>

    </div>
  );
}

export default InputField;