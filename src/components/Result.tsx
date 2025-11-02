import React, { useState } from 'react';
import axios from "axios";
import type { FC } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/router';
import { useAlert } from '@/contexts/AlertContext';


type Props = {
   titleResult: string[];
   textInput: string | null;
   titleLength: string;
   setTitleResult: (titles: string[]) => void;
   handleReset: () => void;
};

const Result: FC<Props> = ({ titleResult, textInput, titleLength, setTitleResult, handleReset }) => {
   const router = useRouter();
   const { addAlert } = useAlert();

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

   const handleBack = () => {
      handleReset();
      router.push("/title-generator");
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
                        className="text-2xl text-[#CBA6F7] text-shadow-[0_0_10px_rgb(206_166_247_/_1)] border border-transparent hover:border-[#CBA6F7] gap-3 px-5 py-2 rounded-3xl cursor-pointer transition-all duration-400"
                        key={idx}
                        onClick={() => {
                           navigator.clipboard.writeText(title);
                           addAlert("Copied to clipboard!", "success");
                        }}
                     >
                        {idx + 1}. {title}
                     </li>
                  ))}
               </ul>
            </motion.div>
         </AnimatePresence>

         <button
            onClick={regenerateTitles}
            className="bg-[#7974d0] mt-8 w-1/6 rounded-full h-15 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(121,116,208,1)] text-shadow-[0_0_5px_rgb(255_255_255/_1)] flex flex-row items-center justify-center gap-3"
         >
            <img src='reload.svg' alt="Regenerate icon" className="w-7 opacity-80 drop-shadow-[0_0_5px_rgba(255,255,255,1)]" />
            <p className="text-xl">Regenerate</p>
         </button>

         <button
            onClick={handleBack}
            className="w-1/6 h-15 underline cursor-pointer transition-all duration-200 hover:drop-shadow-[0_0_5px_rgba(255,2555,255,0.5)] text-shadow-[0_0_5px_rgb(255_255_255/_1)] flex flex-row items-center justify-center gap-3 opacity-50 hover:opacity-100"
         >
            <img src='l-arrow.svg' alt="Back icon" className="w-6 opacity-80" />
            <p className="text-lg">Go back</p>
         </button>
      </div>
   )
}

export default Result;