export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">About RealEstateMap</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          RealEstateMap aims to provide comprehensive and up-to-date information about real estate projects across
          India. We aggregate data from various sources to help you make informed decisions about property investments.
        </p>
        <p className="text-gray-700">
          Our interactive maps and detailed project listings give you a clear picture of the real estate landscape in
          your city of interest.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Select a city from our homepage or search for your desired location</li>
          <li>Browse through the list of available real estate projects</li>
          <li>View project details including location, price range, and builder information</li>
          <li>Explore the interactive map to see the geographical distribution of projects</li>
          <li>Click on map markers for quick project information</li>
        </ol>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Data Sources</h2>
        <p className="text-gray-700 mb-4">
          The information displayed on RealEstateMap is collected from publicly available sources including real estate
          websites, builder websites, and property listings.
        </p>
        <p className="text-gray-700">
          While we strive to provide accurate and up-to-date information, we recommend verifying project details
          directly with developers or real estate agents before making any investment decisions.
        </p>
      </div>
    </div>
  )
}
