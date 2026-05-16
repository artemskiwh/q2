"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface Profile {
  name: string;
  phone: string;
  email: string;
  company: string;
}

const empty: Profile = { name: "", phone: "", email: "", company: "" };

interface ProfileCtx {
  profile: Profile;
  setProfile: (p: Profile) => void;
}

const ProfileContext = createContext<ProfileCtx>({ profile: empty, setProfile: () => {} });

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<Profile>(empty);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tyag_profile");
      if (raw) setProfileState(JSON.parse(raw));
    } catch {}
  }, []);

  const setProfile = (p: Profile) => {
    setProfileState(p);
    try {
      localStorage.setItem("tyag_profile", JSON.stringify(p));
    } catch {}
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
