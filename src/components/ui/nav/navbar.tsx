"use client";

import NavItems from "./nav-items";
import SignIn from "../auth/sign-in-btn";
import UserProfile from "../auth/user-profile";
import LogoutBtn from "../auth/logout-btn";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";
  const name = session?.user?.name || null;

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
