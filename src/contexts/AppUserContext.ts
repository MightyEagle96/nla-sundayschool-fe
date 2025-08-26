import { createContext, useContext } from "react";

export interface AppUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isConfirmed: boolean;
  phoneNumber?: string;
  category?: string;
  className?: string;
  title?: string;
  gender?: string;
}

export interface AppUserContextType {
  appUser: AppUser | null;
  setAppUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
}

export const AppUserContext = createContext<AppUserContextType>({
  appUser: null,
  setAppUser: () => {
    throw new Error("setAppUser must be used within AppUserProvider");
  },
});

export const useAppUser = () => {
  const context = useContext(AppUserContext);
  if (context === undefined) {
    throw new Error("useAppUser must be used within an AppUserProvider");
  }
  return context;
};
