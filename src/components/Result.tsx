import React, { useState } from 'react';
import axios from "axios";
import type { FC } from 'react';
import { AnimatePresence, motion } from "framer-motion";


type Props = {
   titleResult: string[];
   textInput: string | null;
   titleLength: string;
   setTitleResult: (titles: string[]) => void;
};

const Result: FC<Props> = ({ titleResult, textInput, titleLength, setTitleResult }) => {
   const regenerateTitles = async () => {
      try {
         const res = await axios.post("/api/generateTitle", {
            text: textInput,
            titleLength: titleLength
         });

         const parsed = JSON.parse(res.data.result);
         setTitleResult(parsed);
      } catch (error) {
         console.error("Ошибка при регенерации:", error);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
         <span className="border-1 border-[#CBA6F7] text-[#cba6f7] text-lg px-5 py-2 rounded-3xl shadow-[0_0_10px_rgb(206,166,247,0.5)]">
            Length: {titleLength}
         </span>

         <AnimatePresence mode="wait">
            <motion.div
               key={JSON.stringify(titleResult)}
               initial={{ opacity: 0, y: 0 }}
               animate={{ opacity: 1, y: 20 }}
               exit={{ opacity: 0, y: 0 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
            >
               <ul className="flex flex-col items-center mb-10 gap-2 justify-center">
                  {titleResult.map((title, idx) => (
                     <li
                        className="text-xl font-bold text-[#CBA6F7] text-shadow-[0_0_10px_rgb(206_166_247_/_1)] border border-transparent hover:border-[#CBA6F7] gap-3 px-5 py-2 rounded-3xl cursor-pointer transition-all duration-400"
                        key={idx}
                        onClick={() => navigator.clipboard.writeText(title)}
                     >
                        {idx + 1}. {title}
                     </li>
                  ))}
               </ul>
            </motion.div>
         </AnimatePresence>

         <button
            onClick={regenerateTitles}
            className="bg-[#7974d0] mt-8 w-1/6 rounded-4xl h-15 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(121,116,208,1)] text-shadow-[0_0_5px_rgb(255_255_255/_1)] flex flex-row items-center justify-center"
         >
            <img src='reload.svg' alt="Upload icon" className="w-7.5 opacity-80 drop-shadow-[0_0_5px_rgba(255,255,255,1)]" />
            <p className="text-xl">Regenerate</p>
         </button>
      </div>
   )
}

export default Result;