import { doc, runTransaction, setDoc, updateDoc } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import type { ProductKey } from "@/lib/billing";

export type UsageCheckResult = {
  allowed: boolean;
  hasPaid: boolean;
  freeUsesRemaining: number;
};

const DEFAULT_FREE_USES = 3;

export async function decreaseUsage(uid: string) {
  const db = getFirebaseDb();
  const userRef = doc(db, "users", uid);

  return runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(userRef);

    if (!snapshot.exists()) {
      transaction.set(
        userRef,
        {
          freeUsesRemaining: DEFAULT_FREE_USES - 1,
          hasPaid: false,
        },
        { merge: true },
      );
      return DEFAULT_FREE_USES - 1;
    }

    const data = snapshot.data();
    const hasPaid = Boolean(data.hasPaid);
    const freeUsesRemaining = Math.max(0, Number(data.freeUsesRemaining ?? 0));

    if (hasPaid) {
      return freeUsesRemaining;
    }

    if (freeUsesRemaining <= 0) {
      return 0;
    }

    const nextRemaining = freeUsesRemaining - 1;
    transaction.update(userRef, { freeUsesRemaining: nextRemaining });
    return nextRemaining;
  });
}

export async function checkUserUsage(uid: string): Promise<UsageCheckResult> {
  const db = getFirebaseDb();
  const userRef = doc(db, "users", uid);

  return runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(userRef);

    if (!snapshot.exists()) {
      transaction.set(
        userRef,
        {
          freeUsesRemaining: DEFAULT_FREE_USES - 1,
          hasPaid: false,
        },
        { merge: true },
      );
      return {
        allowed: true,
        hasPaid: false,
        freeUsesRemaining: DEFAULT_FREE_USES - 1,
      };
    }

    const data = snapshot.data();
    const hasPaid = Boolean(data.hasPaid);
    const freeUsesRemaining = Math.max(0, Number(data.freeUsesRemaining ?? 0));

    if (hasPaid) {
      return { allowed: true, hasPaid: true, freeUsesRemaining };
    }

    if (freeUsesRemaining <= 0) {
      return { allowed: false, hasPaid: false, freeUsesRemaining: 0 };
    }

    const nextRemaining = freeUsesRemaining - 1;
    transaction.update(userRef, { freeUsesRemaining: nextRemaining });

    return {
      allowed: true,
      hasPaid: false,
      freeUsesRemaining: nextRemaining,
    };
  });
}

export async function unlockAccess(uid: string) {
  const db = getFirebaseDb();
  const userRef = doc(db, "users", uid);

  try {
    await updateDoc(userRef, { hasPaid: true });
  } catch {
    await setDoc(userRef, { hasPaid: true, freeUsesRemaining: DEFAULT_FREE_USES }, { merge: true });
  }
}

export async function resetUserAccess(uid: string) {
  const db = getFirebaseDb();
  const userRef = doc(db, "users", uid);

  await setDoc(
    userRef,
    {
      hasPaid: false,
      freeUsesRemaining: DEFAULT_FREE_USES,
      purchasedTools: [],
    },
    { merge: true },
  );
}

export async function grantPurchasedAccess(uid: string, productKey: ProductKey) {
  const db = getFirebaseDb();
  const userRef = doc(db, "users", uid);

  if (productKey === "suite") {
    await setDoc(
      userRef,
      {
        hasPaid: true,
      },
      { merge: true },
    );
    return;
  }

  const snapshot = await runTransaction(db, async (transaction) => {
    const current = await transaction.get(userRef);
    const existingTools = Array.isArray(current.data()?.purchasedTools)
      ? (current.data()?.purchasedTools as string[])
      : [];
    const nextTools = existingTools.includes(productKey) ? existingTools : [...existingTools, productKey];
    transaction.set(
      userRef,
      {
        purchasedTools: nextTools,
      },
      { merge: true },
    );
    return nextTools;
  });

  return snapshot;
}
