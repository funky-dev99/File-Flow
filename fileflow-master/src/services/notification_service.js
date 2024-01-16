import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
const notificationsCollection = "notifications";
export const createNotification = async (message) => {
  try {
    const notificationData = {
      message: message,
      timestamp: serverTimestamp(),
    };

    const notificationsCol = collection(db, notificationsCollection);
    await addDoc(notificationsCol, notificationData);
  } catch (error) {
    throw Error(error);
  }
};
export const getNotifications = async () => {
  try {
    const notificationsCol = collection(db, notificationsCollection);
    const notificationsQuery = query(
      notificationsCol,
      orderBy("timestamp", "desc") // Order notifications by timestamp in descending order
    );

    const notificationsSnapshot = await getDocs(notificationsQuery);

    const notifications = notificationsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return notifications;
  } catch (error) {
    throw Error(error);
  }
};
