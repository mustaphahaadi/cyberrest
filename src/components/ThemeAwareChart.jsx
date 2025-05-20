"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto"

const ThemeAwareChart = ({ type, data, options = {}, height = 300, width = 500, className }) => {
  const { theme, isDarkTheme } = useTheme()
  const chartRef = useRef(null)
  const [chartInstance, setChartInstance] = useState(null)

  // Theme-aware colors
  const getThemeColors = () => {
    if (isDarkTheme) {
      return {
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)", // blue
          "rgba(16, 185, 129, 0.7)", // green
          "rgba(249, 115, 22, 0.7)", // orange
          "rgba(139, 92, 246, 0.7)", // purple
          "rgba(236, 72, 153, 0.7)", // pink
          "rgba(245, 158, 11, 0.7)", // amber
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(245, 158, 11, 1)",
        ],
        gridColor: "rgba(255, 255, 255, 0.1)",
        textColor: "rgba(255, 255, 255, 0.7)",
      }
    } else {
      return {
        backgroundColor: [
          "rgba(59, 130, 246, 0.5)",
          "rgba(16, 185, 129, 0.5)",
          "rgba(249, 115, 22, 0.5)",
          "rgba(139, 92, 246, 0.5)",
          "rgba(236, 72, 153, 0.5)",
          "rgba(245, 158, 11, 0.5)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(245, 158, 11, 1)",
        ],
        gridColor: "rgba(0, 0, 0, 0.1)",
        textColor: "rgba(0, 0, 0, 0.7)",
      }
    }
  }

  // Apply theme to chart data
  const applyThemeToData = (chartData) => {
    const colors = getThemeColors()

    if (chartData.datasets) {
      chartData.datasets = chartData.datasets.map((dataset, index) => {
        const colorIndex = index % colors.backgroundColor.length

        return {
          ...dataset,
          backgroundColor: dataset.backgroundColor || colors.backgroundColor[colorIndex],
          borderColor: dataset.borderColor || colors.borderColor[colorIndex],
        }
      })
    }

    return chartData
  }

  // Apply theme to chart options
  const applyThemeToOptions = (chartOptions) => {
    const colors = getThemeColors()

    return {
      ...chartOptions,
      scales: {
        ...chartOptions.scales,
        x: {
          ...chartOptions.scales?.x,
          grid: {
            ...chartOptions.scales?.x?.grid,
            color: colors.gridColor,
          },
          ticks: {
            ...chartOptions.scales?.x?.ticks,
            color: colors.textColor,
          },
        },
        y: {
          ...chartOptions.scales?.y,
          grid: {
            ...chartOptions.scales?.y?.grid,
            color: colors.gridColor,
          },
          ticks: {
            ...chartOptions.scales?.y?.ticks,
            color: colors.textColor,
          },
        },
      },
      plugins: {
        ...chartOptions.plugins,
        legend: {
          ...chartOptions.plugins?.legend,
          labels: {
            ...chartOptions.plugins?.legend?.labels,
            color: colors.textColor,
          },
        },
        tooltip: {
          ...chartOptions.plugins?.tooltip,
          backgroundColor: isDarkTheme ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
          titleColor: isDarkTheme ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)",
          bodyColor: isDarkTheme ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
          borderColor: isDarkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance) {
        chartInstance.destroy()
      }

      // Apply theme to data and options
      const themedData = applyThemeToData(data)
      const themedOptions = applyThemeToOptions(options)

      // Create new chart
      const newChartInstance = new Chart(chartRef.current, {
        type,
        data: themedData,
        options: themedOptions,
      })

      setChartInstance(newChartInstance)
    }

    // Cleanup on unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy()
      }
    }
  }, [type, data, options, theme])

  return (
    <div className={className}>
      <canvas ref={chartRef} height={height} width={width} />
    </div>
  )
}

export default ThemeAwareChart
