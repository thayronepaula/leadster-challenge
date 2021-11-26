import { createContext, ReactNode } from "react";

type AuthContextData = {
  search: string;
};

export const SearchContext = createContext({} as AuthContextData);

type SearchProviderProps = {
  children: ReactNode;
};

export function SearchProvider({ children }: SearchProviderProps) {
  return (
    <SearchContext.Provider value={{ search: "Thayrone" }}>
      {children}
    </SearchContext.Provider>
  );
}
