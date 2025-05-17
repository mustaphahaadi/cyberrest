"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Home } from "lucide-react"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-[120px] opacity-10" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[120px] opacity-10" />

      <div className="max-w-md w-full text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative mb-8">
            <div className="text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 leading-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <div className="text-[250px] font-bold text-white leading-none">404</div>
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-slate-400 mb-8"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="outline"
            className="border-slate-700 text-white hover:bg-slate-800"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
            asChild
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxZTI5M2IiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYgMzRoLTJWMTZoMTB2MmgtOHYxNnptLTQtMTdoLTJ2MThoMnYtMTh6bS0xNCA3aC0ydjExaDJ2LTExem0tNyAzaC0ydjhoMnYtOHptMjEgMmgtMnY2aDJ2LTZ6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik0xNyAxOWgtMnYxOGgyVjE5em0xNCAxNGgtMnY0aDJ2LTR6bS03LTZoLTJ2MTBoMlYyN3ptLTctM2gtMnYxM2gyVjI0em0yMSA1aC0ydjhoMnYtOHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-5" />
    </div>
  )
}

export default NotFoundPage
