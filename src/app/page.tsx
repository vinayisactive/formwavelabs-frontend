import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className=" h-full flex flex-col gap-2 justify-center items-center">
      <p>
        you probably find the link from my github while stalking me, so please
        you better follow me on twitter oki ?
      </p>
      <Link
        href={"https://x.com/vinayisactive"}
        target="_blank"
        className="text-blue-400 flex justify-center items-center gap-2 hover:underline"
      >
        vinayisactive <ArrowUpRight className="text-sm" />
      </Link>
    </div>
  );
};

export default Page;
