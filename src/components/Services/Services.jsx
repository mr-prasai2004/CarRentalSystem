import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { Ri24HoursLine } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";

const skillsData = [
  {
    name: "24-hour Customer Service",
    icon: (
      <Ri24HoursLine className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description:
      "We promise impeccable service by promptly addressing your queries and problems through our dedicated 24/7 customer support team.",
    aosDelay: "0",
  },
  {
    name: "Fast and Safe",
    icon: (
      <FaShippingFast className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    aosDelay: "500",
  },
  {
    name: "All Over Nepal Service",
    icon: (
      <FaMapLocationDot className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    link: "#",
    description:
      "Our service spans all 7 provinces and 77 districts, ensuring accessibility for your transportation needs nationwide.",
    aosDelay: "1000",
  },
];
const Services = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
          <div className="pb-12">
            {/* <h1
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            > */}
             <h1
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              Why Choose Us
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skillsData.map((skill) => (
              // <div
              //   key={skill.name}
              //   data-aos="fade-up"
              //   data-aos-delay={skill.aosDelay}
              //   className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark  hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
              // >
              <div
                key={skill.name}
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark  hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
              >

                <div className="grid place-items-center">{skill.icon}</div>
                <h1 className="text-2xl font-bold">{skill.name}</h1>
                <p>{skill.description}</p>
                <a
                  href={skill.link}
                  className="inline-block text-lg font-semibold py-3 text-primary group-hover:text-black duration-300"
                >
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
