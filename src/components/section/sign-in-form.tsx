'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInForm = () => {

  const router = useRouter(); 
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setUserDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const submitHandler = async(event: React.FormEvent) => {
      event.preventDefault(); 
      
      try {
        const {data} = await axios.post("https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/auth/sign-in", userDetails, {
          withCredentials: true
        }); 
  
        if(data.status === 'success'){
            router.push("/");

            setTimeout(() => {
              window.location.reload();
            }, 500);
        };
        
      } catch (error) {
          console.log(error);
      }
  } 

  return (
    <form className="border flex flex-col justify-center items-center gap-2" onSubmit={submitHandler}>
      <label htmlFor="email"> email: </label>
      <input type="text" id="email" value={userDetails.email} onChange={handleInput}/>

      <label htmlFor="password"> password: </label>
      <input type="text" id="password" value={userDetails.password} onChange={handleInput}/>

      <button type="submit">Sign In</button>

      <Link href={"/sign-up"} className="text-blue-500">Sign-up here</Link>
    </form>
  );
};

export default SignInForm;
