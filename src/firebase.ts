import dotenv from "dotenv";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

export const defaultApp = initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
});

export const auth = getAuth(defaultApp);

export const db = getFirestore(defaultApp);
