import { useEffect, useState } from "react";

type ErrorProps = {
    text: string;
    type: "error" | "success";
    duration?: number;
    setError: (value: boolean) => void;
};

const Alert = ({ text, type, duration = 3000, setError }: ErrorProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 10);

        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => setError(false), 500);
        }, duration);

        return () => clearTimeout(timer);
    }, [text]);

    const bgColor =
        type === "success" ? "bg-green-400" : type === "error" ? "bg-red-400" : "";

    return (
        <div
            className={`fixed bottom-5 right-10 transform -translate-y-1/2 ${bgColor} px-4 py-3 rounded-xl text-white transition-all duration-500 ${isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-25"
                }`}
        >
            {text}
        </div>
    );
};

export default Alert;