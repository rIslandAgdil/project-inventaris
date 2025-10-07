function Button({ children, type = 'button', onClick, variant = 'primary' }) {
  const base = 'font-semibold py-2 px-4 rounded-md transition w-full';

  const variants = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-800',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary}`}
    >
      {children}
    </button>
  );
}

export default Button;