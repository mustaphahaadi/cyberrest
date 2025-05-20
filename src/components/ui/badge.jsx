export default function Badge({ children, className = "" }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-semibold ${className}`}>{children}</span>
  )
}
