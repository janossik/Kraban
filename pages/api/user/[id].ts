// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db, adminAuth } from "@/firebase";
import { IUserForUpdate } from "@types";
import { collectionName, methodName, statusCode } from "@utils";
import { checkUser } from "@/utils/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case methodName.PUT:
      return await checkUser(req, res, async (user) => {
        const id = req.query.id as string;
        let objectUpdate: IUserForUpdate = {};
        const { firstName, lastName, permission, email, status } = req.body;

        if (user.uid !== id) {
          return res
            .status(statusCode.FORBIDDEN)
            .json({ message: "Forbidden" });
        }

        if (firstName !== undefined) {
          return res
            .status(statusCode.FORBIDDEN)
            .json({ message: "Forbidden" });
        }

        if (lastName !== undefined) {
          return res
            .status(statusCode.FORBIDDEN)
            .json({ message: "Forbidden" });
        }

        if (permission !== undefined) {
          return res
            .status(statusCode.FORBIDDEN)
            .json({ message: "Forbidden" });
        }

        if (email !== undefined) {
          return res
            .status(statusCode.FORBIDDEN)
            .json({ message: "Forbidden" });
        }

        if (status !== undefined) {
          objectUpdate.status = status;
        }

        const userRef = db.collection(collectionName.USERS).doc(id);
        await userRef.update(objectUpdate);
        return res.status(statusCode.OK).json({ status: "Updated" });
      });
    default:
      return res.status(404).json({ message: "Not found" });
  }
};

export default handler;
