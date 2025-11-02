import React from 'react';
import { useRouter } from 'next/router'
import { useUser } from '@/contexts/Context';


const WelcomeHeader = ({ isBg: isBg = true }: { isBg?: boolean }) => {
    const { user, setUser } = useUser();
    const router = useRouter()

    const handleLogout = async () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <>
            <header className={`fixed top-0 left-0 w-full py-3 px-4 flex flex-row items-center justify-between ${isBg ? "bg-prl shadow-prl-glw" : "bg-transparent"} transition-all duration-300`}>
                <div
                    onClick={() => router.push("/")}
                    className="flex flex-row items-center gap-4 cursor-pointer hover:drop-shadow-none drop-shadow-[0_0_5px_rgba(255,255,255,1)] transition-all duration-200"
                >
                    <img src="logo-wh.svg" alt="logo" className="h-7" />
                    <h1 className="text-3xl">title.io</h1>
                </div>
                {user ? (
                    <div className="flex flex-row gap-3 items-center">
                        <h1 className="text-shadow-[0_0_10px_rgb(255_255_255_/1)]">Hi, {user.username}!</h1>
                        <p className="text-shadow-[0_0_10px_rgb(255_255_255_/1)]">|</p>
                        <div className="flex flex-row gap-2 drop-shadow-[0_0_10px_rgb(255_255_255_/1)] cursor-pointer hover:drop-shadow-none transition-all">
                            <button
                                onClick={handleLogout}
                                className="text-md border-1 border-transparent py-2 text-center transition-all duration-200 cursor-pointer"
                            >
                                Log out
                            </button>
                            <img src='logout.svg' alt="Upload icon" className="w-5 opacity-80 " />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row gap-3 items-center">
                        <button
                            onClick={() => router.push("/join?action=login")}
                            className="text-md rounded-full py-2 w-28 white-href text-center hover:cursor-pointer"
                        >
                            Log in
                        </button>
                        <button
                            onClick={() => router.push("/join?action=signup")}
                            className={`text-md border-1 rounded-full py-2 w-28 text-center transition-all duration-200 cursor-pointer ${isBg
                                ? "hover:border-white hover:bg-white hover:text-prl hover:shadow-wht-glw bg-white/0 text-white text-shadow-wht"
                                : "border-prl shadow-prl purple-btn-empty"}`}
                        >
                            Sign up
                        </button>
                    </div>
                )}

            </header>
        </>
    );
};

export default WelcomeHeader;