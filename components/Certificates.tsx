import React from "react";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";
import { certificates } from "../data/index";

const Certificates = () => {
  return (
    <div className="py-12 relative z-0 overflow-visible">
      <h1 className="heading text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center">
        CERTIFICATIONS
      </h1>
      <div className="flex flex-col items-center ">
        <InfiniteMovingCards className="pt-24"
          items={certificates.map((certificate) => ({
            title: certificate.title,
            img: certificate.img,
          }))}
        />
      </div>
    </div>
  );
};

export default Certificates;
