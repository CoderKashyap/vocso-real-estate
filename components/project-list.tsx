// "use client"

// import { useState } from "react"
// import type { Project } from "@/lib/types"
// import { MapPin, IndianRupee, User } from "lucide-react"

// interface ProjectListProps {
//   projects: Project[]
// }

// export default function ProjectList({ projects }: ProjectListProps) {
//   const [selectedId, setSelectedId] = useState<string | null>(null)

//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       <div className="p-4 bg-indigo-50 border-b">
//         <h2 className="font-semibold text-lg">Projects ({projects.length})</h2>
//       </div>
//       <div className="overflow-y-auto max-h-[550px]">
//         {projects.map((project) => (
//           <div
//             key={project.id}
//             className={`p-4 border-b hover:bg-indigo-50 cursor-pointer transition-colors ${
//               selectedId === project.id ? "bg-indigo-50" : ""
//             }`}
//             onClick={() => setSelectedId(project.id)}
//           >
//             <h3 className="font-medium text-lg mb-2">{project.name}</h3>
//             <div className="space-y-2 text-sm">
//               <div className="flex items-start">
//                 <MapPin size={16} className="mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
//                 <span className="text-gray-700">{project.location}</span>
//               </div>
//               <div className="flex items-center">
//                 <IndianRupee size={16} className="mr-2 text-gray-500 flex-shrink-0" />
//                 <span className="text-gray-700">{project.priceRange || "Price on request"}</span>
//               </div>
//               {project.builder && (
//                 <div className="flex items-center">
//                   <User size={16} className="mr-2 text-gray-500 flex-shrink-0" />
//                   <span className="text-gray-700">{project.builder}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }



"use client"

import { useState } from "react"
import type { Project } from "@/lib/types"
import { MapPin, IndianRupee, User } from "lucide-react"

interface ProjectListProps {
  projects: Project[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      <div className="p-4 bg-gradient-to-r from-indigo-100 to-indigo-200 border-b">
        <h2 className="font-semibold text-xl text-indigo-900">Projects ({projects.length})</h2>
      </div>

      <div className="overflow-y-auto max-h-[550px]">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedId(project.id)}
            className={`group cursor-pointer transition-all duration-200 ease-in-out hover:bg-indigo-100 ${
              selectedId === project.id ? "bg-indigo-50 border-l-4 border-indigo-500" : ""
            }`}
          >
            <div className="p-4 transition-all">
              <h3 className="font-semibold text-lg text-indigo-800 group-hover:text-indigo-900 mb-2">
                {project.name}
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-start text-gray-600">
                  <MapPin size={16} className="mr-2 text-indigo-500 mt-0.5" />
                  <span>{project.location}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <IndianRupee size={16} className="mr-2 text-indigo-500" />
                  <span>{project.priceRange || "Price on request"}</span>
                </div>

                {project.builder && (
                  <div className="flex items-center text-gray-600">
                    <User size={16} className="mr-2 text-indigo-500" />
                    <span>{project.builder}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
