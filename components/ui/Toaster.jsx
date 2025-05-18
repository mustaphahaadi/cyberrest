"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

// Simple toast store
const toasts = []
let listeners = []

export function toast({ title, description, type = "default", duration = 3000 }) {
  const id = Math.random().toString(36).substring(2, 9)
  const toast = { id, title, description, type, duration }

  toasts.push(toast)
  listeners.forEach((listener) => listener(toasts))

  setTimeout(() => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.splice(index, 1)
      listeners.forEach((listener) => listener([...toasts]))
    }
  }, duration)
}

export function useToast() {
  return { toast }
}

export function Toaster() {
  const [localToasts, setLocalToasts] = useState([])

  useEffect(() => {
    listeners.push(setLocalToasts)
    return () => {
      listeners = listeners.filter((listener) => listener !== setLocalToasts)
    }
  }, [])

  function removeToast(id) {
    const index = toasts.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.splice(index, 1)
      listeners.forEach((listener) => listener([...toasts]))
    }
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 md:max-w-[420px]">
      {localToasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex w-full items-start gap-4 rounded-lg border p-4 shadow-lg",
            "bg-background text-foreground",
            "data-[type=success]:border-green-500 data-[type=success]:bg-green-50 data-[type=success]:text-green-900 dark:data-[type=success]:bg-green-950 dark:data-[type=success]:text-green-100",
            "data-[type=error]:border-red-500 data-[type=error]:bg-red-50 data-[type=error]:text-red-900 dark:data-[type=error]:bg-red-950 dark:data-[type=error]:text-red-100",
            "data-[type=warning]:border-yellow-500 data-[type=warning]:bg-yellow-50 data-[type=warning]:text-yellow-900 dark:data-[type=warning]:bg-yellow-950 dark:data-[type=warning]:text-yellow-100",
            "data-[type=info]:border-blue-500 data-[type=info]:bg-blue-50 data-[type=info]:text-blue-900 dark:data-[type=info]:bg-blue-950 dark:data-[type=info]:text-blue-100",
          )}
          data-type={toast.type}
        >
          <div className="flex-1">
            {toast.title && <div className="font-medium">{toast.title}</div>}
            {toast.description && <div className="mt-1 text-sm opacity-90">{toast.description}</div>}
          </div>
          <button onClick={() => removeToast(toast.id)} className="rounded-md p-1 hover:bg-accent">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
