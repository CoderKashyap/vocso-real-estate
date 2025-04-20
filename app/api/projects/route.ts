import { NextResponse } from "next/server"
import axios from "axios"
import * as cheerio from "cheerio"

// Removed redundant require statement for cheerio
import { v4 as uuidv4 } from "uuid"

// Get the PositionStack API key from environment variables
const positionStackKey = process.env.POSITIONSTACK_API_KEY



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ message: "City parameter is required" }, { status: 400 })
  }

  try {
    const projects = await scrapeProjects(city)

    // Process projects in batches to avoid rate limiting with PositionStack
    const projectsWithCoordinates = []
    const batchSize = 5

    for (let i = 0; i < projects.length; i += batchSize) {
      const batch = projects.slice(i, i + batchSize)
      const batchWithCoords = await Promise.all(
        batch.map(async (project) => {
          try {
            const coords = await getCoordinates(`${project.location}, ${city}, India`)
            return {
              ...project,
              id: uuidv4(),
              coordinates: coords,
            }
          } catch (error) {
            console.error(`Error getting coordinates for ${project.location}:`, error)
            return {
              ...project,
              id: uuidv4(),
              coordinates: null,
            }
          }
        }),
      )

      projectsWithCoordinates.push(...batchWithCoords)

      // Add a small delay between batches to avoid rate limiting
      if (i + batchSize < projects.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    return NextResponse.json(projectsWithCoordinates)
  } catch (error) {
    console.error("Error processing projects:", error)
    return NextResponse.json({ message: "Failed to fetch or process projects" }, { status: 500 })
  }
}

async function scrapeProjects(city: string) {
  try {
    const { data } = await axios.get(`https://www.magicbricks.com/new-projects-${city}`, {
      // headers: {
      //   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      //   "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      //   "Accept-Language": "en-US,en;q=0.5",
      //   "Accept-Encoding": "gzip, deflate, br",
      //   "Connection": "keep-alive",
      //   "Upgrade-Insecure-Requests": "1",
      //   "Cache-Control": "max-age=0"
      // },
      
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Referer": `https://www.magicbricks.com/`,
        "DNT": "1",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      }

      
    })

    const $ = cheerio.load(data)
    const projects: { name: string; location: string; priceRange: string; builder: string }[] = []

    // Each individual project card
    $(".projdis__newprjs .projdis__prjcard").each((i, elem) => {
      const name = $(elem).find(".mghome__prjblk__prjname").text().trim()
      const location = $(elem).find(".mghome__prjblk__locname").text().trim()
      const priceRange = $(elem).find(".mghome__prjblk__price").text().trim()
      const builder = $(elem).find(".mghome__prjblk__builder").text().trim()  // Builder name not exist but added for assingment guidelines 

      if (name && location) {
        projects.push({ name, location, priceRange, builder })
      }
    })

    return projects
  } catch (err) {
    console.error("Scraping error:", err)
    throw new Error("Failed to scrape projects")
  }
}

async function getCoordinates(location: string) {
  if (!positionStackKey) {
    console.error("PositionStack API key is not defined")
    return null
  }

  const url = `http://api.positionstack.com/v1/forward?access_key=${positionStackKey}&query=${encodeURIComponent(location)}&limit=1`
  // const url = ``

  try {
    const res = await axios.get(url)
    const data = res.data.data[0]

    if (data) {
      return {
        latitude: data.latitude,
        longitude: data.longitude,
      }
    } else {
      return null
    }
  } catch (err) {
    console.error(`Error geocoding ${location}:`, err)
    return null
  }
}
