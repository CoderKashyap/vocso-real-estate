import Link from "next/link"
import { Building2, MapPin } from "lucide-react"

const popularCities = [
  { name: "Mumbai", slug: "Mumbai" },
  { name: "Delhi", slug: "Delhi" },
  { name: "Bangalore", slug: "Bangalore" },
  { name: "Hyderabad", slug: "Hyderabad" },
  { name: "Pune", slug: "Pune" },
  { name: "Noida", slug: "Noida" },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 pt-8">
      {/* <section className="text-center">
        <h1 className="text-3xl font-bold mb-4">Find Real Estate Projects</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore real estate projects across major cities in India with our interactive map and detailed listings.
        </p>
      </section> */}


      <section className="bg-indigo-50 rounded-2xl shadow-lg md:py-12 py-6 px-6 text-center md:my-6 mx-2 md:mx-auto md:max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Looking for Real Estate Projects?
        </h2>
        <p className="text-gray-600 mb-6">
          Search by city to explore the best properties near you.
        </p>
        <form action="/search" className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text" 
            name="city"
            placeholder="Enter city name..."
            className="w-full sm:flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all shadow-md"
          >
            Search
          </button>
        </form>
      </section>



      <section className="m-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Popular Cities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {popularCities.map((city) => (
            <Link
              href={`/city/${city.slug}`}
              key={city.slug}
              className="bg-white rounded-lg shadow-md rounded-xl hover:shadow-lg transition-shadow p-6 flex flex-col items-center"
            >
              <Building2 size={48} className="text-indigo-600 mb-4" />
              <h3 className="text-xl font-medium">{city.name}</h3>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin size={16} className="mr-1" />
                <span>View Projects</span>
              </div>
            </Link>
          ))}
        </div>
      </section>


    </div>
  )
}










      {/* <section className="bg-indigo-50 rounded-lg py-8 text-center my-8">
        <h2 className="text-2xl font-semibold mb-4">Looking for Real estate projects?</h2>
        <div className="max-w-md mx-auto">
          <form action="/search" className="flex">
            <input
              type="text"
              name="city"
              placeholder="Enter city name..."
              className="flex-grow px-4 py-2 rounded-l-lg border-y border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section> */}