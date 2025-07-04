import { cn } from "../../lib/utils"

function Skeleton({ className, ...props }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

export default Skeleton
export { Skeleton }
