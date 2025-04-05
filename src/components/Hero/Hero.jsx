import React, { useEffect } from "react";
import carPng from "../../assets/banner-car.png";
import yellowCar from "../../assets/banner-car.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = ({ theme }) => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-slate-200 dark:bg-slate-800/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-slate-100 dark:bg-slate-800/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 h-screen flex items-center relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full">
          {/* Car Image Section on the left */}
          <div className="flex items-center justify-center order-2 sm:order-1">
            <div className="relative" data-aos="zoom-in" data-aos-duration="1200">
              {/* Subtle spotlight effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800/40 dark:to-slate-900/40 rounded-full blur-3xl opacity-70"></div>

              <img
                src={theme === "dark" ? carPng : yellowCar}
                alt="Luxury Car"
                className="relative z-10 max-h-[500px] w-auto object-contain transform hover:scale-105 transition-all duration-700 drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              />

              {/* Info cards */}
              <div className="absolute top-1/4 -right-8 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-md z-20">
                <div className="text-slate-700 dark:text-slate-300 font-bold">Premium</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Quality</div>
              </div>

              <div className="absolute bottom-1/4 -left-8 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-md z-20">
                <div className="text-slate-700 dark:text-slate-300 font-bold">24/7</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Support</div>
              </div>
            </div>
          </div>

          {/* Content Section on the right */}
          <div className="flex flex-col justify-center order-1 sm:order-2 pt-10 sm:pt-0">
            <div data-aos="fade-right" className="mb-4">
              <span className="inline-block px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm mb-4">
                PREMIUM SERVICE
              </span>
            </div>

            <h2
              data-aos="fade-right"
              data-aos-delay="100"
              className="text-2xl md:text-3xl font-serif text-slate-600 dark:text-slate-300 font-bold mb-2"
            >
              Effortless
            </h2>

            <h1
              data-aos="fade-right"
              data-aos-delay="200"
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-slate-800 dark:text-white leading-tight mb-6"
            >
              Car <span className="text-slate-500 dark:text-slate-400">Rental</span>
            </h1>

            <p
              data-aos="fade-right"
              data-aos-delay="300"
              className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-md"
            >
              Experience luxury driving with our premium fleet.
              Easy booking, competitive rates, and exceptional service.
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-4 bg-slate-800 dark:bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-300 shadow-md">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className="grid grid-cols-3 gap-4 mt-12 pt-6 border-t border-slate-200 dark:border-slate-700"
            >
              <div>
                <h3 className="text-3xl font-bold text-slate-700 dark:text-slate-300">150+</h3>
                <p className="text-slate-500 dark:text-slate-400">Premium Cars</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-700 dark:text-slate-300">50+</h3>
                <p className="text-slate-500 dark:text-slate-400">Locations</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-700 dark:text-slate-300">24/7</h3>
                <p className="text-slate-500 dark:text-slate-400">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
