// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/firebase";
import { IUserProps } from "@/types";
import { checkUser, join } from "@/utils/server";
import { collectionName, methodName, statusCode } from "@utils";
import { Timestamp } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case methodName.GET:
      return await checkUser(req, res, async () => {
        const tasks = await db
          .collection(
            join(
              collectionName.PROJECTS,
              req.query.projectId as string,
              collectionName.COLUMNS,
              req.query.columnId as string,
              collectionName.TASKS
            )
          )
          .get();

        return res.status(200).json(tasks.docs.map((doc) => doc.data()));
      });
    case methodName.POST:
      return await checkUser(req, res, async (user) => {
        const userData = (
          await db.doc(join(collectionName.USERS, user.uid)).get()
        ).data() as IUserProps;

        if (userData.permission < 4) {
          return res.status(statusCode.FORBIDDEN).json({ status: "Forbidden" });
        }

        const taskDoc = await db
          .collection(
            join(
              collectionName.PROJECTS,
              req.query.projectId as string,
              collectionName.COLUMNS,
              req.query.columnId as string,
              collectionName.TASKS
            )
          )
          .doc();
        await taskDoc.set({
          ...req.body,
          author: {
            uid: userData.uid,
            name: `${userData.firstName} ${userData.lastName}`,
          },
          createdAt: new Timestamp(
            req.body.createdAt.seconds,
            req.body.createdAt.nanoseconds
          ),
          deadline: new Timestamp(
            req.body.deadline.seconds,
            req.body.deadline.nanoseconds
          ),
          updatedAt: new Timestamp(
            req.body.updatedAt.seconds,
            req.body.updatedAt.nanoseconds
          ),
          id: taskDoc.id,
        });

        return res.status(statusCode.OK).json({ status: "Updated" });
      });
    default:
      return res.status(404).json({ message: "Not found" });
  }
};

export default handler;
