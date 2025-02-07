import ImageKitFileUpload from '@/components/ui/imagekit-file-uploader'
import React from 'react'

const Page = () => {
  return (
    <div className=' h-full flex flex-col gap-2 justify-center items-center'>
       <ImageKitFileUpload fileType="pdf"/>
    </div>
  )
}

export default Page
