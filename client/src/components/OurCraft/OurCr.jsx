import React from "react";
import { Link } from "react-router-dom";
import craft1 from "../../img/craft1.jpg";
import craft2 from "../../img/craft2.jpg";
import craft3 from "../../img/craft3.jpg";

function OurCr() {
  return (
    <>
      <section>
        <div className="max-w-[1200px] mx-auto    pt-[34px] font-sans">
          <nav className="flex items-center gap-[8px] text-[10px] tracking-[2px] uppercase text-gray-400 ">
            <Link to="/">Home</Link>
            <span>/</span>

            <span className="text-[#BC4C2A] font-bold">Gift Craft</span>
          </nav>
        </div>
        <h2 className="text-center text-[25px] text-[#BB4B2A]  uppercase font-bold">
          OUR CRAFT
        </h2>

        <div className="w-full flex flex-col md:flex-row mt-[40px]">
          <div className="w-full md:w-1/2 h-auto md:h-[600px] flex flex-col gap-[10px] justify-center items-center bg-[#F9F6F2] px-[40px] md:px-[80px] py-[60px]">
            <h2 className="text-[20px] font-bold tracking-[8px]">DESIGN</h2>
            <hr className="border border-red-950 w-[30px]" />
            <span className="text-center w-[70%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              impedit incidunt tenetur labore dolorum unde optio consectetur
              mollitia similique error vero qui dolorem.
            </span>
          </div>

          <div className="block md:hidden w-full h-[400px]">
            <img
              src={craft3}
              alt="DESIGN"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="hidden md:block w-full md:w-1/2 h-[600px] bg-no-repeat"
            style={{
              backgroundImage: `url(${craft3})`,
              backgroundAttachment: "fixed",
              backgroundPosition: "right center",
              backgroundSize: "50% auto",
            }}
          ></div>
        </div>

        <div className="w-full flex flex-col md:flex-row ">
          <div className="block md:hidden w-full h-[400px]">
            <img
              src={craft2}
              alt="SELECTION"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="hidden md:block w-full md:w-1/2 h-[600px] bg-no-repeat"
            style={{
              backgroundImage: `url(${craft2})`,
              backgroundAttachment: "fixed",
              backgroundPosition: "left center",
              backgroundSize: "50% auto",
            }}
          ></div>
          <div className="w-full md:w-1/2 h-auto md:h-[600px] flex flex-col gap-[10px] justify-center items-center bg-[#F9F6F2] px-[40px] md:px-[80px] py-[60px]">
            <h2 className="text-[20px] font-bold tracking-[8px]">SELECTION</h2>
            <hr className="border border-red-950 w-[30px]" />
            <span className="text-center w-[70%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              impedit incidunt tenetur labore dolorum unde optio consectetur
              mollitia similique error vero qui dolorem.
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row ">
          <div className="w-full md:w-1/2 h-auto md:h-[600px] flex flex-col gap-[10px] justify-center items-center bg-[#F9F6F2] px-[40px] md:px-[80px] py-[60px]">
            <h2 className="text-[20px] font-bold tracking-[8px]">
              CRAFTSMANSHIP
            </h2>
            <hr className="border border-red-950 w-[30px]" />
            <span className="text-center w-[70%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              impedit incidunt tenetur labore dolorum unde optio consectetur
              mollitia similique error vero qui dolorem.
            </span>
          </div>

          <div className="block md:hidden w-full h-[400px]">
            <img
              src={craft1}
              alt="CRAFTSMANSHIP"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="hidden md:block w-full md:w-1/2 h-[600px] bg-no-repeat"
            style={{
              backgroundImage: `url(${craft1})`,
              backgroundAttachment: "fixed",
              backgroundPosition: "right center",
              backgroundSize: "50% auto",
            }}
          ></div>
        </div>
      </section>
    </>
  );
}

export default OurCr;
