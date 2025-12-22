import React from "react";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";
import { certificates } from "../data/index";

const Certificates = () => {
  return (
    <div className="py-12 relative z-0 overflow-visible">
      <div className="py-10" id="testimonials">
            <h1 className="heading">
            My
            <span className=" text-purple"> Certifications </span>
            </h1>
            <div className="flex flex-col items-center max-lg:mt-10">
            </div>
        </div>
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
