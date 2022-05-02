import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="max-w-7xl mx-auto bg-red-200 flex items-center justify-between p-5    ">
      <Link href="/">
        <img
          className="w-44 object-contain cursor-pointer"
          src="https://links.papareact.com/yvf"
        />
      </Link>
      <div className="hidden md:inline-flex items-center space-x-2 font-semibold">
        <h3 className="hover:bg-red-300 transform active:bg-red-600 duration-200 ease-in-out px-6 cursor-pointer py-2 rounded-md">
          Home
        </h3>
        <h3 className="hover:bg-red-300 transform active:bg-red-600 duration-200 ease-in-out px-6 cursor-pointer py-2 rounded-md">
          Contact
        </h3>
        <h3 className="hover:bg-red-300 transform active:bg-red-600 duration-200 ease-in-out px-6 cursor-pointer py-2 rounded-md">
          Follow
        </h3>
      </div>
      <div className="flex items-center space-x-2 text-Zinc-900">
        <h3 className="font-semibold hover:bg-red-300 transform active:bg-red-600 duration-200 ease-in-out px-6 cursor-pointer py-2 rounded-md">
          Sign In
        </h3>
        <h3
          className="border px-3 py-2 rounded-md border-red-400
        hover:bg-red-300 transform active:bg-red-600 duration-200 ease-in-out cursor-pointer"
        >
          Get Started
        </h3>
      </div>
    </header>
  );
}

export default Header;
