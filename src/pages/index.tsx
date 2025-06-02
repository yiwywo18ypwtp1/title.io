import React, {useState} from "react";
import GenerateForm from "@/components/GenerateForm";
import Header from "../components/Header";
import Head from 'next/head';
import Result from "../components/Result";
import {AnimatePresence, motion} from "framer-motion";


export default function Home() {
   const [isGenerated, setIsGenerated] = useState(false);
   const [titleResult, setTitleResult] = useState<string[]>([]);

   const [textInput, setTextInput] = useState<string>("");

   return (
      <>
         <Head>
            <title>title.io</title>
            <link rel="icon" href="/logo.ico"/>
         </Head>

         <main className="flex flex-col items-center h-screen bg-gradient-to-br from-indigo-400/20 to-purple-400/20 font-audiolink">
            <Header onReset={() => setIsGenerated(false)}/>

            <div className="flex flex-col h-full w-full justify-center">
               <AnimatePresence mode="wait">
                  {!isGenerated ? (
                     <motion.div
                        key="form"
                        className="w-full h-[75%] flex flex-col items-center"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 20}}
                        transition={{duration: 0.5, ease: "easeOut"}}
                     >
                        <GenerateForm
                           setIsGenerated={setIsGenerated}
                           setTitleResult={setTitleResult}
                           setTextInput={setTextInput}
                           textInput={textInput}
                        />
                     </motion.div>
                  ) : (
                     <motion.div
                        key="result"
                        className="w-full h-[75%] flex flex-col items-center"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 20}}
                        transition={{duration: 0.5, ease: "easeOut"}}
                     >
                        <Result
                           titleResult={titleResult}
                           textInput={textInput}
                           setTitleResult={setTitleResult}
                        />
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </main>
      </>
   );
}
