import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { createNotification } from "./notification_service";
const projectCollection = "projects";

export const createProject = async (name, access) => {
  try {
    const projectData = {
      name: name,
      access: access,
      comments: [],
    };

    const col = collection(db, projectCollection);
    await addDoc(col, projectData);
    await createNotification(`Project created with name ${name}`);
  } catch (error) {
    throw Error(error);
  }
};

export const getProjects = async () => {
  const q = query(collection(db, projectCollection));
  const docs = await getDocs(q);
  let projects = [];
  docs.forEach((doc) => {
    projects.push({
      projectId: doc.id,
      ...doc.data(),
    });
  });
  return projects;
};

export const getProjectById = async (projectId) => {
  try {
    const docRef = doc(db, projectCollection, projectId);
    const docSnap = await getDocs(docRef);

    if (docSnap.exists()) {
      return {
        projectId: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    throw Error(error);
  }
};

export const updateProject = async (projectId, newData) => {
  try {
    const docRef = doc(db, projectCollection, projectId);
    await updateDoc(docRef, newData);
  } catch (error) {
    throw Error(error);
  }
};

export const deleteProject = async (projectId) => {
  try {
    await deleteDoc(doc(db, projectCollection, projectId));
  } catch (error) {
    throw Error(error);
  }
};

export const addUserToProject = async (projectId, userId) => {
  try {
    const projectDocRef = doc(db, projectCollection, projectId);
    await updateDoc(projectDocRef, {
      users: arrayUnion(userId), // Assuming you have a field 'users' in your project document
    });
    await createNotification(`User added to the project`);
  } catch (error) {
    throw Error(error);
  }
};
export const removeUserFromProject = async (projectId, userId) => {
  try {
    const projectDocRef = doc(db, projectCollection, projectId);
    await updateDoc(projectDocRef, {
      users: arrayRemove(userId),
    });
  } catch (error) {
    throw Error(error);
  }
};
