"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import Link from "next/link";

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
      const result = await signIn("credentials", {
        redirect: false,
        email: userDetails.email,
        password: userDetails.password,
      });
  
      if (result?.ok) {
        console.log("Sign-in successful:", result);
        router.push("/");

        setTimeout(() => {
          window.location.reload()
        }, 100);
      } else {
        console.error("Sign-in error:", result?.error);
        setErrorMsg(result?.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrorMsg("An unexpected error occurred");
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
        type="email"
        id="email"
        value={userDetails.email}
        onChange={handleInput}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={userDetails.password}
        placeholder="6 characters at least"
        minLength={6}
        onChange={handleInput}
        required
      />

      <button type="submit" disabled={!isValid || loading}>
        {loading ? <Loader className="animate-spin" /> : "Sign In"}
      </button>

      {errorMsg && <p className="text-red-500">{errorMsg}</p>}

      <Link href="/sign-up" className="text-blue-500 hover:text-blue-700">
        Do not have an account? Sign up here
      </Link>
    </form>
  );
};

export default SignInForm;