import { Link, useLocation } from "react-router-dom"
import { ArrowLeft, Home, RefreshCcw } from "lucide-react"

export default function Error404({ message, showRefresh = true }) {
  const location = useLocation()

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-7xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-semibold tracking-tight">Page Not Found</h2>
          <p className="text-muted-foreground">
            {message || `We couldn't find "${location.pathname}". Please check the URL or navigate back.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
          {showRefresh && (
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <RefreshCcw className="h-4 w-4" />
              Refresh Page
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
