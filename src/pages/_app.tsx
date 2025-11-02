import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from '@/contexts/Context';
import { AlertProvider } from "@/contexts/AlertContext";
import { useRouter } from "next/router";
import Header from "@/components/Header";


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isMainPage = router.pathname === "/";

  return (
    <UserProvider>
      <AlertProvider>
        <Header isBg={!isMainPage} />
        <Component {...pageProps} />
      </AlertProvider>
    </UserProvider >
  );
}
