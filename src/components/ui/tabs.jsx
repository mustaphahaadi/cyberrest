import { useState, Children, cloneElement } from "react"

export function Tabs({ defaultValue, children, className = "" }) {
  const [active, setActive] = useState(defaultValue)
  // Pass active and setActive as props to all children
  const childrenWithProps = Children.map(children, (child) => {
    if (!child) return child
    // Only add props to our custom tab components
    if (typeof child.type === "function" && [TabsList, TabsTrigger, TabsContent].includes(child.type)) {
      return cloneElement(child, { active, setActive })
    }
    return child
  })
  return <div className={`space-y-4 ${className}`}>{childrenWithProps}</div>
}

export function TabsList({ children, className = "", ...props }) {
  return <div className={`flex border-b overflow-x-auto ${className}`} {...props}>{children}</div>
}

export function TabsTrigger({ value, active, setActive, children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 -mb-px border-b-2 whitespace-nowrap ${active === value ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"} focus:outline-none hover:text-blue-500 transition-colors ${className}`}
      onClick={() => setActive(value)}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, active, children, className = "", ...props }) {
  if (active !== value) return null
  return <div className={className} {...props}>{children}</div>
}
