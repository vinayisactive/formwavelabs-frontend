"use client";

import { handleAxiosError } from "@/utility/axios-err";
import axios from "axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUpForm = () => {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const isFormValid =
      userDetails.password.length >= 6 &&
      userDetails.name.trim().length > 0 &&
      userDetails.email.includes("@");

    setIsValid(isFormValid);
  }, [userDetails]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setUserDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/auth/sign-up",
        userDetails,
        { withCredentials: true }
      );

      if (data.status === "success") {
        router.push("/sign-in");
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
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={userDetails.name}
        onChange={handleInput}
      />

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
        onChange={handleInput}
        placeholder="6 char at least"
      />

      <button type="submit" disabled={!isValid}>
        Sign Up {loading && <Loader />}
      </button>

      {errorMsg && <p>{errorMsg}</p>}

      <Link href="/sign-up" className="text-blue-500">
        Already have an account? Sign in
      </Link>
    </form>
  );
};

export default SignUpForm;
