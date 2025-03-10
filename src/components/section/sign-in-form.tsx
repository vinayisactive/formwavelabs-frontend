"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
        router.push("/");
        setTimeout(() => window.location.reload(), 100);
      } else {
        setErrorMsg(result?.error || "Invalid credentials");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form 
        onSubmit={submitHandler}
        className="w-full max-w-sm space-y-4 bg-white p-6 border rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center">Sign In</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            value={userDetails.email}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            value={userDetails.password}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded"
            minLength={6}
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}

        <div className="text-center text-sm">
          <Link href="/sign-up" className="text-blue-600">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;