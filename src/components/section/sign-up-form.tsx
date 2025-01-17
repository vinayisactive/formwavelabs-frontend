'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {

  const router = useRouter(); 
  const [userDetails, setUserDetails] = useState({
    name: "",
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
        const { data } = await axios.post("https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/auth/sign-up", userDetails, {
          withCredentials: true
        }); 

        if(data.status ==="success"){
            router.push("/sign-in");
        }

      } catch (error) {
          console.log(error);
      }
  } 

  return (
    <form className="border flex flex-col justify-center items-center gap-2" onSubmit={submitHandler}>
      <label htmlFor="name"> Name: </label>
      <input type="text" id="name" value={userDetails.name} onChange={handleInput} />

      <label htmlFor="email"> email: </label>
      <input type="text" id="email" value={userDetails.email} onChange={handleInput}/>

      <label htmlFor="password"> password: </label>
      <input type="text" id="password" value={userDetails.password} onChange={handleInput}/>

      <button type="submit">Sign Up</button>

      <Link href={"/sign-up"} className="text-blue-500">Already have an account ? sign-in</Link>
    </form>
  );
};

export default SignUpForm;
