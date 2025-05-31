import React, {useState} from 'react';
import axios from "axios";
import type {FC} from 'react';


type GenerateFormProps = {
   setIsGenerated: (val: boolean) => void;
   setTitleResult: (titles: string[]) => void;
   textInput: string;
   setTextInput: (textInput: any) => void;
};

const GenerateForm: FC<GenerateFormProps> = ({setIsGenerated, setTitleResult, setTextInput, textInput}) => {
   const [titleLength, setTitleLength] = useState<string>("medium");
   const [error, setError] = useState<string | null>(null);


   const handleSubmit = async () => {
      if (!textInput.trim()) {
         setError("Please enter your text before generating.");
         return;
      } else if (textInput.trim().length < 80) {
         setError("The text must be more than 30");
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
         console.error("Ошибка при запросе:", error);
      }
   };

   return (
      <div className="flex flex-col w-1/3 h-full">
         <div className="flex flex-col items-center gap-3 w-full h-full">
            <div
               className="flex flex-col items-center justify-center w-full h-1/2 p-3 outline-1 outline-dashed outline-[#89B4FA] rounded-t-2xl rounded-b-sm hover:outline-solid hover:shadow-[0_0_7px_rgba(137,180,250,1)] transition-all">
               <img src='upload.svg' alt="Upload icon" className="w-32 h-32 opacity-50"/>
               <p className="text-[#89B4FA]/50 text-sm">Upload your file:</p>
               <p className="text-[#89B4FA]/50 text-sm">'.txt, .docx'</p>
            </div>

            <p className="text-[#89B4FA] text-m">or</p>

            <textarea
               onChange={(e) => {
                  setTextInput(e.target.value);
               }}
               className="custom-scroll box-border w-full h-1/2 bg-violet-300/30 py-3 px-4 rounded-sm resize-none text-[#89B4FA] placeholder:text-center focus:outline-1 outline-[#89B4FA] focus:shadow-[0_0_7px_rgba(137,180,250,1)] focus:placeholder-transparent transition-all"
               rows={1}
               placeholder="Enter your text here"
               spellCheck={false}
               required
            />

            {error && (
               <p className="text-red-400 text-sm transition-opacity animate-pulse">{error}</p>
            )}

            <div className="flex flex-row w-full h-1/10 gap-3">
               <select
                  value={titleLength}
                  onChange={(e) => setTitleLength(e.target.value)}
                  className="border-1 border-[#7974d0] w-1/2 self-end min-h-[2.5rem] rounded-sm rounded-bl-2xl h-full cursor-pointer transition-all hover:w-[85%] hover:shadow-[0_0_15px_rgba(121,116,208,1)] text-center focus:outline-none"
               >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
               </select>
               <button
                  onClick={handleSubmit}
                  className="bg-[#7974d0] w-1/2 self-end min-h-[2.5rem]
                             rounded-sm rounded-br-2xl h-full cursor-pointer transition-all hover:w-[85%] hover:shadow-[0_0_15px_rgba(121,116,208,1)] text-shadow-[0_0_5px_rgb(255_255_255/_1)]"
               >
                  Generate!
               </button>
            </div>
         </div>
      </div>
   );
};

export default GenerateForm;