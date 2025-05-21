import { useState, useRef, useEffect } from "react"

function Popover({ trigger, children, className = "" }) {
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

function PopoverContent({ children, className = "" }) {
  return (
    <div className={`bg-white border rounded shadow-lg p-2 min-w-[120px] ${className}`}>
      {children}
    </div>
  );
}

function PopoverTrigger({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export default Popover;
export { Popover, PopoverContent, PopoverTrigger };
