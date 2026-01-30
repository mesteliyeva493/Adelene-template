import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>NotFound</title>
      </Helmet>

      <div
        className="fixed top-0 left-0 w-full h-full z-[9999] leading-[24px]
                   bg-gradient-to-br from-[#789B03] to-[#ef0000]"
      >
        <div className="flex flex-col items-center text-black text-[40px]">
          <img
            src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
            alt="404"
            className="my-[5px] h-[342px]"
          />

          <span className="relative text-[132px] font-black mb-[50px]">
            404 PAGE
          </span>

          <p className="text-[19px] mt-[30px] mb-[15px]">
            The page you were looking for could not be found
          </p>

          <p className="text-[15px]">Back to previous page</p>

          <Link
            to="/"
            className="mt-[32px] mx-auto bg-white text-black text-[30px]
                       px-[60px] py-[21px] rounded-full font-black
                       transition-all duration-300 ease-in-out
                       shadow-[0_20px_70px_4px_rgba(0,0,0,0.1),inset_7px_33px_0_0_#789B03]
                       hover:-translate-y-[13px]
                       hover:shadow-[0_35px_90px_4px_rgba(0,0,0,0.3),inset_0_0_0_3px_#000]"
          >
            Back to previous page
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
