import React from 'react'

const BuilderLoading = () => {
  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center gap-2 p-2">
    <div className="h-[6%] w-full bg-gray-200 rounded-md animate-pulse"></div>
  
    <div className="h-[94%] w-full flex justify-center items-center gap-2">
    <div className="hidden md:flex w-1/5 h-full bg-gray-100 rounded-md animate-pulse'"></div>
    <div className=" w-full md:w-3/5 flex h-full bg-gray-300 rounded-md animate-pulse"></div>
    <div className="hidden md:flex w-1/5 h-full bg-gray-100 rounded-md animate-pulse"></div>
    </div>
  </div>
  )
}

export default BuilderLoading
