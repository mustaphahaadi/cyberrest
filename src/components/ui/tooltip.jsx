import { useState } from "react"

export default function Tooltip({ children, content, className = "" }) {
  const [show, setShow] = useState(false)
  return (
    <span className={`relative ${className}`} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black text-white text-xs rounded shadow">
          {content}
        </span>
      )}
    </span>
  )
}
