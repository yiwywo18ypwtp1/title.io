import React, {useState} from "react";
import Head from 'next/head';
import Header from "@/components/Header";


export default function Signup() {
   const [recoverEmail, setRecoverEmail] = useState<string | null>(null);


   return (
      <>
         <Head>
            <title>title.io | Sign up</title>
            <link rel="icon" href="/logo.ico"/>
         </Head>
         <main className="main bg-gradient-to-br from-indigo-400/20 to-purple-400/20">
            <Header/>

            <div className="flex flex-col justify-center items-center h-full w-full">
               <form className="flex flex-col justify-between items-center w-[25%] p-10 rounded-3xl border-1 border-[#89B4FA] bg-[#1E1E2E]/35 gap-10">
                  <input
                     className="w-full h-12 border-1 text-[#89B4FA] px-4 py-2 rounded-2xl focus:outline-none focus:shadow-[0_0_15px_rgba(121,116,208,1)] transition-all duration-300"
                     placeholder='Enter your email to recover'
                     type={'text'}
                     required
                     onChange={(e) => {
                        setRecoverEmail(e.target.value)
                     }}
                  />

                  <button
                     className="bg-[#7974d0]  w-full rounded-2xl h-12 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(121,116,208,1)] text-shadow-[0_0_5px_rgb(255_255_255/_1)] hover:text-shadow-none"
                     type={'submit'}
                  >
                     Send recover code
                  </button>
               </form>
            </div>
         </main>
      </>
   )
}
