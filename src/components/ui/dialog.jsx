import { useState } from "react"

function Dialog({ open, onClose, children, className = "" }) {
  if (!open) return null
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${className}`} onClick={onClose}>
      <div className="bg-white rounded shadow-lg p-6" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

function DialogContent({ children, className = "" }) {
  return <div className={`bg-white rounded shadow-lg p-6 ${className}`}>{children}</div>;
}

function DialogDescription({ children, className = "" }) {
  return <p className={`text-gray-600 text-sm ${className}`}>{children}</p>;
}

function DialogFooter({ children, className = "" }) {
  return <div className={`flex justify-end gap-2 mt-4 ${className}`}>{children}</div>;
}

function DialogHeader({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

function DialogTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

function DialogTrigger({ children, onClick, className = "" }) {
  return (
    <button 
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export default Dialog;
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger };
