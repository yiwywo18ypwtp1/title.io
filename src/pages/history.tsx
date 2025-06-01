import React from "react";
import Head from 'next/head';
import Header from "@/components/Header";


export default function History() {
   return (
      <>
         <Head>
            <title>title.io | My history</title>
            <link rel="icon" href="/logo.ico"/>
         </Head>
         <main className="main bg-gradient-to-br from-indigo-400/20 to-purple-400/20">
            <Header/>

            <div className="flex flex-col justify-center items-center h-full">
               <h1 className="text-3xl font-bold text-[#CBA6F7] text-shadow-[0_0_10px_rgb(206_166_247_/_1)]">History in development</h1>
               <h2 className="text-xl font-bold text-[#CBA6F7] text-shadow-[0_0_10px_rgb(206_166_247_/_1)]">see you later :)</h2>
            </div>
         </main>
      </>
   )
}
