"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface Profile {
  name: string;
  email: string;
}

const empty: Profile = { name: "", email: "" };

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
      if (raw) {
        const parsed = JSON.parse(raw);
        setProfileState({ name: parsed.name ?? "", email: parsed.email ?? "" });
      }
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
