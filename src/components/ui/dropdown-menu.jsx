import { useState, useRef, useEffect } from "react"

export function DropdownMenu({ trigger, children, className = "" }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  return (
    <div className={`relative inline-block ${className}`} ref={ref}>
      <span onClick={() => setOpen(o => !o)}>{trigger}</span>
      {open && (
        <div className="absolute z-10 mt-2 bg-white border rounded shadow-lg p-2 min-w-[120px]">
          {children}
        </div>
      )}
    </div>
  )
}

export function DropdownMenuItem({ children, onClick, className = "" }) {
  return (
    <div className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default { DropdownMenu, DropdownMenuItem }
