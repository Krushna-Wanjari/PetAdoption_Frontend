function PrimaryButton({ text, type = "submit", disabled = false, loading = false }) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className="
      w-full
      bg-orange-600
      text-white
      py-3
      rounded-full
      font-semibold
      transition-all
      duration-300
      hover:bg-orange-700
      hover:scale-105
      disabled:opacity-60
      disabled:cursor-not-allowed
      disabled:hover:scale-100
      "
    >
      {loading ? "Please wait..." : text}
    </button>
  );
}

export default PrimaryButton;
