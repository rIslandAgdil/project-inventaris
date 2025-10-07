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
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
      className={`px-2 py-3 tracking-wide font-light w-full outline-none ${
        readOnly ? "bg-gray-100 text-gray-500" : ""
      }`}
    />
  );
}

export default Input;
