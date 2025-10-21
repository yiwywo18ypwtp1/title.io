import { useState } from "react";
import { useRouter } from 'next/router'


const Card = ({ title, text, link }: { title: string; text: string, link: string }) => {
    const router = useRouter();
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="glow-wrapper"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="gradient-border rounded-3xl w-100 flex flex-col items-center relative overflow-hidden">
                <div
                    className="flex flex-col items-center m-10 gap-5 text-center"
                    style={{
                        paddingBottom: hovered ? "5rem" : "1.25rem",
                        transition: "padding-bottom .4s ease",
                    }}
                >
                    <h1 className="txt-sh-white text-3xl">{title}</h1>
                    <p className="text-xl">{text}</p>
                </div>

                <button
                    className="purple-btn rounded-full py-3 px-5 mb-4 absolute transition-all duration-500 ease-in-out"
                    style={{
                        left: "50%",
                        bottom: "1.5rem",
                        transform: hovered
                            ? "translate(-50%, 0)"
                            : "translate(-50%, 14px)",
                        opacity: hovered ? 1 : 0,
                        pointerEvents: hovered ? "auto" : "none",
                    }}
                >
                    <div
                        onClick={() => router.push(link)}
                        className="flex flex-row items-center justify-center gap-3"
                    >
                        Get started
                        <span className="relative inline-block h-4 w-4">
                            <img src="/r-arrow.svg" alt="" className="absolute inset-0 h-4 w-4 blur-[6px] opacity-80 pointer-events-none" />
                            <img src="/r-arrow.svg" alt="arrow" className="relative h-4 w-4" />
                        </span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Card;