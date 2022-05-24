import { clientAuth } from "@/clientFirebase";
import { queryWithAuthorization } from "@/utils/client";
import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import nookies from "nookies";

export const UserContext = createContext<{ user: User | null; admin: boolean }>(
  { user: null, admin: false }
);

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    return clientAuth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        setUser(user);
        const token = await user.getIdToken();
        nookies.set(undefined, "token", token, { path: "/" });
        const { admin } = await queryWithAuthorization<{ admin: boolean }>(
          "get",
          "/api/admin"
        );
        setAdmin(admin);
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = clientAuth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <UserContext.Provider value={{ user, admin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const user = useContext(UserContext);
  if (!user) {
    throw Error("useError needs to be inside UserProvider");
  }
  return user;
};

export default useUser;
