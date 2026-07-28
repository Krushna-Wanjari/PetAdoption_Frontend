

function PrimaryButton({ text }) {
  return (
    <button
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
      "
    >
      {text}
    </button>
  );
}

export default PrimaryButton;