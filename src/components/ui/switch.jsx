import { useState } from "react"

export default function Switch({ checked, onChange, className = "" }) {
  const [isChecked, setIsChecked] = useState(!!checked)
  const handleChange = (e) => {
    setIsChecked(e.target.checked)
    onChange && onChange(e.target.checked)
  }
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input type="checkbox" className="sr-only" checked={isChecked} onChange={handleChange} />
      <span className={`w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 ${isChecked ? "bg-blue-500" : ""}`}>
        <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${isChecked ? "translate-x-4" : ""}`}></span>
      </span>
    </label>
  )
}
