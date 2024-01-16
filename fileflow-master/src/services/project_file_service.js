import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  updateDoc,
  deleteDoc,
  where,
  addDoc,
} from "firebase/firestore";
import { createNotification } from "./notification_service";

const fileCollection = "files";

export const createFile = async (projectId, name, downloadUrl, type) => {
  try {
    const fileData = {
      projectId: projectId,
      name: name,
      downloadUrl: downloadUrl,
      type: type,
      status: "active",
      comments: [], // Initialize comments as an empty array
    };

    const col = collection(db, fileCollection);
    await addDoc(col, fileData);
    await createNotification(`New file uploaded: ${name}`);
  } catch (error) {
    throw Error(error);
  }
};

export const getFilesByProjectId = async (projectId) => {
  const q = query(
    collection(db, fileCollection),
    where("projectId", "==", projectId)
  );
  const docs = await getDocs(q);
  let files = [];
  docs.forEach((doc) => {
    files.push({
      fileId: doc.id,
      ...doc.data(),
    });
  });
  return files;
};

export const getFiles = async () => {
  const q = query(
    collection(db, fileCollection),
    where("status", "==", "active")
  );
  const docs = await getDocs(q);
  let files = [];
  docs.forEach((doc) => {
    files.push({
      fileId: doc.id,
      ...doc.data(),
    });
  });
  return files;
};
export const getBinFiles = async () => {
  const q = query(
    collection(db, fileCollection),
    where("status", "==", "inactive")
  );
  const docs = await getDocs(q);
  let files = [];
  docs.forEach((doc) => {
    files.push({
      fileId: doc.id,
      ...doc.data(),
    });
  });
  return files;
};

export const getFileById = async (fileId) => {
  try {
    const docRef = doc(db, fileCollection, fileId);
    const docSnap = await getDocs(docRef);

    if (docSnap.exists()) {
      return {
        fileId: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    throw Error(error);
  }
};

export const updateFile = async (fileId, newData) => {
  try {
    const docRef = doc(db, fileCollection, fileId);
    await updateDoc(docRef, newData);
  } catch (error) {
    throw Error(error);
  }
};

export const deleteFile = async (fileId) => {
  try {
    await deleteDoc(doc(db, fileCollection, fileId));
  } catch (error) {
    throw Error(error);
  }
};

export const addCommentToFile = async (fileId, comment) => {
  try {
    const docRef = doc(db, fileCollection, fileId);
    const fileDoc = await getDoc(docRef);

    if (fileDoc.exists()) {
      const currentComments = fileDoc.data().comments || [];

      const updatedComments = [...currentComments, comment];

      await updateDoc(docRef, { comments: updatedComments });

      return fileId;
    }
  } catch (error) {
    throw Error(error);
  }
};

export const renameFile = async (fileId, newName) => {
  try {
    const docRef = doc(db, fileCollection, fileId);
    await updateDoc(docRef, { name: newName });
    await createNotification(`File with id ${fileId} renamed to ${newName}`);
  } catch (error) {
    throw Error(error);
  }
};

export const moveToRecycle = async (fileId) => {
  try {
    const docRef = doc(db, fileCollection, fileId);
    await updateDoc(docRef, { status: "inactive" });
    await createNotification(`File with id ${fileId} moved to bin`);
  } catch (error) {
    throw Error(error);
  }
};
