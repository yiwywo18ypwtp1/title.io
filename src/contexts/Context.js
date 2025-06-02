import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      axios.get('http://localhost:3001/api/users/me', { withCredentials: true })
         .then(res => setUser(res.data))
         .catch(() => setUser(null));
   }, []);

   return (
      <UserContext.Provider value={{ user, setUser }}>
         {children}
      </UserContext.Provider>
   );
};

export const useUser = () => useContext(UserContext);