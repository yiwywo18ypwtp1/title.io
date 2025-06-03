import React, {useState} from "react";
import Head from 'next/head';
import Header from "@/components/Header";
import {useRouter} from 'next/router'
import {useUser} from '@/contexts/Context';
import axios from "axios";
import {AnimatePresence, motion} from "framer-motion";


export default function Signup() {
   const {setUser} = useUser();
   const router = useRouter();

   const [username, setUsername] = useState<string | null>(null);
   const [password, setPassword] = useState<string | null>(null);


   const handleLogin = async (e) => {
      e.preventDefault();
      if (username && password) {
         try {
            await axios.post(
               `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
                  username, password
               },
               {
                  withCredentials: true
               }
            );

            const res = await axios
               .get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
                  withCredentials: true,
               });

            setUser(res.data);

            await router.push("/");
         } catch (error) {
            console.log(error);
         }
      } else {
         console.log("Fill all fields, please");
      }
   };

   return (
      <>
         <Head>
            <title>title.io | Sign up</title>
            <link rel="icon" href="/logo.ico"/>
         </Head>
         <main className="main bg-gradient-to-br from-indigo-400/20 to-purple-400/20">
            <Header/>

            <div className="flex flex-col justify-center items-center h-full w-full">
               <AnimatePresence mode="wait">
                  <motion.form
                     key="form"
                     initial={{opacity: 0, y: 20}}
                     animate={{opacity: 1, y: 0}}
                     exit={{opacity: 0, y: 20}}
                     transition={{duration: 0.5, ease: "easeOut"}}
                     className="flex flex-col justify-between items-center h-1/2 w-[25%] p-10 rounded-3xl border-1 border-[#89B4FA] bg-[#1E1E2E]/35 shadow-[0_0_15px_rgba(121,116,208,1)]"
                  >
                     <div className="flex flex-col items-center gap-5 w-full">
                        <h1 className="text-[#89B4FA] text-3xl text-shadow-[0_0_5px_rgba(121,116,208,1)]">Log in</h1>

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
                           placeholder='Password'
                           type={'password'}
                           required
                           onChange={(e) => {
                              setPassword(e.target.value)
                           }}
                        />

                        <a
                           className="text-[#89B4FA] hover:text-shadow-[0_0_5px_rgba(121,116,208,1)] cursor-pointer transition-all"
                           onClick={() => router.push("/password-recover")}
                        >
                           Fogot your password?
                        </a>
                     </div>

                     <div className="flex row items-center gap-3 w-full">
                        <button
                           className="bg-[#7974d0]  w-full rounded-2xl h-12 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(121,116,208,1)] text-shadow-[0_0_5px_rgb(255_255_255/_1)] hover:text-shadow-none"
                           type={'submit'}
                           onClick={handleLogin}
                        >
                           Login!
                        </button>
                     </div>
                  </motion.form>
               </AnimatePresence>
            </div>
         </main>
      </>
   )
}
