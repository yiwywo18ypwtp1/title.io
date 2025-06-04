import React, {useEffect, useState} from 'react';
import axios from "axios";
import type {FC} from 'react';


type GenerateFormProps = {
   setIsGenerated: (val: boolean) => void;
   setTitleResult: (titles: string[]) => void;
   textInput: string;
   setTextInput: (textInput: string | null) => void;
};

const GenerateForm: FC<GenerateFormProps> = ({setIsGenerated, setTitleResult, setTextInput, textInput}) => {
   const [titleLength, setTitleLength] = useState<string>("medium");
   const [error, setError] = useState<string | null>(null);
   const [charCount, setCharCount] = useState<number>(0);
   const [file, setFile] = useState<File | undefined | null>(null);

   const handleSubmit = async () => {
      if (!textInput) {
         setError("Please enter your text before generating");
         return;
      } else if (textInput.trim().length < 100) {
         setError("The text must be more than 100");
         return;
      }
      setError(null);

      try {
         const res = await axios.post("/api/response", {
            prompt: `Придумай 3 заголовка к этому тексту. Максимально подходящие и ${titleLength} длины.  Верни результат строго в формате JSON массива. Никаких комментариев, без пояснений — просто массив: ["...", "...", "..."]. Сам текст: ${textInput}`,
         });

         const parsed = JSON.parse(res.data.result);
         console.log(parsed);

         setTitleResult(parsed);
         setIsGenerated(true);
      } catch (error) {
         console.error("Ошибка при генерации:", error);
      }
   };

   useEffect(() => {
      if (textInput) {
         setCharCount(textInput.length);
      } else {
         setCharCount(0)
      }
   }, [textInput])

   return (
      <div className="flex flex-col w-1/3 h-full">
         <div className="flex flex-col items-center gap-3 w-full h-full">
            <div
               className="flex flex-col items-center justify-center w-full h-1/2 p-3 outline-1 outline-dashed outline-[#89B4FA] rounded-t-2xl rounded-b-sm hover:outline-solid hover:shadow-[0_0_7px_rgba(137,180,250,1)] transition-all"
            >
               <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center px-3 py-1 text-[#89B4FA] rounded cursor-pointer text-center"
               >
                  {!file ? (
                     <div className="flex flex-col items-center justify-center">
                        <img
                           src='upload.svg' alt="Upload icon"
                           className="w-32 h-32 opacity-50 hover:drop-shadow-[0_0_7px_rgba(137,180,250,1)] transition-all "
                        />
                        <p className="text-[#89B4FA]/50 text-sm">Upload your file:</p>
                        <p className="text-[#89B4FA]/50 text-sm">&#39;.txt&#39;</p>
                     </div>
                  ) : (
                     <div className="flex flex-col items-center justify-center gap-3">
                        <p>Yey, you ready to generate :)</p>
                        <button
                           onClick={() => {
                              setFile(null);
                              setTextInput(null);
                           }}
                           className="border-1 rounded-3xl px-4 py-2 hover:drop-shadow-[0_0_7px_rgba(137,180,250,1)] transition-all hover:bg-[#89B4FA] hover:text-white hover:border-[#89B4FA]"
                        >
                           Clear
                        </button>
                     </div>
                  )}
               </label>


               <input
                  id="file-upload"
                  type="file"
                  accept=".txt"
                  onChange={(e) => {
                     const selectedFile = e.target.files?.[0];
                     if (selectedFile) {
                        setFile(selectedFile);
                        const reader = new FileReader();
                        reader.onload = (event) => {
                           const text = event.target?.result as string;
                           setTextInput(text);
                        };
                        reader.readAsText(selectedFile, "UTF-8");
                     }
                  }}
                  className="hidden"
               />
            </div>

            {error ? (
               <p className="text-red-400 text-m transition-opacity animate-pulse">{error}</p>
            ) : (
               <p className="text-[#89B4FA] text-m">or</p>
            )}


            <div className="relative w-full h-[50%]">
              <textarea
                 onChange={(e) => {
                    setTextInput(e.target.value);
                    setError(null);
                 }}
                 className={`custom-scroll box-border w-full h-full bg-violet-300/30 py-3 px-4 rounded-sm resize-none text-[#89B4FA] ${textInput ? 'placeholder:text-left' : 'placeholder:text-center'} focus:outline-1 outline-[#89B4FA] focus:shadow-[0_0_7px_rgba(137,180,250,1)] focus:placeholder-transparent transition-all`}
                 rows={1}
                 placeholder={`${textInput ? textInput : 'Enter your text here'}`}
                 spellCheck={false}
                 required
              />

               {charCount < 100 ?
                  <p className="absolute bottom-1 right-2.5 text-[#89B4FA] select-none">{charCount}/100</p>
                  :
                  <p className="absolute bottom-1 right-2.5 text-[#89B4FA] select-none">{charCount}</p>
               }
            </div>

            <div className="flex flex-row w-full h-1/10 gap-3">
               <select
                  value={titleLength}
                  onChange={(e) => setTitleLength(e.target.value)}
                  className="border-1 border-[#7974d0] w-1/2 self-end min-h-[2.5rem] rounded-sm rounded-bl-2xl h-full cursor-pointer transition-all hover:w-[85%] hover:shadow-[0_0_15px_rgba(121,116,208,1)] hover:text-shadow-[0_0_5px_rgb(255_255_255/_1)] text-center focus:outline-none"
               >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
               </select>
               <button
                  onClick={handleSubmit}
                  className="bg-[#7974d0] w-1/2 self-end min-h-[2.5rem]
                     rounded-sm rounded-br-2xl h-full cursor-pointer transition-all hover:w-[85%] hover:shadow-[0_0_15px_rgba(121,116,208,1)] text-shadow-[0_0_5px_rgb(255_255_255/_1)] hover:text-shadow-none"
               >
                  Generate!
               </button>
            </div>
         </div>
      </div>
   );
};

export default GenerateForm;