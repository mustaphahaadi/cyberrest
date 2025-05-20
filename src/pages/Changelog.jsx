import { Calendar, ArrowRight } from "lucide-react"

const Changelog = () => {
  const releases = [
    {
      version: "v2.5.0",
      date: "2023-05-15",
      title: "Enhanced Security Training Module",
      description:
        "Major updates to the Security Training module with new interactive courses and certification options.",
      changes: [
        {
          type: "feature",
          description: "Added 5 new interactive security training courses focused on remote work security",
        },
        {
          type: "feature",
          description: "Implemented certification tracking and expiration notifications",
        },
        {
          type: "improvement",
          description: "Enhanced course completion analytics with detailed progress reports",
        },
        {
          type: "improvement",
          description: "Optimized video streaming for better performance on low bandwidth connections",
        },
        {
          type: "fix",
          description: "Fixed an issue where course progress wasn't properly saved in certain scenarios",
        },
      ],
    },
    {
      version: "v2.4.2",
      date: "2023-04-28",
      title: "Bug Fixes and Performance Improvements",
      description: "This release focuses on stability improvements and bug fixes across the platform.",
      changes: [
        {
          type: "fix",
          description:
            "Resolved an issue with the Dark Web Monitor that caused false positives for certain email domains",
        },
        {
          type: "fix",
          description: "Fixed a UI rendering problem in the dashboard on Safari browsers",
        },
        {
          type: "improvement",
          description: "Improved loading times for the Vulnerability Assessment tool by 35%",
        },
        {
          type: "improvement",
          description: "Enhanced API response caching for better performance",
        },
      ],
    },
    {
      version: "v2.4.0",
      date: "2023-04-10",
      title: "Compliance Checker Update",
      description:
        "Major update to the Compliance Checker with support for new regulatory frameworks and enhanced reporting.",
      changes: [
        {
          type: "feature",
          description: "Added support for GDPR, HIPAA, PCI DSS, and SOC 2 compliance frameworks",
        },
        {
          type: "feature",
          description: "Implemented customizable compliance reports with executive summaries",
        },
        {
          type: "feature",
          description: "Added compliance gap analysis with remediation recommendations",
        },
        {
          type: "improvement",
          description: "Enhanced the compliance dashboard with historical tracking and trend analysis",
        },
        {
          type: "improvement",
          description: "Updated compliance requirements database with latest regulatory changes",
        },
      ],
    },
    {
      version: "v2.3.1",
      date: "2023-03-22",
      title: "Device Security Scanner Enhancements",
      description:
        "Updates to the Device Security Scanner with improved detection capabilities and performance optimizations.",
      changes: [
        {
          type: "feature",
          description: "Added detection for 15 new types of IoT device vulnerabilities",
        },
        {
          type: "improvement",
          description: "Enhanced scanning speed by implementing parallel processing for network scans",
        },
        {
          type: "improvement",
          description: "Updated vulnerability database with latest CVEs",
        },
        {
          type: "fix",
          description: "Fixed an issue where certain network configurations would cause incomplete scans",
        },
      ],
    },
    {
      version: "v2.3.0",
      date: "2023-03-05",
      title: "API & Integrations Release",
      description: "New API capabilities and third-party integrations to extend the CyberRest platform.",
      changes: [
        {
          type: "feature",
          description: "Released public API with comprehensive documentation",
        },
        {
          type: "feature",
          description: "Added integrations with Microsoft 365, Google Workspace, and Slack",
        },
        {
          type: "feature",
          description: "Implemented webhook support for real-time event notifications",
        },
        {
          type: "feature",
          description: "Added API key management with granular permission controls",
        },
        {
          type: "improvement",
          description: "Enhanced API rate limiting with tiered access based on subscription level",
        },
      ],
    },
  ]

  const getChangeTypeColor = (type) => {
    switch (type) {
      case "feature":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "improvement":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "fix":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "breaking":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Changelog</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Stay up to date with all the latest changes, improvements, and bug fixes to the CyberRest platform.
        </p>
      </div>

      <div className="space-y-12">
        {releases.map((release, index) => (
          <div key={index} className="relative">
            {index !== releases.length - 1 && (
              <div className="absolute left-8 top-16 h-full w-px bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
            )}

            <div className="relative flex items-start space-x-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 ring-8 ring-white dark:ring-gray-900">
                  <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <div className="min-w-0 flex-1 py-0">
                <div className="bg-white dark:bg-gray-900 shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{release.title}</h2>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {release.version}
                        </p>
                      </div>
                    </div>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <span className="mr-2">{release.date}</span>
                    </p>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{release.description}</p>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                    <div className="space-y-4">
                      {release.changes.map((change, changeIndex) => (
                        <div key={changeIndex} className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex items-center">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getChangeTypeColor(change.type)}`}
                              >
                                {change.type}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{change.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Looking for older releases?</h3>
        <a
          href="/changelog/archive"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          View Release Archive
        </a>
      </div>
    </div>
  )
}

export default Changelog
