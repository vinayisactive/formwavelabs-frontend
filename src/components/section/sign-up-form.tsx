"use client";

import { handleAxiosError } from "@/utility/axios-err-handler";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <div className=" bg-white absolute top-0 left-0 inset-0 flex items-center overflow-hidden">
      <div className="relative w-[60%] hidden lg:flex h-full">
        <Image
          src="https://res.cloudinary.com/dmx424ib8/image/upload/v1744718167/s4thekdnk90cwcudhnam.png"
          alt="Background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "right",
          }}
        />
      </div>

      <div className="w-full px-8 lg:px-0 lg:w-[30%] h-full flex justify-center  items-center">
        <form
          onSubmit={submitHandler}
          className="w-[400px] max-w-md flex flex-col gap-4 text-black"
        >
          <div className="mb-8 space-y-2">
            <p className="text-3xl text-black font-bold">Sign-Up</p>
            <p>Start using FormWaveLabs for free</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              value={userDetails.name}
              onChange={handleInput}
              placeholder="Full name..."
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
              placeholder="@mail"
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
              placeholder="Must be of 6 characters."
              className="w-full px-3 py-2 border rounded"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full py-2 bg-black text-white rounded"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <div className="text-center text-sm">
            <Link href="/sign-in" className="text-black">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
