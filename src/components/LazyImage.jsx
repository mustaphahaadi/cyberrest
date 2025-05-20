"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function LazyImage({ src, alt, className, width, height, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setIsLoaded(true)
    img.onerror = () => setError(true)

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  if (error) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`} style={{ width, height }} {...props}>
        <span className="text-muted-foreground text-sm">Failed to load image</span>
      </div>
    )
  }

  return isLoaded ? (
    <img src={src || "/placeholder.svg"} alt={alt} className={className} width={width} height={height} {...props} />
  ) : (
    <Skeleton className={className} style={{ width, height }} />
  )
}
