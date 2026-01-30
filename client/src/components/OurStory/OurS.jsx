import React from "react";
import { Link } from "react-router-dom";
import story1 from "../../img/story1.jpg";
import story2 from "../../img/story2.jpg";

function OurS() {
  return (
  <>
    <section>
      <div className="max-w-[1200px] mx-auto pt-[34px] font-sans px-[16px]">
        <nav className="flex items-center gap-[8px] text-[10px] tracking-[2px] uppercase text-gray-400">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="text-[#BC4C2A] font-bold">Our Story</span>
        </nav>
      </div>
      <h2 className="text-center text-[25px] text-[#BB4B2A] font-bold">
        OUR STORY
      </h2>

      <div className="w-full flex flex-col md:flex-row mt-[40px]">
        <div className="w-full md:w-1/2 h-auto md:h-[600px] flex flex-col gap-[10px] justify-center items-center bg-[#F9F6F2] px-[40px] md:px-[80px] py-[60px]">
          <h2 className="text-[20px] font-bold tracking-[8px]">THE BRAND</h2>
          <hr className="border border-red-950 w-[30px]" />
          <span className="text-center w-[70%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            impedit incidunt tenetur labore dolorum unde optio consectetur
            mollitia similique error vero qui dolorem.
          </span>
        </div>

        <div className="block md:hidden w-full h-[400px]">
          <img
            src={story2}
            alt="Brand Story"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="hidden md:block w-full md:w-1/2 h-[600px] bg-no-repeat"
          style={{
            backgroundImage: `url(${story2})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "right center",
            backgroundSize: "50% auto",
          }}
        ></div>
      </div>

      <div className="w-full flex flex-col-reverse md:flex-row">
        <div
          className="hidden md:block w-full md:w-1/2 h-[600px] bg-no-repeat"
          style={{
            backgroundImage: `url(${story1})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "left center",
            backgroundSize: "50% auto",
          }}
        ></div>

        <div className="block md:hidden w-full h-[400px]">
          <img
            src={story1}
            alt="Designers Story"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 h-auto md:h-[600px] flex flex-col gap-[10px] justify-center items-center bg-[#F9F6F2] px-[40px] md:px-[80px] py-[60px]">
          <h2 className="text-[20px] text-center font-bold tracking-[8px]">
            THE DESIGNERS
          </h2>
          <hr className="border border-red-950 w-[30px]" />
          <span className="text-center w-[70%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            impedit incidunt tenetur labore dolorum unde optio consectetur
            mollitia similique error vero qui dolorem.
          </span>
        </div>
      </div>
    </section>
  </>
  );
}

export default OurS;
