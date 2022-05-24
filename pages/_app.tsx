import { clientAuth } from "@/clientFirebase";
import MainLayout from "@/components/MainLayout/MainLayout";
import SignInView from "@/components/SignInView/SignInView";
import MainProvider from "@/providers/MainProvider";
import { User } from "firebase/auth";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    clientAuth.onAuthStateChanged((user) => setUser(user));
  }, []);
  1;
  return (
    <>
      <MainProvider>
        {user ? (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        ) : (
          <SignInView />
        )}
      </MainProvider>
    </>
  );
}

export default MyApp;
