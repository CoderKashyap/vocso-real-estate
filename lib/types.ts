export interface Project {
  id: string
  name: string
  location: string
  priceRange?: string
  builder?: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export interface ProjectsState {
  projects: Project[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}
