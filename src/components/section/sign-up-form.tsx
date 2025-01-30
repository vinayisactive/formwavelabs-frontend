"use client";

import { handleAxiosError } from "@/utility/axios-err";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    setUserDetails((prev) => ({ ...prev, [id]: value }));
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg("");

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <form 
        onSubmit={submitHandler}
        className="w-full max-w-sm space-y-4 bg-white p-6 border rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            value={userDetails.name}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}

        <div className="text-center text-sm">
          <Link href="/sign-in" className="text-blue-600">
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
