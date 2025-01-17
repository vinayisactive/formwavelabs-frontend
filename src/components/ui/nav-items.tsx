import { navItems } from "@/utility/static-data";
import Link from "next/link";
import React from "react";

const NavItems = () => {
  return (
    <div className=" flex gap-2">
      {navItems.map((item) => {
        return (
          <Link key={item.label} href={item.routeTo} className=" px-2">
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default NavItems;
