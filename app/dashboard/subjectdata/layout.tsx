import React from 'react'
import Navbar from '@/components/Navbar'
function SubjectdataLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <div className="flex flex-col">

      <div className="p-4">

        {children}</div>
    </div>  )
}

export default SubjectdataLayout