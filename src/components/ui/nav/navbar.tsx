"use client";
import { useEffect, useState } from "react";
import SignIn from "../auth/sign-in-btn";
import UserProfile from "../auth/user-profile";
import NavItems from "./nav-items";
import axios from "axios";
import LogoutBtn from "../auth/logout-btn";

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
      <div className="w-1/2"></div>

      <div className="w-1/2 flex justify-end items-center gap-4">
        <NavItems />

        {isAuth && name ? (
          <div className="flex gap-1">
            <UserProfile name={name} /> 
            <LogoutBtn />
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  );
};

export default Navbar;
