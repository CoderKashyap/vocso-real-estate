"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const city = searchParams.get("city")

  useEffect(() => {
    if (city) {
      router.push(`/city/${encodeURIComponent(city)}`)
    }
  }, [city, router])

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-lg">Redirecting to {city}...</p>
    </div>
  )
}
