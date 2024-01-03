import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { serviceAccount } from "../config/livefeed-edea6-firebase-adminsdk-ih3mi-c292780a9f.js";
import pkg from "jsonwebtoken";

const { sign, verify } = pkg;

const tokenUID = "livefeed-firestore-authentication-token-uid";

export const initializeDb = async () => {
  admin.initializeApp({
    credential: cert(serviceAccount),
  });

  const db = getFirestore();

  return db;
};

export const createJwtToken = (id) => {
  try {
    // const token = await admin.auth().createCustomToken(tokenUID, {});
		const token =  sign({id: id}, tokenUID, {
			expiresIn: "1h"
		})
    return token;
  } catch (e) {
		console.log(e);
		return `Error while creating token: ${e.message}`
	}
};

export const verifyToken = (token) => {
	return verify(token, tokenUID);
}
