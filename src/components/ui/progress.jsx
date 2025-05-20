// Simple Progress Bar component
export default function Progress({ value = 0, max = 100, className = "" }) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(value / max) * 100}%` }} />
    </div>
  )
}
