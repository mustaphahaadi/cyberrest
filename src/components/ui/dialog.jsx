import { useState } from "react"

export default function Dialog({ open, onClose, children, className = "" }) {
  if (!open) return null
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${className}`} onClick={onClose}>
      <div className="bg-white rounded shadow-lg p-6" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
