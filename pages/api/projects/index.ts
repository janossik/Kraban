// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/firebase";
import { checkUser } from "@/utils/server";
import { collectionName, methodName, statusCode } from "@utils";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case methodName.GET:
      return await checkUser(req, res, async () => {
        const projects = await db.collection(collectionName.PROJECTS).get();

        return res.status(200).json(projects.docs.map((doc) => doc.data()));
      });
    case methodName.POST:
      return await checkUser(req, res, async () => {
        return res.status(statusCode.OK).json({});
      });
    case methodName.PUT:
      return await checkUser(req, res, async () => {
        return res.status(statusCode.OK).json({});
      });
    case methodName.DELETE:
      return await checkUser(req, res, async () => {
        return res.status(statusCode.OK).json({});
      });
    default:
      return res.status(404).json({ message: "Not found" });
  }
};

export default handler;
