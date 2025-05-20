import { cn } from "../lib/utils"

const sizes = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
}

const LoadingSpinner = ({ size = "md", className, ...props }) => {
  return (
    <div className="flex items-center justify-center" {...props}>
      <div className={cn("relative", sizes[size], className)}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-b-transparent border-l-cyan-500 border-r-purple-500 animate-spin"></div>

        {/* Inner ring */}
        <div className="absolute inset-1 rounded-full border-2 border-t-transparent border-b-transparent border-r-cyan-500 border-l-purple-500 animate-spin-reverse"></div>

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
