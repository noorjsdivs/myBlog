import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { BiCopyright } from "react-icons/bi";

function Footer() {
  return (
    <div className="max-w-7xl mx-auto bg-yellow-400 flex items-center justify-between p-5 bottom-0 z-50">
      <div className="flex items-center justify-between  w-full">
        <div className="flex">
          <Link href="/">
            <img
              className="w-44  object-contain cursor-pointer"
              src="https://links.papareact.com/yvf"
            />
          </Link>
        </div>
        <div className=" hidden md:flex items-center">
          <p>
            copyrights reserved by_
            <span className=" font-signature_font mr-1">Noor Mohammad </span>
          </p>
          <BiCopyright size={15} />
          <p className="text-sm">2022</p>
        </div>
        <div className="flex">
          <ul className="flex gap-3">
            <Link href="https://github.com/noorjsdivs">
              <a target="_blank">
                <li className="hover:scale-110 duration-500 cursor-pointer">
                  <FaGithub size={30} />
                </li>
              </a>
            </Link>
            <Link href="https://www.linkedin.com/in/noor-mohammad-ab2245193/">
              <a target="_blank">
                <li className="hover:scale-110 duration-500 cursor-pointer">
                  <FaLinkedin size={30} />
                </li>
              </a>
            </Link>
            <Link href="https://www.instagram.com/simplenoor143/">
              <a target="_blank">
                <li className="hover:scale-110 duration-500 cursor-pointer">
                  <AiOutlineInstagram size={30} />
                </li>
              </a>
            </Link>
            <Link href="https://www.linkedin.com/in/noor-mohammad-ab2245193/">
              <a target="_blank">
                <li className="hover:scale-110 duration-500 cursor-pointer">
                  <BsFillPersonLinesFill size={30} />
                </li>
              </a>
            </Link>
            <Link href="https://www.facebook.com/Noorlalu143">
              <a target="_blank">
                <li className="hover:scale-110 duration-500 cursor-pointer">
                  <AiFillFacebook size={30} />
                </li>
              </a>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
