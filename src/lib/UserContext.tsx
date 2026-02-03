import React, { createContext, useContext } from 'react';

type UserContextValue = {
  user: null;
};

const Ctx = createContext<UserContextValue>({ user: null });

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  return <Ctx.Provider value={{ user: null }}>{children}</Ctx.Provider>;
}

export function useUser() {
  return useContext(Ctx);
}
