<<<<<<< HEAD
function Input({ name, value, onChange, placeholder, required, readOnly }) {
  return (
    <input
      type="text"
=======
function Input({
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  readOnly,
}) {
  return (
    <input
      type={type}
>>>>>>> 2f180cff7db0748a515b957ed1878c21df97605b
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
<<<<<<< HEAD
      className={`p-2 border rounded w-full ${readOnly ? 'bg-gray-100 text-gray-500' : ''}`}
=======
      className={`px-2 py-3 tracking-wide font-light w-full outline-none ${
        readOnly ? "bg-gray-100 text-gray-500" : ""
      }`}
>>>>>>> 2f180cff7db0748a515b957ed1878c21df97605b
    />
  );
}

export default Input;
