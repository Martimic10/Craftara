import type { User } from "firebase/auth";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";

const provider = new GoogleAuthProvider();

async function ensureUserDocument(user: User) {
  const db = getFirebaseDb();
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      name: user.displayName ?? "",
      email: user.email ?? "",
      photoURL: user.photoURL ?? "",
      createdAt: serverTimestamp(),
      freeUsesRemaining: 3,
      hasPaid: false,
      purchasedTools: [],
    });
  }
}

export async function signInWithGoogle() {
  const auth = getFirebaseAuth();
  const credential = await signInWithPopup(auth, provider);
  await ensureUserDocument(credential.user);
  return credential.user;
}

export async function logoutUser() {
  const auth = getFirebaseAuth();
  await signOut(auth);
}

export function subscribeToAuthState(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
}
