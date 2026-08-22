function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div className="mb-5">
      <label className="block text-gray-700 font-medium mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-4
          py-3
          border
          border-gray-300
          rounded-xl
          outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:border-indigo-500
          transition
        "
      />
    </div>
  );
}

export default Input;