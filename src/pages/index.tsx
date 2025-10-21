import React, { useState } from "react";
import Card from '@/components/Card'
import { useRouter } from 'next/router'


const WelcomePage = () => {
    const router = useRouter();
    const [hovered, setHovered] = useState(false);

    return (
        <>
            <main className="main bg-img overflow-visible">
                <header className="w-full py-4 px-6 flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-5">
                        <img src="logo-wh.svg" alt="logo" className="h-8 drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
                        <h1 className="text-4xl txt-sh-white">title.io</h1>
                    </div>

                    <div className="flex flex-row gap-3 items-center">
                        <button
                            onClick={() => router.push("/login")}
                            className="text-lg rounded-full py-2 w-28 white-href hover:cursor-pointer"
                        >
                            Log in
                        </button>
                        <button
                            onClick={() => router.push("/signup")}
                            className="text-lg border-1 rounded-full py-2 w-28 purple-br purple-sh purple-btn-empty"
                        >
                            Sign up
                        </button>
                    </div>
                </header>

                <div className="flex flex-col justify-between items-center gap-10 w-full mt-25 overflow-visible">
                    <div className="flex flex-col items-center brightness-125">
                        <h1 className="text-6xl pink-txt-sh">- Welcome to -</h1>
                        <h1 className="text-9xl pink-txt-sh">Title.io</h1>
                    </div>

                    <h1 className="text-3xl pink-txt-sh brightness-125">AI-powered tool to enhance your texts</h1>

                    <div className="flex flex-row items-start gap-14 mt-6 overflow-visible">
                        <Card
                            title="Title generator"
                            text="
                                Craft bold, catchy titles powered by AI.
                                Designed to grab attention and spark interest instantly.
                            "
                            link="/title-generator"
                        />

                        <Card
                            title="Length changer"
                            text="
                                Instantly make your text longer or shorter —
                                smart, natural, and always on point.
                            "
                            link="/title-generator"
                        />

                        <Card
                            title="Text Fixer"
                            text="
                                Improve your text in one click —
                                fix grammar, flow, and clarity while keeping your style intact.
                            "
                            link="/title-generator"
                        />
                    </div>
                </div>
            </main>
        </>
    )
}

export default WelcomePage;