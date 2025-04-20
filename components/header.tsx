import Link from "next/link"
// import { Building2 } from "lucide-react"


export default function Header() {
  return (
    <header className="bg[#a37cf0] bg-indigo-400 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">

        <Link href="/" className="flex flex-col">
          {/* <Building2 className="h-6 w-6 text-blue-600" /> */}
          <span className="font-semibold text-white md:text-2xl text-xl">Vocso RealEstate Assingment</span>
        </Link>

      </div>
    </header>
  )
}
