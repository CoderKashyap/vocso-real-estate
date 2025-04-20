"use client"

import { useEffect, useRef } from "react"
import type { Project } from "@/lib/types"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

interface MapViewProps {
  projects: Project[]
}

export default function MapView({ projects }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    // Fix for Leaflet icon issue in Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })

    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5) // Default to India's coordinates

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current)
    }

    // Clear existing markers
    if (mapInstanceRef.current) {
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current?.removeLayer(layer)
        }
      })
    }

    // Add markers for projects with coordinates
    const validProjects = projects.filter((p) => p.coordinates && p.coordinates.latitude && p.coordinates.longitude)

    if (validProjects.length > 0) {
      const bounds = L.latLngBounds(validProjects.map((p) => [p.coordinates!.latitude, p.coordinates!.longitude]))

      validProjects.forEach((project) => {
        if (project.coordinates && mapInstanceRef.current) {
          const marker = L.marker([project.coordinates.latitude, project.coordinates.longitude])
            .addTo(mapInstanceRef.current)
            .bindPopup(`
              <div>
                <h3 class="font-bold">${project.name}</h3>
                <p>${project.location}</p>
                <p>${project.priceRange || "Price on request"}</p>
                ${project.builder ? `<p>Builder: ${project.builder}</p>` : ""}
              </div>
            `)
        } 
      })

      // Fit map to bounds of all markers
      if (mapInstanceRef.current) {
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] })
      }
    }

    return () => {
      // Clean up map instance when component unmounts
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [projects])

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden h-full">
      <div className="p-4 bg-gradient-to-r from-indigo-200 to-indigo-100 frpm-indigo-200 border-b">
        <h2 className="font-semibold text-xl text-indigo-900">Project Locations</h2>
      </div>
      <div ref={mapRef} className="h-[550px]"></div>
    </div>
  )
}
