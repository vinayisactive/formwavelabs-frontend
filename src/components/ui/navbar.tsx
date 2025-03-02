"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  LogIn,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const navItems = [
  { label: "Home", routeTo: "/" },
  { label: "Create", routeTo: "/form" },
];

const NavItems = ({ isAuth }: { isAuth: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.routeTo}
          className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50/50"
        >
          {item.label}
        </Link>
      ))}

      {isAuth && (
        <Link
          href={"/workspaces"}
          className=" hidden md:flex text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50/50"
        >
          Workspaces
        </Link>
      )}
    </div>
  );
};

const LogoutButton = () => {
  const logoutHandler = () => {
    signOut({ callbackUrl: "/" }).then(() => window.location.reload());
  };

  return (
    <button
      onClick={logoutHandler}
      className="w-full py-2 text-sm bg-red-500 text-white rounded-md"
    >
      <span>Logout</span>
    </button>
  );
};

const SignIn = () => {
  return (
    <Link
      href="/sign-in"
      className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:shadow-md hover:shadow-blue-100 transition-all"
    >
      <LogIn className="w-4 h-4" />
      <span>Login</span>
    </Link>
  );
};

const AccountDetails = () => {
  return (
    <button className="w-full pt-1 text-sm rounded-md text-gray-700 hover:text-black flex justify-center items-center">
      <span className="flex items-center gap-1 ">
        Account <ArrowUpRight size={15} />
      </span>
    </button>
  );
};

const WorkspacesBtn = () => {
  return (
    <Link  href="/workspaces" className="md:hidden w-full py-1 text-sm rounded-md text-gray-700 hover:text-black flex justify-center items-center">
      Workspaces
    </Link>
  );
};

const UserProfile = ({ name }: { name: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const userProfileToggle = () => {
    setIsOpen(!isOpen)

    if(isOpen)
    setTimeout(() => {
      setIsOpen(false)
    }, 3000);
  };

  return (
    <div
      className=" relative flex items-center gap-2 px-3 py-2 bg-black border rounded-lg transition-colors cursor-pointer group"
      onClick={userProfileToggle}
    >
      <div className="w-5 h-5 bg-white/50 rounded-full flex items-center justify-center">
        <User className="w-3 h-3 text-white" />
      </div>
      <span className="text-sm font-medium text-white">
        {name.length > 5 ? name.slice(0, 5) : name}
      </span>
      <ChevronDown className="w-4 h-4 text-white" />

      {isOpen && (
        <div className="w-full absolute top-12 left-0 rounded-md flex flex-col gap-2 justify-center items-center border-2 p-1 z-50 bg-white">
          <AccountDetails />
          <WorkspacesBtn />
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";
  const name = session?.user?.name || null;

  return (
    <nav className="w-full h-[6vh] flex items-center justify-between px-4">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-xl font-bold text-black/50 hidden md:flex">Formwavelabs</span>
        <span className="text-xl font-bold text-black/50 flex md:hidden">FWLabs</span>
      </Link>

      <div className="flex items-center gap-4">
        <NavItems isAuth={isAuth} />

        {isAuth && name ? (
          <div className="flex items-center gap-2">
            <UserProfile name={name} />
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
