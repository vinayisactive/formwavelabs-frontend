'use client'
import axios from "axios";
import { useState } from "react";

const SignInForm = () => {
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

      const data = await axios.post("https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/auth/sign-in", userDetails, {
        withCredentials: true
      }); 

      console.log(data); 
  } 

  return (
    <form className="border" onSubmit={submitHandler}>
      <label htmlFor="email"> email: </label>
      <input type="text" id="email" value={userDetails.email} onChange={handleInput}/>

      <label htmlFor="password"> password: </label>
      <input type="text" id="password" value={userDetails.password} onChange={handleInput}/>

      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
