// import React from "react";
// import { motion } from "framer-motion";
// import mini_left from "../../img/mini-left.webp";
// import mini_right from "../../img/mini-right.jpg";
// import mini_left2 from "../../img/mini-left2.jpg";
// import mini_right2 from "../../img/mini-right2.webp";
// import { Link } from "react-router-dom";

// function Mini() {
//   const smoothTransition = {
//     type: "spring",
//     stiffness: 260,
//     damping: 20,
//   };

//   return (

//     <>
//       <section className="flex flex-col md:flex-row md:flex-wrap w-full overflow-hidden">
//       <div className="w-full h-[400px] md:h-[500px] md:w-1/2 border bg-[#F8F4F0] flex flex-col items-center justify-center">
//         <motion.div
//           whileHover={{ scale: [null, 1.05, 1.04] }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           className="flex flex-col items-center "
//         >
//           <img
//             src={mini_left}
//             alt="Wallet"
//             className="w-[220px] md:w-[300px] h-auto"
//           />
//           <div className="text-center mt-4">
//             <p className="text-gray-400 italic text-[14px]">Wallet</p>
//             <p className="text-[#BC4C2A] font-serif text-[18px]">$100.00</p>
//           </div>
//         </motion.div>
//       </div>

//       <div className="w-full h-[400px] md:h-[500px] md:w-1/2 relative group overflow-hidden">
//         <motion.img
//           src={mini_right}
//           alt="wallet"
//           className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
//         />
//         <div className="absolute inset-0 flex flex-col items-center text-center justify-center bg-black/10">
//           <h2 className="text-white text-[20px] md:text-[24px] tracking-[6px] uppercase font-light mb-[20px] md:mb-[32px]">
//             Mini Leather Goods
//           </h2>
//           <Link to="/shopAll?category=wallets">
//             <motion.button
//               whileHover={{
//                 scale: [null, 1.12, 1.08],
//                 backgroundColor: "#BC4C2A",
//                 color: "#ffffff",
//               }}
//               transition={{ duration: 0.5, ease: "backOut" }}
//               className="opacity-100 md:opacity-0 group-hover:opacity-100 translate-y-0 md:translate-y-[24px] group-hover:translate-y-0 transition-all duration-[600ms] bg-white text-black px-[32px] md:px-[48px] py-[12px] md:py-[16px] text-[10px] md:text-[11px] uppercase tracking-[4px] font-bold shadow-2xl"
//             >
//               Shop Wallets
//             </motion.button>
//           </Link>
//         </div>
//       </div>
//       <div className="w-full h-[400px] md:h-[500px] md:w-1/2 relative group overflow-hidden">
//         <motion.img
//           src={mini_left2}
//           alt="belt"
//           className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
//         />
//         <div className="absolute inset-0 flex flex-col items-center text-center justify-center bg-black/10">
//           <h2 className="text-white text-[20px] md:text-[24px] tracking-[6px] uppercase font-light mb-[20px] md:mb-[32px]">
//             belt
//           </h2>
//           <Link to="/shopAll?category=belts">
//             <motion.button
//               whileHover={{
//                 scale: [null, 1.12, 1.08],
//                 backgroundColor: "#BC4C2A",
//                 color: "#ffffff",
//               }}
//               transition={{ duration: 0.5, ease: "backOut" }}
//               className="opacity-100 md:opacity-0 group-hover:opacity-100 translate-y-0 md:translate-y-[24px] group-hover:translate-y-0 transition-all duration-[600ms] bg-white text-black px-[32px] md:px-[48px] py-[12px] md:py-[16px] text-[10px] md:text-[11px] uppercase tracking-[4px] font-bold shadow-2xl"
//             >
//               Shop Belts
//             </motion.button>
//           </Link>
//         </div>
//       </div>
//       <div className="w-full h-[400px] md:h-[500px] md:w-1/2  bg-[#F8F4F0] flex flex-col items-center justify-center">
//         <motion.div
//           whileHover={{ scale: [null, 1.05, 1.04] }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           className="flex flex-col items-center "
//         >
//           <img
//             src={mini_right2}
//             alt="belt"
//             className="w-[220px] md:w-[300px] h-auto"
//           />
//           <div className="text-center mt-4">
//             <p className="text-gray-400 italic text-[14px]">Belt</p>
//             <p className="text-[#BC4C2A] font-serif text-[18px]">$100.00</p>
//           </div>
//         </motion.div>
//       </div>
//     </section>
    
    
//     </>
  
//   );
// }

// export default Mini;
import React from "react";
import { motion } from "framer-motion";
import mini_left from "../../img/mini-left.webp";
import mini_right from "../../img/mini-right.jpg";
import mini_left2 from "../../img/mini-left2.jpg";
import mini_right2 from "../../img/mini-right2.webp";
import { Link } from "react-router-dom";

function Mini() {
  // Əgər istifadə etməyəcəksənsə, smoothTransition-u silə bilərsən
  const smoothTransition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
  };

  return (
    <section className="flex flex-col md:flex-row md:flex-wrap w-full overflow-hidden">
      {/* WALLET PRODUCT */}
      <div className="w-full h-[400px] md:h-[500px] md:w-1/2 border bg-[#F8F4F0] flex flex-col items-center justify-center">
        <motion.div
          whileHover={{ scale: [null, 1.05, 1.04] }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <img src={mini_left} alt="Wallet" className="w-[220px] md:w-[300px] h-auto" />
          <div className="text-center mt-4">
            <p className="text-gray-400 italic text-[14px]">Wallet</p>
            <p className="text-[#BC4C2A] font-serif text-[18px]">$100.00</p>
          </div>
        </motion.div>
      </div>

      {/* WALLET LIFESTYLE */}
      <div className="w-full h-[400px] md:h-[500px] md:w-1/2 relative group overflow-hidden">
        <motion.img
          src={mini_right}
          alt="wallet"
          // duration-[1200ms] əvəzinə duration-1000 istifadə etdik
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 flex flex-col items-center text-center justify-center bg-black/10">
          <h2 className="text-white text-[20px] md:text-[24px] tracking-[6px] uppercase font-light mb-[20px] md:mb-[32px]">
            Mini Leather Goods
          </h2>
          <Link to="/shopAll?category=wallets">
            <motion.button
              whileHover={{
                scale: [null, 1.12, 1.08],
                backgroundColor: "#BC4C2A",
                color: "#ffffff",
              }}
              transition={{ duration: 0.5, ease: "backOut" }}
              // duration-[600ms] əvəzinə duration-500 istifadə etdik
              className="opacity-100 md:opacity-0 group-hover:opacity-100 translate-y-0 md:translate-y-[24px] group-hover:translate-y-0 transition-all duration-500 bg-white text-black px-[32px] md:px-[48px] py-[12px] md:py-[16px] text-[10px] md:text-[11px] uppercase tracking-[4px] font-bold shadow-2xl"
            >
              Shop Wallets
            </motion.button>
          </Link>
        </div>
      </div>

      {/* BELT LIFESTYLE */}
      <div className="w-full h-[400px] md:h-[500px] md:w-1/2 relative group overflow-hidden">
        <motion.img
          src={mini_left2}
          alt="belt"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 flex flex-col items-center text-center justify-center bg-black/10">
          <h2 className="text-white text-[20px] md:text-[24px] tracking-[6px] uppercase font-light mb-[20px] md:mb-[32px]">
            belt
          </h2>
          <Link to="/shopAll?category=belts">
            <motion.button
              whileHover={{
                scale: [null, 1.12, 1.08],
                backgroundColor: "#BC4C2A",
                color: "#ffffff",
              }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="opacity-100 md:opacity-0 group-hover:opacity-100 translate-y-0 md:translate-y-[24px] group-hover:translate-y-0 transition-all duration-500 bg-white text-black px-[32px] md:px-[48px] py-[12px] md:py-[16px] text-[10px] md:text-[11px] uppercase tracking-[4px] font-bold shadow-2xl"
            >
              Shop Belts
            </motion.button>
          </Link>
        </div>
      </div>

      {/* BELT PRODUCT */}
      <div className="w-full h-[400px] md:h-[500px] md:w-1/2 bg-[#F8F4F0] flex flex-col items-center justify-center border">
        <motion.div
          whileHover={{ scale: [null, 1.05, 1.04] }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <img src={mini_right2} alt="belt" className="w-[220px] md:w-[300px] h-auto" />
          <div className="text-center mt-4">
            <p className="text-gray-400 italic text-[14px]">Belt</p>
            <p className="text-[#BC4C2A] font-serif text-[18px]">$100.00</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Mini;