// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db, adminAuth } from "@/firebase";
import { IUserForUpdate } from "@types";
import { collectionName, methodName, statusCode } from "@utils";
import { checkUser } from "@/utils/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case methodName.GET:
      return await checkUser(req, res, async () => {
        const doc = await db
          .collection(collectionName.USERS)
          .doc(req.query.id as string)
          .get();
        if (!doc.exists) {
          res.status(404).send("Not found");
        } else {
          res.status(200).json(doc.data());
        }
      });
    case methodName.PUT:
      return await checkUser(
        req,
        res,
        async () => {
          const id = req.query.id as string;
          let objectUpdate: IUserForUpdate = {};
          const { firstName, lastName, permission, email, status } = req.body;

          if (firstName !== undefined) {
            objectUpdate.firstName = firstName;
          }

          if (lastName !== undefined) {
            objectUpdate.lastName = lastName;
          }

          if (permission !== undefined) {
            objectUpdate.permission = permission;
          }

          if (email !== undefined) {
            objectUpdate.email = email;
          }

          if (status !== undefined) {
            objectUpdate.status = status;
          }

          const userRef = db.collection(collectionName.USERS).doc(id);
          await userRef.update(objectUpdate);
          return res.status(statusCode.OK).json({ status: "Updated" });
        },
        true
      );
    case methodName.DELETE:
      return await checkUser(
        req,
        res,
        async () => {
          adminAuth.deleteUser(req.query.id as string);
          await db
            .collection(collectionName.USERS)
            .doc(req.query.id as string)
            .delete();

          return res.status(200).json({ message: "Deleted" });
        },
        true
      );
    default:
      return res.status(404).json({ message: "Not found" });
  }
};

export default handler;
