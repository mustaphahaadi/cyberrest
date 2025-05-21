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

export function RadioGroupItem({ value, checked, onChange, children, className = "" }) {
  return (
    <label className={`inline-flex items-center gap-2 ${className}`}>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4"
      />
      {children}
    </label>
  );
}

export default RadioGroup
