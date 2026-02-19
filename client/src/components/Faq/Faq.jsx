import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const faqData = [
  {
    id: 1,
    question: "How can I track my order?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  },
  {
    id: 3,
    question: "Do you offer international shipping?",
    answer:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  },
  {
    id: 4,
    question: "How do I care for Adelene products?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
  },
];

function FAQ() {
  const [activeId, setActiveId] = useState(null);

  return (
    <>
      <Helmet>
        <title>Faq</title>
      </Helmet>
      <section className="max-w-[1200px] mx-auto pt-[120px] pb-[80px] font-sans px-4 md:px-[16px]">
        <nav className="flex items-center gap-[8px] text-[10px] tracking-[2px] uppercase text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#BC4C2A] font-bold">FAQ</span>
        </nav>

        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-[#BB4B2A] text-[40px] md:text-[50px] mb-4 lowercase"
          >
            frequently asked questions
          </motion.h2>
          <div className="h-[1px] w-24 bg-[#BB4B2A] mx-auto opacity-20"></div>
        </div>

        <div className="max-w-[900px] mx-auto space-y-2">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-100 last:border-none"
            >
              <button
                onClick={() =>
                  setActiveId(activeId === item.id ? null : item.id)
                }
                className="w-full py-7 flex justify-between items-center text-left group transition-all"
              >
                <motion.span
                  whileHover={{ x: 5 }}
                  className={`uppercase tracking-[3px] text-[11px] md:text-[12px] transition-colors duration-300 font-medium ${
                    activeId === item.id
                      ? "text-[#BB4B2A]"
                      : "text-gray-500 group-hover:text-[#BB4B2A]"
                  }`}
                >
                  {item.question}
                </motion.span>

                <motion.span
                  animate={{ rotate: activeId === item.id ? 180 : 0 }}
                  className="text-[#BB4B2A] text-2xl md:text-3xl font-light"
                >
                  {activeId === item.id ? <CiCircleMinus /> : <CiCirclePlus />}
                </motion.span>
              </button>

              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-gray-400 font-light leading-relaxed text-[14px] md:text-[15px] max-w-[850px]">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default FAQ;
