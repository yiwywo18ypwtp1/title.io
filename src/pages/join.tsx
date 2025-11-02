import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from '@/contexts/Context';
import { useAlert } from "@/contexts/AlertContext";
import Head from "next/head";
import Header from "@/components/Header";
import axios from "axios";


const AuthPage = () => {
    const { setUser } = useUser();
    const { addAlert } = useAlert();

    const router = useRouter();
    const searchParams = useSearchParams();
    const action = searchParams.get("action");

    const [isLogin, setIsLogin] = useState(action !== "signup");

    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        setIsLogin(action !== "signup");
    }, [action]);

    const handleRegister = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (username && email && password) {
            try {
                await axios
                    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`, {
                        username,
                        email,
                        password
                    })

                router.push('/join?action=login');
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 409) {
                        addAlert("User with this username or email already exists", "error");
                    } else {
                        console.error("Server error:", error.message);
                    }
                } else {
                    console.error("Unexpected error:", error);
                }

                console.log(error)
            }
        } else {
            addAlert("Please enter username and password", "error");
            console.log('Fill all fields, please');
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (username && password) {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
                    username,
                    password
                });

                localStorage.setItem("token", response.data.token);

                const me = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
                    headers: {
                        Authorization: `Bearer ${response.data.token}`,
                    },
                });
                setUser(me.data);

                await router.push("/title-generator");
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 404) {
                        addAlert("No user found with this credentials", "error");
                    } else if (error.response?.status === 401) {
                        addAlert("Incorrect credentials, please be more attentive", "error");
                    } else if (error.response?.status === 500) {
                        addAlert("Server error. Please, try again later", "error");
                    }
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        } else {
            addAlert("Please enter username and password", "error");
            console.log("Fill all fields, please");
        }
    };

    return (
        <>
            <Head>
                <title>{isLogin ? "title.io | Log in" : "title.io | Sign up"}</title>
            </Head>

            <main className="main bg-gradient-to-br from-indigo-400/20 to-purple-400/20">
                <Header />

                <div className="flex flex-col justify-center items-center h-full w-full">
                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 20 }}
                                exit={{ opacity: 0, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="flex flex-col gap-8 justify-between items-center h-fit w-[25%] p-10 rounded-3xl border-1 border-[#89B4FA] bg-[#1E1E2E]/35 shadow-[0_0_15px_rgba(121,116,208,1)]"
                            >
                                <h1 className="text-[#89B4FA] text-4xl text-shadow-[0_0_5px_rgba(121,116,208,1)]">Welcome back!</h1>
                                <div className="flex flex-col w-full gap-8">
                                    <input
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Username"
                                        className="w-full h-12 border-1 text-[#89B4FA] px-4 py-2 rounded-2xl focus:outline-none focus:shadow-[0_0_15px_rgba(121,116,208,1)] transition-all duration-300"
                                    />
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        type="password"
                                        className="w-full h-12 border-1 text-[#89B4FA] px-4 py-2 rounded-2xl focus:outline-none focus:shadow-[0_0_15px_rgba(121,116,208,1)] transition-all duration-300"
                                    />
                                </div>

                                <p
                                    onClick={() => {
                                        router.push("/join?action=signup");
                                        setUsername(null);
                                        setPassword(null);
                                        setEmail(null);
                                    }}
                                    className="text-[#89B4FA] cursor-pointer hover:text-shadow-[0_0_5px_rgba(121,116,208,1)] transition-all duration-300"
                                >
                                    Don’t have an account yet?
                                </p>

                                <button
                                    onClick={handleLogin}
                                    className="purple-btn w-full h-12 rounded-2xl"
                                >
                                    Login!
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="signup"
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 20 }}
                                exit={{ opacity: 0, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="flex flex-col gap-8 justify-between items-center h-fit w-[25%] p-10 rounded-3xl border-1 border-[#89B4FA] bg-[#1E1E2E]/35 shadow-[0_0_15px_rgba(121,116,208,1)]"
                            >
                                <h1 className="text-[#89B4FA] text-4xl text-shadow-[0_0_5px_rgba(121,116,208,1)]">Sign up</h1>
                                <div className="flex flex-col w-full gap-8">
                                    <input
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Username"
                                        className="w-full h-12 border-1 text-[#89B4FA] px-4 py-2 rounded-2xl focus:outline-none focus:shadow-[0_0_15px_rgba(121,116,208,1)] transition-all duration-300"
                                    />
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        type="email"
                                        className="w-full h-12 border-1 text-[#89B4FA] px-4 py-2 rounded-2xl focus:outline-none focus:shadow-[0_0_15px_rgba(121,116,208,1)] transition-all duration-300"
                                    />
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        type="password"
                                        className="w-full h-12 border-1 text-[#89B4FA] px-4 py-2 rounded-2xl focus:outline-none focus:shadow-[0_0_15px_rgba(121,116,208,1)] transition-all duration-300"
                                    />
                                </div>

                                <p
                                    onClick={() => {
                                        router.push("/join?action=login");
                                        setUsername(null);
                                        setPassword(null);
                                        setEmail(null);
                                    }}
                                    className="text-[#89B4FA] cursor-pointer hover:text-shadow-[0_0_5px_rgba(121,116,208,1)] transition-all duration-300"
                                >
                                    Already have an account?
                                </p>

                                <button
                                    onClick={handleRegister}
                                    className="purple-btn w-full h-12 rounded-2xl"
                                >
                                    Register!
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </>
    );
}

export default AuthPage;
