import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Project, ProjectsState } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"

const initialState: ProjectsState = {
  projects: [],
  status: "idle",
  error: null,
}

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async (cityName: string) => {
  const response = await fetch(`/api/projects?city=${encodeURIComponent(cityName)}`)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to fetch projects")
  }
  return await response.json()
})

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded"
        // Add unique IDs to projects if they don't have them
        state.projects = action.payload.map((project: Omit<Project, "id">) => ({
          ...project,
          id: uuidv4(),
        }))
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Unknown error occurred"
      })
  },
})

export const { addProject } = projectsSlice.actions
export default projectsSlice.reducer
