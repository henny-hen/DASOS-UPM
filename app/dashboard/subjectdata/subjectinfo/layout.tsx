import React from 'react'

function SubjectinfoLayout({children}: {
    children: React.ReactNode
  }) {
   return (
     <div className="flex flex-col">
       <main className="">{children}</main>
     </div>  )   
}

export default SubjectinfoLayout