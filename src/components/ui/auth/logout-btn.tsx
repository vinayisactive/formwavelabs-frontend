"use client"

// import axios from "axios";
// import { useRouter } from "next/navigation";

const LogoutBtn = () => {
    // const router = useRouter(); 

    // In your Next.js frontend API calls
//  const logout = async () => {
//     await fetch('https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/auth/logout', {
//       method: 'POST',
//       credentials: 'include', // This is crucial
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   };

    const logoutHandler = async() => {
        try {
            await fetch('https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include', 
                headers: {
                  'Content-Type': 'application/json'
                }
              });

        } catch (error) {
            console.log(error)
        }
    }

    return (
    <button onClick={logoutHandler}  className='border px-3 py-1 flex justify-center items-center'>
         Logout
    </button>
  )
}; 

export default LogoutBtn
