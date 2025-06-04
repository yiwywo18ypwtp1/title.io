import React, {useState} from "react";
import Head from 'next/head';
import Header from "@/components/Header";
import {useRouter} from 'next/router'
import {useUser} from '@/contexts/Context';
import axios from "axios";
import {AnimatePresence, motion} from "framer-motion";


export default function Login() {
   const {setUser} = useUser();
   const router = useRouter();

   const [username, setUsername] = useState<string | null>(null);
   const [password, setPassword] = useState<string | null>(null);
   const [credentialError, setCredentialError] = useState<string | null>(null);


   const handleLogin = async (e) => {
      e.preventDefault();
      if (username && password) {
         try {
            await axios.post(
               `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
                  username,
                  password
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
            if (axios.isAxiosError(error)) {
               if (error.response?.status === 404) {
                  setCredentialError('No user found with this credentials');
               } else if (error.response?.status === 401) {
                  setCredentialError('Incorrect credentials, please be more attentive');
               } else {
                  console.error("Server error:", error.message);
               }
            } else {
               console.error("Unexpected error:", error);
            }
         }
      } else {
         setCredentialError('Please enter username and password');
         console.log("Fill all fields, please");
      }
   };

   return (
      <>
         <Head>
            <title>title.io | Log in</title>
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
                     className="flex flex-col justify-between items-center h-[60%] w-[25%] p-10 rounded-3xl border-1 border-[#89B4FA] bg-[#1E1E2E]/35 shadow-[0_0_15px_rgba(121,116,208,1)]"
                  >
                     <div className="flex flex-col items-center gap-5 w-full">
                        <h1 className="text-[#89B4FA] text-3xl text-shadow-[0_0_5px_rgba(121,116,208,1)]">Log in</h1>

                        <input
                           className="w-full h-12 border-1 text-[#89B4FA] px-4 py-2 rounded-2xl focus:outline-none focus:shadow-[0_0_15px_rgba(121,116,208,1)] transition-all duration-300"
                           placeholder='Username'
                           type={'text'}
                           required
                           onChange={(e) => {
                              setUsername(e.target.value);
                              setCredentialError(null);
                           }}
                        />

                        <input
                           className="w-full h-12 border-1 text-[#89B4FA] px-4 py-2 rounded-2xl focus:outline-none focus:shadow-[0_0_15px_rgba(121,116,208,1)] transition-all duration-300"
                           placeholder='Password'
                           type={'password'}
                           required
                           onChange={(e) => {
                              setPassword(e.target.value);
                              setCredentialError(null);
                           }}
                        />

                        <a
                           className="text-[#89B4FA] hover:text-shadow-[0_0_5px_rgba(121,116,208,1)] cursor-pointer transition-all"
                           onClick={() => router.push("/password-recover")}
                        >
                           Forgot your password?
                        </a>
                     </div>

                     {credentialError && (
                        <p className="animate-pulse text-red-400 text-center">{credentialError}</p>
                     )}

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
