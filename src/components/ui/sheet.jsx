import { useState, useRef, useEffect } from "react"

export function Sheet({ children, className = "" }) {
  return <div className={className}>{children}</div>
}

export function SheetTrigger({ children, onClick, className = "" }) {
  return <button className={className} onClick={onClick}>{children}</button>
}

export function SheetContent({ children, className = "" }) {
  return <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 ${className}`}>{children}</div>
}

export function SheetHeader({ children, className = "" }) {
  return <div className={className}>{children}</div>
}

export function SheetTitle({ children, className = "" }) {
  return <h2 className={className}>{children}</h2>
}

export function SheetDescription({ children, className = "" }) {
  return <p className={className}>{children}</p>
}

export function SheetClose({ children, onClick, className = "" }) {
  return <button className={className} onClick={onClick}>{children}</button>
}
