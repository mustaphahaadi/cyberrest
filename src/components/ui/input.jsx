export default function Input({ type = "text", value, onChange, className = "", ...props }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`border rounded px-3 py-2 ${className}`}
      {...props}
    />
  )
}
