"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Searchbar from "./Searchbar";

const getTabs = (subjectId?: string) => {
  if (subjectId) {
    return [
      { name: "Análisis", path: `/dashboard/subjectdata/${subjectId}` },
      { name: "Información", path: `/dashboard/subjectdata/${subjectId}/info` }
    ];
  }
  
  return [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Asignaturas", path: "/dashboard/subjectdata" }
  ];
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Check if we're on a subject detail page
  const subjectMatch = pathname.match(/\/dashboard\/subjectdata\/([^\/]+)/);
  const subjectId = subjectMatch ? subjectMatch[1] : undefined;
  
  // Get tabs based on current page
  const tabs = getTabs(subjectId);
  
  // Determine if we should show search bar
  const showSearch = pathname === "/dashboard" || pathname === "/dashboard/subjectdata";

  return (
    <div className="flex flex-col md:flex-row p-6 items-center justify-between gap-4">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            href={tab.path}
            className={`px-4 py-3 rounded-md transition-colors ${
              pathname === tab.path 
                ? "bg-white text-[#2c015e] font-medium" 
                : "bg-purple-900 bg-opacity-50 text-white hover:bg-opacity-70"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      {showSearch && (
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Searchbar />
        </div>
      )}
    </div>
  );
}