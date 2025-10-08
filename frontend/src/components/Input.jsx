function Input({
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  readOnly,
  className,
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
      className={`p-2 border rounded w-full ${className} ${
        readOnly ? "bg-gray-100 text-gray-500" : ""
      }`}
    />
  );
}

export default Input;
