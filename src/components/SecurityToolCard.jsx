"use client"

export default function SecurityToolCard({
  title,
  description,
  icon: Icon,
  color = "blue",
  onClick,
  disabled = false,
}) {
  const getColorClasses = () => {
    switch (color) {
      case "red":
        return "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
      case "green":
        return "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
      case "yellow":
        return "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "purple":
        return "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
      case "indigo":
        return "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300"
      default:
        return "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
    }
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-all duration-200 ${
        disabled ? "opacity-60 cursor-not-allowed" : "hover:shadow-md cursor-pointer"
      }`}
      onClick={disabled ? undefined : onClick}
    >
      <div className="p-6">
        <div className="flex items-start">
          <div className={`flex-shrink-0 rounded-md p-3 ${getColorClasses()}`}>
            {Icon && <Icon className="h-6 w-6" />}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          </div>
        </div>
        {disabled && (
          <div className="mt-4 flex items-center justify-center rounded-md bg-gray-50 dark:bg-gray-700 py-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Upgrade to access</span>
          </div>
        )}
      </div>
    </div>
  )
}
