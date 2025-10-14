import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

type User = {
   username: string;
   email: string;
} | null;

type UserContextType = {
   user: User;
   setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<User>(null);

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) return;

      axios
         .get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
         })
         .then((res) => setUser(res.data))
         .catch(() => setUser(null));
   }, []);

   return (
      <UserContext.Provider value={{ user, setUser }}>
         {children}
      </UserContext.Provider>
   );
};

export const useUser = () => {
   const context = useContext(UserContext);
   if (!context) {
      throw new Error("useUser must be used within a UserProvider");
   }
   return context;
};
