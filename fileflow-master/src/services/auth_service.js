import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("email", email);
  } catch (error) {
    throw Error(error);
  }
};

export const signupUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data) => {
  const uid = auth.currentUser.uid;
  try {
    if (uid) {
      const ref = doc(db, "users", uid);
      await setDoc(ref, data);
      localStorage.setItem("email", data.email);
      window.location.reload();
    }
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserData = async () => {
  const uid = auth.currentUser.uid;
  try {
    const docRef = doc(db, "users", uid);
    const d = await getDoc(docRef);
    if (d.exists) {
      return d.data();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data, id) => {
  try {
    console.log(`${data} ${id}`);
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, data);
  } catch (error) {
    throw error;
  }
};

export const signout = async () => {
  await signOut(auth);
};

export const getUsers = async () => {
  const q = query(collection(db, "users"));
  const docs = await getDocs(q);
  let users = [];
  docs.forEach((doc) => {
    users.push({
      projectId: doc.id,
      ...doc.data(),
    });
  });

  return users;
};

export const deleteUser = async (id) => {
  try {
    await deleteDoc(doc(db, "users", id));
  } catch (err) {
    throw Error(err);
  }
};
