"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, CheckCircle, Info, XCircle, X } from "lucide-react"
import { cn } from "../lib/utils"

const variants = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    textColor: "text-green-500",
    iconColor: "text-green-500",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    textColor: "text-red-500",
    iconColor: "text-red-500",
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    textColor: "text-yellow-500",
    iconColor: "text-yellow-500",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    textColor: "text-blue-500",
    iconColor: "text-blue-500",
  },
}

const AlertBanner = ({ type = "info", title, message, dismissible = true, className, onDismiss, ...props }) => {
  const [isVisible, setIsVisible] = useState(true)
  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = variants[type]

  const handleDismiss = () => {
    setIsVisible(false)
    if (onDismiss) onDismiss()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("rounded-lg border p-4", bgColor, borderColor, className)}
          {...props}
        >
          <div className="flex items-start gap-3">
            <div className={cn("mt-0.5", iconColor)}>
              <Icon className="h-5 w-5" />
            </div>

            <div className="flex-1">
              {title && <h5 className={cn("font-medium mb-1", textColor)}>{title}</h5>}

              <div className="text-sm text-slate-300">{message}</div>
            </div>

            {dismissible && (
              <button
                onClick={handleDismiss}
                className="text-slate-400 hover:text-slate-300 transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AlertBanner
