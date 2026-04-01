"use client";

import type { User } from "firebase/auth";
import type { ReactNode } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { subscribeToAuthState } from "@/lib/auth";
import { getFirebaseDb } from "@/lib/firebase";
import { checkUserUsage, resetUserAccess, unlockAccess } from "@/lib/usage";

type UserProfileData = {
  freeUsesRemaining: number;
  hasPaid: boolean;
  purchasedTools: string[];
};

type BeforeToolRunResult = {
  allowed: boolean;
  reason: "allowed" | "limit" | "unauthenticated";
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  profileLoading: boolean;
  freeUsesRemaining: number;
  hasPaid: boolean;
  purchasedTools: string[];
  beforeToolRun: () => Promise<BeforeToolRunResult>;
  unlockUnlimited: () => Promise<void>;
  resetTestAccess: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = subscribeToAuthState((nextUser) => {
        setUser(nextUser);
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      console.error(error);
      setLoading(false);
      return undefined;
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }

    setProfileLoading(true);
    const db = getFirebaseDb();
    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (snapshot) => {
        const data = snapshot.data();
        setProfile({
          freeUsesRemaining: Math.max(0, Number(data?.freeUsesRemaining ?? 0)),
          hasPaid: Boolean(data?.hasPaid),
          purchasedTools: Array.isArray(data?.purchasedTools)
            ? data.purchasedTools.filter((value: unknown) => typeof value === "string")
            : [],
        });
        setProfileLoading(false);
      },
      (error) => {
        console.error(error);
        setProfileLoading(false);
      },
    );

    return unsubscribe;
  }, [user]);

  const beforeToolRun = useCallback(async (): Promise<BeforeToolRunResult> => {
    if (!user) {
      return { allowed: false, reason: "unauthenticated" };
    }

    const result = await checkUserUsage(user.uid);
    if (!result.allowed) {
      return { allowed: false, reason: "limit" };
    }

    return { allowed: true, reason: "allowed" };
  }, [user]);

  const unlockUnlimited = useCallback(async () => {
    if (!user) return;
    await unlockAccess(user.uid);
  }, [user]);

  const resetTestAccess = useCallback(async () => {
    if (!user) return;
    await resetUserAccess(user.uid);
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      loading,
      profileLoading,
      freeUsesRemaining: profile?.freeUsesRemaining ?? 0,
      hasPaid: Boolean(profile?.hasPaid),
      purchasedTools: profile?.purchasedTools ?? [],
      beforeToolRun,
      unlockUnlimited,
      resetTestAccess,
    }),
    [
      beforeToolRun,
      loading,
      profile?.freeUsesRemaining,
      profile?.hasPaid,
      profile?.purchasedTools,
      profileLoading,
      resetTestAccess,
      unlockUnlimited,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
