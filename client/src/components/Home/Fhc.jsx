import React from "react";
import story from "../../img/story.jpg";
import proces from "../../img/proces.jpg";
import leather from "../../img/leather.jpg";
import { Link } from "react-router-dom";

function Fhc() {
  const cards = [
    {
      title: "BRAND",
      subtitle: "Family Owned",
      linkText: "Read our story",
      img: story,
      path: "/ourStory",
    },
    {
      title: "PRODUCTS",
      subtitle: "Hand Crafted",
      linkText: "About our leather",
      img: leather,
      path: "/ourCraft",
    },
    {
      title: "USA",
      subtitle: "Created in the",
      linkText: "Learn our process",
      img: proces,
      path: "/ourCraft",
    },
  ];

  return (
    <section className="py-[50px] bg-white">
      <div className="max-w-[1200px] mx-auto  flex flex-col md:flex-row justify-between">
        {cards.map((card, index) => (
          <Link
            to={card.path}
            key={index}
            className="relative w-full md:w-[350px] h-[280px]  overflow-hidden group cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-no-repeat bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url(${card.img})`,
                backgroundSize: "cover",
              }}
            ></div>

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

            <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-6">
              <p className="italic font-serif text-[18px] mb-1">
                {card.subtitle}
              </p>
              <h3 className="text-[28px] tracking-[4px] font-light uppercase mb-6">
                {card.title}
              </h3>

              <div className="mt-4">
                <span className="text-[14px] border-b border-white pb-1 hover:text-gray-200 transition-colors">
                  {card.linkText}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Fhc;
