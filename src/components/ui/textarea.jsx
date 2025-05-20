export default function Textarea({ value, onChange, className = "", ...props }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`border rounded px-3 py-2 ${className}`}
      {...props}
    />
  )
}
