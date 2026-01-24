import React from "react";
import { Link } from "react-router-dom";

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
      </section>
    </>
  );
}

export default OurCr;
