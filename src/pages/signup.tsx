import React, {useState} from "react";
import Head from 'next/head';
import Header from "@/components/Header";
import {useRouter} from "next/router";


export default function Signup() {
   const router = useRouter();

   const [username, setUsername] = useState<string | null>(null);
   const [password, setPassword] = useState<string | null>(null);
   const [email, setEmail] = useState<string | null>(null);


   return (
      <>
         <Head>
            <title>title.io | Sign up</title>
            <link rel="icon" href="/logo.ico"/>
         </Head>
         <main className="main bg-gradient-to-br from-indigo-400/20 to-purple-400/20">
            <Header/>

            <div className="flex flex-col justify-center items-center h-full w-full">
               <form
                  className="flex flex-col justify-between items-center h-1/2 w-[25%] p-10 rounded-3xl border-1 border-[#89B4FA] bg-[#1E1E2E]/35 shadow-[0_0_15px_rgba(121,116,208,1)]">
                  <div className="flex flex-col items-center gap-5 w-full">
                     <h1 className="text-[#89B4FA] text-3xl text-shadow-[0_0_5px_rgba(121,116,208,1)]">Sign up</h1>

                     <input
                        className="w-full h-12 border-1 text-[#89B4FA] px-4 py-2 rounded-2xl focus:outline-none focus:shadow-[0_0_15px_rgba(121,116,208,1)] transition-all duration-300"
                        placeholder='Username'
                        type={'text'}
                        required
                        onChange={(e) => {
                           setUsername(e.target.value)
                        }}
                     />

                     <input
                        className="w-full h-12 border-1 text-[#89B4FA] px-4 py-2 rounded-2xl focus:outline-none focus:shadow-[0_0_15px_rgba(121,116,208,1)] transition-all duration-300"
                        placeholder='E-mail'
                        type={'email'}
                        required
                        onChange={(e) => {
                           setEmail(e.target.value)
                        }}
                     />

                     <input
                        className="w-full h-12 border-1 text-[#89B4FA] px-4 py-2 rounded-2xl focus:outline-none focus:shadow-[0_0_15px_rgba(121,116,208,1)] transition-all duration-300"
                        placeholder='Password'
                        type={'password'}
                        required
                        onChange={(e) => {
                           setPassword(e.target.value)
                        }}
                     />
                  </div>

                  <div className="flex row items-center gap-3 w-full">
                     <button
                        className="border-1 border-[#7974d0] w-1/2 rounded-l-2xl rounded-r-sm h-12 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(121,116,208,1)] hover:text-shadow-[0_0_5px_rgb(255_255_255/_1)] hover:w-2/3"
                        onClick={() => {
                           router.push("/login")
                        }}
                     >
                        Already have account?
                     </button>
                     <button
                        className="bg-[#7974d0]  w-1/2 rounded-l-sm rounded-r-2xl h-12 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(121,116,208,1)] text-shadow-[0_0_5px_rgb(255_255_255/_1)] hover:text-shadow-none hover:w-2/3"
                        type={'submit'}
                     >
                        Register!
                     </button>
                  </div>
               </form>
            </div>
         </main>
      </>
   )
}
