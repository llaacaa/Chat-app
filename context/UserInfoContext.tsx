"use client"; // Ensure it's a client component

import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types/context";

type GlobalContextType = {
  userState: User | null;
  setUserState: React.Dispatch<React.SetStateAction<User | null>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({
  userData,
  children,
}: {
  userData: User;
  children: ReactNode;
}) => {
  const [userState, setUserState] = useState<User | null>(userData);

  return (
    <GlobalContext.Provider value={{ userState, setUserState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useUserState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useUserState must be used within a GlobalProvider");
  }
  return context;
};
