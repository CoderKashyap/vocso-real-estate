"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchProjects } from "@/lib/features/projects/projectsSlice"
import ProjectList from "@/components/project-list"
import MapView from "@/components/map-view"
import LoadingSpinner from "@/components/loading-spinner"
import ErrorDisplay from "@/components/error-display"

export default function CityPage() {
  const { cityName } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { projects, status, error } = useSelector((state: RootState) => state.projects)

  useEffect(() => {
    if (cityName && typeof cityName === "string") {
      dispatch(fetchProjects(cityName))
    }
  }, [dispatch, cityName])

  if (!cityName || typeof cityName !== "string") { 
    return <ErrorDisplay message="Invalid city name" />
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Real Estate Projects in {cityName}</h1>

      {status === "loading" && <LoadingSpinner />}
      {status === "failed" && <ErrorDisplay message={error || "Failed to load projects"} />}

      {status !== "loading" && projects.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProjectList projects={projects} />
          </div>
          <div className="lg:col-span-2 h-[600px] sticky top-4">
            <MapView projects={projects} />
          </div>
        </div>
      )}

      {status === "succeeded" && projects.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No projects found</h2>
          <p className="text-gray-600">We couldn't find any real estate projects in {cityName}.</p>
        </div>
      )}
    </div>
  )
}
