import { useState } from "react";

function PetImage({ src, alt, className = "", ...props }) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center text-gray-400 ${className}`}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 opacity-40"
        >
          <path d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm6 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm8.5 7.5-3.5-2.1a1 1 0 0 0-1.2.2L12 16l-2.3-2a1 1 0 0 0-1.2.1L4 18V6h16l-3.5 10.5Z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={className}
      {...props}
    />
  );
}

export default PetImage;
