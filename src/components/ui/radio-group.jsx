import { useState } from "react"

export function RadioGroup({ options = [], value, onChange, className = "" }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {options.map(opt => (
        <label key={opt.value} className="inline-flex items-center gap-2">
          <input
            type="radio"
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  )
}

export default RadioGroup
