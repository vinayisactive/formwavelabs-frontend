"use client";
import { useEffect, useState } from "react";
import SignIn from "../ui/auth/sign-in-btn";
import UserProfile from "../ui/auth/user-profile";
import NavItems from "../ui/nav-items";
import axios from "axios";

const Navbar = () => {
  const [name, setName] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuthDetails = async () => {
      try {
        const { data } = await axios.get(
          "https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/auth/check-auth",
          {
            withCredentials: true,
          }
        );

        setName(data.data.email);
        setIsAuth(true);
      } catch (error) {
        console.log(error);
        setIsAuth(false);
      }
    };

    fetchAuthDetails();
  }, []);

  return (
    <div className="w-screen h-12 absolute top-0 left-0 border flex justify-center items-center px-4">
      <div className="w-1/2">
        <p>Fromwavelabs 🖇️</p>
      </div>

      <div className="w-1/2 flex justify-end items-center gap-4">
        <NavItems />

        {isAuth && name ? <UserProfile name={name} /> : <SignIn />}
      </div>
    </div>
  );
};

export default Navbar;
