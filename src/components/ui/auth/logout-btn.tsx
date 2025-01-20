"use client"

import axios from "axios";
// import { useRouter } from "next/navigation";

const LogoutBtn = () => {
    // const router = useRouter(); 

    const logoutHandler = async() => {
        try {
           const { data } = await axios.post("https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/auth/logout", {
                withCredentials: true
              }); 
        
              if(data.status === 'success'){
                  // router.push("/");

                  // setTimeout(() => {
                  //   window.location.reload();
                  // }, 500);
              };
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
