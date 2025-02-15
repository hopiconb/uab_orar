import React, { createContext, useState, useContext, ReactNode } from "react";
import { User } from "../src/types/user";

interface MyContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AppContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = (): MyContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
