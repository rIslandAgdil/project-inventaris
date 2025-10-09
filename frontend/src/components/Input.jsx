export default function Input({ label, name, type="text", value, onChange, readOnly=false, required=false, placeholder="", className="" }) {
  return (
    <div className="space-y-1">
      {label && <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}      // controlled
        onChange={onChange}      // controlled
        readOnly={readOnly}
        required={required}
        placeholder={placeholder}
        className={`w-full border rounded-md px-3 py-2 ${readOnly ? "bg-slate-100 cursor-not-allowed" : ""} ${className}`}
      />
    </div>
  );
}
