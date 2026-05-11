'use client';

import { createContext, useContext, useState, ReactNode } from "react";

type HeaderAction = ReactNode | null;

interface HeaderContextType {
  action: HeaderAction;
  setAction: (action: HeaderAction) => void;
  actionSecound: HeaderAction;
  setActionSecound: (action: HeaderAction) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

const HeaderActionsContext = createContext<HeaderContextType>({
  action: null,
  setAction: () => {},
  actionSecound: null,
  setActionSecound: () => {},
  isActive: false,
  setIsActive: () => {},
});

export const useHeaderAction = () => useContext(HeaderActionsContext);

export const HeaderActionsProvider = ({ children }: { children: ReactNode }) => {
  const [action, setAction] = useState<HeaderAction>(null);
  const [actionSecound, setActionSecound] = useState<HeaderAction>(null);
  const [isActive, setIsActive] = useState(false); 

  return (
    <HeaderActionsContext.Provider value={{ action, setAction, actionSecound, setActionSecound, isActive, setIsActive }}>
      {children}
    </HeaderActionsContext.Provider>
  );
};
