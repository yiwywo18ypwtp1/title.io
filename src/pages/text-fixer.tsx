import { useEffect, useState } from "react";
import Head from 'next/head';
import TextWriter from "@/components/TextWriter";
import Loader from "@/components/Loader";
import Tooltip from "@/components/Tooltip";
import { highlightDifferences } from "@/utils/highlightDifferences";
import { useAlert } from "../contexts/AlertContext";
import axios from "axios";


const TextEditor = () => {
    const { addAlert } = useAlert();

    const [inputText, setInputText] = useState<string>("");
    const [outputText, setOutputText] = useState<string>("");
    const [textForCopy, setTextForCopy] = useState<string>("");

    const [highlighted, setHighlighted] = useState("");

    const [grammarCheck, setGrammarCheck] = useState<boolean>(false);
    const [autoFormat, setAutoFormat] = useState<boolean>(true);
    const [strongKeepStyle, setStrongKeepStyle] = useState<boolean>(false);

    const [isGenerated, setIsGenerated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [generateTime, setGenerateTime] = useState<number | null>(null);

    useEffect(() => {
        if (!isLoading) return;

        let time: number = 0;
        const timer = setInterval(() => {
            console.log(time.toFixed(1));
            time += 0.1;
        }, 100)

        return () => {
            if (timer) {
                console.log("finaly: " + time);
                setGenerateTime(parseFloat(time.toFixed(2)));
                clearInterval(timer);
            }
        };
    }, [isLoading]);

    const handleGenerate = async () => {
        setIsLoading(true);
        setIsGenerated(true);
        setOutputText("");
        setGenerateTime(null);

        if (!inputText) {
            addAlert("Enter the text before fixing!", "error");
            return;
        }

        const response = await axios.post("/api/textEdit", {
            text: inputText,
            isGrammarCheck: grammarCheck,
            isFormatCheck: autoFormat,
            strongKeepingStyle: strongKeepStyle
        });

        const { outputText } = response.data.result;
        const cleanText = outputText.replace(/<[^>]+>/g, "").trim();

        setIsLoading(false);
        setOutputText(outputText);
        setTextForCopy(cleanText);
        setHighlighted(highlightDifferences(inputText, cleanText));
    };

    const handleReset = () => {
        setIsGenerated(false);
        setInputText("");
        setOutputText("");
        setTextForCopy("");
        setHighlighted("");
        setGenerateTime(null);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(textForCopy);
    };

    return (
        <>
            <Head>
                <title>title.io | Text fixer</title>
                <link rel="icon" href="/logo.ico" />
            </Head>

            <main className="main bg-gradient-to-br from-indigo-400/20 to-purple-400/20">
                <div className="flex flex-col h-full w-full justify-center items-center">
                    <div className={`flex flex-row w-2/3 h-2/3 ${isGenerated ? "gap-5" : "gap-0"}`}>
                        <div className={`flex flex-col gap-4 h-full transition-all duration-500 ease-out ${isGenerated
                            ? "flex-[0.5]"
                            : "flex-[1]"
                            }`}
                        >
                            <textarea
                                value={inputText}
                                onChange={(e) => { setInputText(e.target.value) }}
                                className={`custom-scroll box-border w-full h-full bg-violet-300/30 py-4 px-5 rounded-b-md rounded-t-3xl resize-none text-[#89B4FA] ${inputText ? 'placeholder:text-left' : 'placeholder:text-center'} focus:outline-1 outline-[#89B4FA] focus:shadow-[0_0_7px_rgba(137,180,250,1)] focus:placeholder-transparent transition-all`}
                                rows={1}
                                placeholder={`${inputText ? inputText : 'Enter your text here'}`}
                                spellCheck={false}
                                required
                            />

                            <div className="w-full flex flex-col gap-4">
                                <div className="flex flex-row w-full items-center justify-center gap-5">
                                    <label className="flex items-center justify-center gap-4 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={grammarCheck}
                                            onChange={(e) => setGrammarCheck(e.target.checked)}
                                            className="
                                            appearance-none min-w-5 min-h-5 border border-prl rounded-md
                                            checked:bg-prl checked:shadow-prl-glw checked:cale-110
                                            transition-all duration-300 cursor-pointer
                                        "
                                        />
                                        <Tooltip text="Fixes sentence structure, tense agreement, and other grammatical issues">
                                            <span className="leading-none translate-y-[1px] text-lg">Check grammar</span>
                                        </Tooltip>
                                    </label>

                                    <label className="flex items-center justify-center gap-4 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={strongKeepStyle}
                                            onChange={(e) => setStrongKeepStyle(e.target.checked)}
                                            className="
                                            appearance-none min-w-5 min-h-5 border border-prl rounded-md 
                                            checked:bg-prl checked:shadow-prl-glw checked:cale-110
                                            transition-all duration-300 cursor-pointer
                                        "
                                        />
                                        <Tooltip text="Keeps slang, tone and personal writing style — only corrects real mistakes">
                                            <span className="leading-none translate-y-[1px] text-lg">Preserve author style</span>
                                        </Tooltip>
                                    </label>


                                    <label className="flex items-center justify-center gap-4 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={autoFormat}
                                            onChange={(e) => setAutoFormat(e.target.checked)}
                                            className="
                                            appearance-none min-w-5 min-h-5 border border-prl rounded-md 
                                            checked:bg-prl checked:shadow-prl-glw checked:cale-110
                                            transition-all duration-300 cursor-pointer
                                        "
                                        />
                                        <Tooltip text="Adds missing capital letters and punctuation marks">
                                            <span className="leading-none translate-y-[1px] text-lg">Auto-format</span>
                                        </Tooltip>
                                    </label>
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={isLoading}
                                    className={`purple-btn text-lg w-full min-h-12 rounded-t-md rounded-b-3xl ${isLoading && "opacity-50 pointer-events-none"}`}
                                >
                                    Fix text
                                </button>
                            </div>
                        </div>

                        <div
                            className={`flex items-center justify-center transition-all duration-500 ease-out${isGenerated
                                ? "opacity-100 scale-100 translate-x-0"
                                : "opacity-0 scale-0 translate-x-5"
                                }`}
                        >
                            <div className="">
                                {!isLoading ? (
                                    <img src="r-arrow.svg" className={`${isGenerated ? "h-8" : "h-0"}`} />
                                ) : (
                                    <Loader />
                                )}
                            </div>
                        </div>

                        <div
                            className={`box-border max-h-[80vh] flex flex-col gap-4 justify-between transition-all duration-500 ease-out ${isGenerated ? "opacity-100 translate-x-0 flex-[0.5]" : "opacity-0 translate-x-full flex-[0] pointer-events-none"}`}
                        >
                            <pre
                                className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-5 blue-br blue-txt rounded-t-3xl rounded-b-md custom-scroll"
                            >
                                <TextWriter text={highlighted} />
                            </pre>

                            {generateTime && <p className="absolute bottom-20.5 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full text-white text-xl">Generated in {generateTime}s ⏳</p>}

                            <div className="flex flex-row gap-4 w-full min-h-12 max-h-12 justify-center">
                                <button
                                    onClick={handleReset}
                                    className="h-full flex items-center justify-center rounded-md rounded-bl-3xl opacity-50 bg-violet-300/30 w-1/2 hover:bg-violet-300/50 transition-all duration-300 cursor-pointer"
                                >
                                    <img src="reload.svg" className="h-7" />
                                </button>

                                <button
                                    onClick={handleCopy}
                                    className="h-full flex items-center justify-center rounded-md rounded-br-3xl opacity-50 bg-violet-300/30 w-1/2 hover:bg-violet-300/50 transition-all duration-300 cursor-pointer"
                                >
                                    <img src="copy.svg" className="h-8" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default TextEditor