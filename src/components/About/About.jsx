import React from "react";
import CarPng from "../../assets/car1.png";

const About = () => {
  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          {/* <div data-aos="slide-right" data-aos-duration="1500"> */}
          <div>
            <img
              src={CarPng}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
             
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              {/* <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              > */}
               <h1
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About us
              </h1>
              <p className="leading-8 tracking-wide">
              {/* <p data-aos="fade-up" className="leading-8 tracking-wide"> */}
                Established in 2024, Car Chaiyo stands as Nepal's best vehicle
                rental company, offering an unparalleled experience in travel.
                With a commitment to excellence, we provide car rental in
                Biratchowk and all over Nepal along with driver hire services
                marked by professionalism, at the best price.
              </p>

              <button className="button-outline">
              {/* <button data-aos="fade-up" className="button-outline"> */}
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
