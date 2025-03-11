import React, { FC } from 'react'
import CopyToClipboard from './copy-to-clipboard'
import { ArrowUpRight, Pencil } from 'lucide-react'
import Link from 'next/link';

interface FormCardProps {
    index: number,
    formId: string; 
    workspaceId: string,
    title: string; 
    status: boolean,
    submissions: number,
}

const FormCard: FC<FormCardProps> = ({formId, workspaceId, title, status, submissions, index}) => {
  return (
    <div className="w-full flex gap-3">
  
    <div className="hidden lg:flex text-gray-500 font-bold justify-center items-center w-4">
        {index + 1}
    </div>



    <div className=' w-full flex flex-col lg:flex-row  justify-between items-center gap-2 border text-sm py-3 px-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all'>
    <p className="font-medium text-gray-800">
        {title}
    </p>

<div className='flex gap-2'>
    <div>
      {status ? (
        <div className="flex justify-center items-center gap-3 text-green-600 font-semibold md:border p-2 md:p-1 rounded-md"> 
          <span className='hidden md:flex'> PUBLISHED</span>
          <CopyToClipboard
            textToCopy={`http://localhost:3000/submit/${formId}`}
          />
        </div>
      ) : (
        <span className="text-gray-500 font-semibold">NOT PUBLISHED</span>
      )}
    </div>
    

    <div className="flex justify-center items-center gap-2">
    
      <Link href={`/workspaces/${workspaceId}/${formId}/builder`} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-black/80 transition-all">
          Edit
        <Pencil size={16} />
      </Link>

      <Link href={`/workspaces/${workspaceId}/${formId}/submission`} className="flex items-center gap-2 bg-gray-200 text-black px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition-all whitespace-nowrap">
        Submissions  ({submissions})
        <ArrowUpRight size={16}/>
      </Link>
    </div>
    </div>
    </div>
  </div>
  )
}

export default FormCard
