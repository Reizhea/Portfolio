import React from "react";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">Connect with Me Today</h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today
        </p>
        <a href="mailto:nawangdorjee798@gmail.com">
          <MagicButton title="Let's Talk" icon={<FaLocationArrow />} position="right" />
        </a>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <div></div>
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((profile) => (
            <a
              key={profile.id}
              href={profile.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={profile.img} width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
