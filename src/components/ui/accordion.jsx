import { useState } from "react"

export function Accordion({ children, className = "" }) {
  return <div className={className}>{children}</div>
}

export function AccordionItem({ title, children, className = "" }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b ${className}`}>
      <button className="w-full text-left py-2 font-semibold" onClick={() => setOpen(o => !o)}>
        {title}
      </button>
      {open && <div className="pl-4 pb-2">{children}</div>}
    </div>
  )
}

export function AccordionTrigger({ children, ...props }) {
  return <div {...props}>{children}</div>
}

export function AccordionContent({ children, ...props }) {
  return <div {...props}>{children}</div>
}

export default { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
