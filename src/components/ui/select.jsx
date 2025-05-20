import { useState } from "react"

export function Select({ options = [], value, onChange, className = "" }) {
  return (
    <select className={`border rounded px-3 py-2 ${className}`} value={value} onChange={e => onChange(e.target.value)}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}

export default Select
