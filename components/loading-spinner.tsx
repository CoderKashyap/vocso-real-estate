export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        <div
          className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-200 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Loading Projects</h3>
        <p className="mt-1 text-sm text-gray-500">Please wait while we fetch the latest real estate projects...</p>
      </div>
      <div className="mt-4 w-64 bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full animate-progress"></div>
      </div>
    </div>
  )
}
