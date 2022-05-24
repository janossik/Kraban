import { clientAuth } from "@/clientFirebase";
import { adminAuth } from "@/firebase";
import axios, { AxiosRequestConfig } from "axios";
import { UserRecord } from "firebase-admin/auth";
import { NextApiRequest, NextApiResponse } from "next";

export const checkUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  handler: (user: UserRecord) => Promise<void>,
  admin?: boolean
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  const DecodedIdToken = await adminAuth.verifyIdToken(token);
  const user = await adminAuth.getUser(DecodedIdToken.uid);

  if (user.customClaims?.admin !== true && admin) {
    return res.status(403).json({ message: "Forbidden" });
  }
  return handler(user);
};

export const join = (...args: any[]) => `/${args.join("/")}`;
