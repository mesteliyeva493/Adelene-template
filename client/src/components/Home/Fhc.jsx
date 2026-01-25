import React from "react";
import story from "../../img/story.jpg";

function Fhc() {
  const cards = [
    {
      title: "BRAND",
      subtitle: "Family Owned",
      linkText: "Read our story",
      img: story,
    },
    {
      title: "PRODUCTS",
      subtitle: "Hand Crafted",
      linkText: "About our leather",
      img: story,
    },
    {
      title: "USA",
      subtitle: "Created in the",
      linkText: "Learn our process",
      img: story, 
    },
  ];

  return (
    <section className="py-[100px] bg-white">
      <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row gap-8 justify-between">
        {cards.map((card, index) => (
          <div 
            key={index}
            className="relative w-full md:w-[400px] h-[300px] overflow-hidden group cursor-pointer"
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
              <p className="italic font-serif text-[18px] mb-1">{card.subtitle}</p>
              <h3 className="text-[28px] tracking-[4px] font-light uppercase mb-6">
                {card.title}
              </h3>
              
              <div className="mt-4">
                <span className="text-[14px] border-b border-white pb-1 hover:text-gray-200 transition-colors">
                    
                  {card.linkText}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Fhc;