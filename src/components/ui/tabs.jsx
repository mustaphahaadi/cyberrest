import { useState } from "react"

export function Tabs({ defaultValue, children, className = "" }) {
  const [active, setActive] = useState(defaultValue)
  return <div className={className}>{children({ active, setActive })}</div>
}

export function TabsList({ children, className = "" }) {
  return <div className={`flex border-b ${className}`}>{children}</div>
}

export function TabsTrigger({ value, active, setActive, children, className = "" }) {
  return (
    <button
      className={`px-4 py-2 -mb-px border-b-2 ${active === value ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"} focus:outline-none ${className}`}
      onClick={() => setActive(value)}
      type="button"
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, active, children, className = "" }) {
  if (active !== value) return null
  return <div className={className}>{children}</div>
}

export default { Tabs, TabsList, TabsTrigger, TabsContent }
