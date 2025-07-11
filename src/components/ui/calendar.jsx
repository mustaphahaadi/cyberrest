import { useState } from "react"

function Calendar({ value, onChange, className = "" }) {
  const [date, setDate] = useState(value || "")
  return (
    <input
      type="date"
      className={`border rounded px-3 py-2 ${className}`}
      value={date}
      onChange={e => {
        setDate(e.target.value)
        onChange && onChange(e.target.value)
      }}
    />
  )
}

export default Calendar;
export { Calendar };
