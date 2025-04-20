"use client"

import { AlertCircle } from "lucide-react"

interface ErrorDisplayProps {
  message: string
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-red-800">Error</h3>
          <div className="mt-2 text-red-700">
            <p>{message}</p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
