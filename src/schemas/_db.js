import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { serviceAccount } from "../config/livefeed-edea6-firebase-adminsdk-ih3mi-c292780a9f.js";

export const initializeDb = async () => {
  admin.initializeApp({
    credential: cert(serviceAccount),
  });

  const db = getFirestore();

  return db;
};

