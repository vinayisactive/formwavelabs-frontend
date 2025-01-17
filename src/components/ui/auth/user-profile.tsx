import React from 'react'
import { ChevronDown } from 'lucide-react'

const UserProfile = ({name}: {name: string}) => {
  return (
    <div className=' border px-3 py-1 flex justify-center items-center gap-2'>
        <p>{name.slice(0, 3)}</p>

        <ChevronDown size={15}/>
    </div>
  )
}

export default UserProfile
