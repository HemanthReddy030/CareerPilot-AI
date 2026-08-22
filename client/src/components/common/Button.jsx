function Button({
  text,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        bg-indigo-600
        hover:bg-indigo-700
        text-white
        font-semibold
        py-3
        rounded-xl
        transition
        duration-300
        disabled:bg-gray-400
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {text}
    </button>
  );
}

export default Button;