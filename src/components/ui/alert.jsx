export default function Alert({ children, type = "info", className = "" }) {
  const color = type === "error" ? "bg-red-100 text-red-800" : type === "success" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
  return (
    <div className={`rounded px-4 py-3 ${color} ${className}`} role="alert">
      {children}
    </div>
  )
}
