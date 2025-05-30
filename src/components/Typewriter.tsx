import {useEffect, useState} from "react";

interface TypewriterProps {
   texts: string[];
   typingSpeed?: number;
   pauseBetween?: number;
}

export const Typewriter = ({texts, typingSpeed = 50, pauseBetween = 800}: TypewriterProps) => {
   const [allDisplayedText, setAllDisplayedText] = useState<string[]>([]);
   const [currentTextIndex, setCurrentTextIndex] = useState(0);
   const [charIndex, setCharIndex] = useState(0);
   const [currentLine, setCurrentLine] = useState("");

   useEffect(() => {
      setAllDisplayedText([]);
      setCurrentTextIndex(0);
      setCharIndex(0);
      setCurrentLine("");
   }, [texts]);

   useEffect(() => {
      if (currentTextIndex >= texts.length) return;

      const currentText = texts[currentTextIndex];

      if (charIndex < currentText.length) {
         const timeout = setTimeout(() => {
            setCurrentLine((prev) => prev + currentText[charIndex]);
            setCharIndex((prev) => prev + 1);
         }, typingSpeed);
         return () => clearTimeout(timeout);
      } else {
         const timeout = setTimeout(() => {
            setAllDisplayedText((prev) => [...prev, currentText]);
            setCurrentLine("");
            setCharIndex(0);
            setCurrentTextIndex((prev) => prev + 1);
         }, pauseBetween);
         return () => clearTimeout(timeout);
      }
   }, [charIndex, currentTextIndex, texts, typingSpeed, pauseBetween]);

   return (
      <div className="text-xl font-bold text-[#CBA6F7] text-shadow-[0_0_10px_rgb(206_166_247_/_1)] space-y-2">
         {allDisplayedText.map((line, idx) => (
            <p key={idx}>{line}</p>
         ))}
         {currentLine && (
            <p>
               {currentLine}
               <span className="animate-pulse">|</span>
            </p>
         )}
      </div>
   );
};
