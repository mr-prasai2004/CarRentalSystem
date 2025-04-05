import React, { useEffect } from "react";
import { FaShippingFast } from "react-icons/fa";
import { Ri24HoursLine } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

const skillsData = [
  {
    name: "24-hour Customer Service",
    icon: <Ri24HoursLine className="text-6xl text-slate-200 group-hover:text-white duration-300" />,
    link: "#",
    description:
      "We promise impeccable service by promptly addressing your queries and problems through our dedicated 24/7 customer support team.",
    aosDelay: "0",
  },
  {
    name: "Fast and Safe",
    icon: <FaShippingFast className="text-6xl text-slate-200 group-hover:text-white duration-300" />,
    link: "#",
    description: "Experience swift and secure car rental services, ensuring your journey is both timely and safe from start to finish.",
    aosDelay: "200",
  },
  {
    name: "All Over Nepal Service",
    icon: <FaMapLocationDot className="text-6xl text-slate-200 group-hover:text-white duration-300" />,
    link: "#",
    description:
      "Our service spans all 7 provinces and 77 districts, ensuring accessibility for your transportation needs nationwide.",
    aosDelay: "400",
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <section className="relative min-h-screen w-full py-16 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-black dark:text-white flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-slate-200/50 dark:bg-slate-800/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-slate-200/50 dark:bg-slate-800/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="mb-16 text-center" data-aos="fade-up">
          <span className="inline-block px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium mb-4">OUR SERVICES</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-slate-800 dark:text-white">
            Why Choose <span className="text-slate-600 dark:text-slate-400">Us</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
            We pride ourselves on providing exceptional car rental services that prioritize your comfort, safety, and convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillsData.map((skill, index) => (
            <div
              key={skill.name}
              data-aos="fade-up"
              data-aos-delay={skill.aosDelay}
              className="group relative rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Card background with gradient overlay */}
              <div className="absolute inset-0 bg-slate-800 dark:bg-slate-900 z-0"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700/90 to-slate-900/90 group-hover:from-slate-600/90 group-hover:to-slate-800/90 transition-all duration-300 z-0"></div>
              
              {/* Card content */}
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="w-16 h-16 rounded-full bg-slate-700 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-slate-600 dark:group-hover:bg-slate-700 transition-all duration-300">
                  {skill.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{skill.name}</h3>
                
                <p className="text-slate-300 mb-6 flex-grow">{skill.description}</p>
                
                <a
                  href={skill.link}
                  className="inline-flex items-center text-slate-300 hover:text-white font-medium transition-colors duration-300 group"
                >
                  <span>Learn more</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                {/* Decorative element */}
                <div className="absolute bottom-0 right-0 w-20 h-20 -mb-10 -mr-10 rounded-full bg-slate-700/50 group-hover:bg-slate-600/50 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <a 
            href="#contact" 
            className="inline-block px-8 py-4 bg-slate-800 dark:bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-300 shadow-md"
          >
            Book Your Car Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;