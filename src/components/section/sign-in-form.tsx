"use client";

import { handleAxiosError } from "@/utility/axios-err";
import axios from "axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const SignInForm = () => {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const isFormValid =
      userDetails.password.length >= 6 && userDetails.email.includes("@");
    setIsValid(isFormValid);
  }, [userDetails]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUserDetails((prev) => ({ ...prev, [id]: value }));
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post(
        "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/auth/sign-in",
        userDetails,
        { withCredentials: true }
      );


      if (response.data.status === "success") {
        router.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      setErrorMsg(handleAxiosError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="border flex flex-col justify-center items-center gap-2"
      onSubmit={submitHandler}
    >
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        value={userDetails.email}
        onChange={handleInput}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="text"
        id="password"
        value={userDetails.password}
        placeholder="6 char at least"
        onChange={handleInput}
      />

      <button type="submit" disabled={!isValid}>
        {loading && <Loader />} Sign In
      </button>

      {errorMsg && <p>{errorMsg}</p>}

      <Link href="/sign-up" className="text-blue-500">
        Sign-up here
      </Link>
    </form>
  );
};

export default SignInForm;
