import React from 'react';
import type {FC} from 'react';
import {useRouter} from 'next/router'


type HeaderProps = {
   onReset?: () => void;
};

const Header: FC<HeaderProps> = ({onReset}) => {
   const router = useRouter()


   const handleReset = () => {
      if (onReset) {
         onReset();
      } else {
         router.push('/')
      }
   }

   return (
      <header className="flex justify-between items-center h-15 bg-[#7974d0] text-white mb-0 top-0 sticky px-5 w-full shadow-[0_0_10px_rgba(121,116,208,1)]">
         <div className="flex flex-row items-center gap-2 drop-shadow-[0_0_5px_rgba(255,255,255,1)] hover:drop-shadow-none transition-all cursor-pointer">
            <img src='history.svg' alt="Upload icon" className="w-5 opacity-80 "/>
            <p onClick={() => router.push("/history")}>
               My history
            </p>
         </div>

         <h1
            className="absolute left-1/2 transform -translate-x-1/2 text-3xl text-shadow-[0_0_10px_rgb(255_255_255_/1)] cursor-pointer hover:scale-x-110 transition-all"
            onClick={handleReset}
         >
            title.io
         </h1>

         <div className="flex flex-row gap-1">
            <a
               className="text-shadow-[0_0_10px_rgb(255_255_255_/1)] cursor-pointer hover:text-shadow-none transition-all"
               onClick={() => router.push("/signup")}
            >
               Sign up
            </a>
            <p className="text-shadow-[0_0_10px_rgb(255_255_255_/1)]">|</p>
            <a
               className="text-shadow-[0_0_10px_rgb(255_255_255_/1)] cursor-pointer hover:text-shadow-none transition-all"
               onClick={() => router.push("/login")}
            >
               Log in
            </a>
         </div>
      </header>
   );
};

export default Header;