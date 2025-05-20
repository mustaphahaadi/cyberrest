import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function SecurityScoreCard({ score = 0, issues = [], loading = false }) {
  const getScoreColor = () => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBackground = () => {
    if (score >= 80) return "bg-green-100 dark:bg-green-900/30"
    if (score >= 60) return "bg-yellow-100 dark:bg-yellow-900/30"
    return "bg-red-100 dark:bg-red-900/30"
  }

  const getScoreIcon = () => {
    if (score >= 80) return <CheckCircle className="h-6 w-6 text-green-500" />
    if (score >= 60) return <AlertTriangle className="h-6 w-6 text-yellow-500" />
    return <AlertTriangle className="h-6 w-6 text-red-500" />
  }

  const getScoreText = () => {
    if (score >= 80) return "Good"
    if (score >= 60) return "Fair"
    return "Poor"
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-500" />
            Security Score
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getScoreBackground()}`}>{getScoreText()}</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="relative">
                <svg className="w-32 h-32">
                  <circle
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className={getScoreColor()}
                    strokeWidth="10"
                    strokeDasharray={360}
                    strokeDashoffset={360 - (score / 100) * 360}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className={`text-3xl font-bold ${getScoreColor()}`}>{score}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 block">/100</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">Security Status:</span>
                <span className="font-medium flex items-center">
                  {getScoreIcon()}
                  <span className="ml-1">{getScoreText()}</span>
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">Issues Found:</span>
                <span className="font-medium">{issues.length}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">Last Scan:</span>
                <span className="font-medium">Today, 2:30 PM</span>
              </div>
            </div>

            <div className="mt-4">
              <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Improve Score
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
