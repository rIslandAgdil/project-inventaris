export default function Input({ label, name, type="text", register, readOnly=false, placeholder="", className="", required }) {
  return (
    <div className="space-y-1">
      {label && <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>}
      <input
        id={name}
        type={type}
        {...register(name)}
        required={required}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full border rounded-md px-3 py-2 ${readOnly ? "bg-slate-100 cursor-not-allowed" : ""} ${className}`}
      />
    </div>
  );
}
