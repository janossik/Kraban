// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/firebase";
import { IUserProps } from "@/types";
import { checkUser, join } from "@/utils/server";
import { collectionName, methodName, statusCode } from "@utils";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case methodName.GET:
      return await checkUser(req, res, async () => {
        const columns = await db
          .collection(
            join(
              collectionName.PROJECTS,
              req.query.projectId as string,
              collectionName.COLUMNS
            )
          )
          .get();

        return res.status(200).json(columns.docs.map((doc) => doc.data()));
      });
    case methodName.POST:
      return await checkUser(req, res, async (user) => {
        const userData = (await (
          await db.doc(join(collectionName.USERS, user.uid)).get()
        ).data()) as IUserProps;

        if (userData.permission < 5) {
          return res.status(statusCode.FORBIDDEN).json({ status: "Forbidden" });
        }

        const columnDoc = await db
          .collection(
            join(
              collectionName.PROJECTS,
              req.query.projectId as string,
              collectionName.COLUMNS
            )
          )
          .doc();

        await columnDoc.set({ id: columnDoc.id, ...req.body });

        return res.status(statusCode.OK).json({ status: "Created" });
      });
    default:
      return res.status(404).json({ message: "Not found" });
  }
};

export default handler;
