// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/firebase";
import { checkUser, join } from "@/utils/server";
import { collectionName, methodName, statusCode } from "@utils";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case methodName.GET:
      return await checkUser(req, res, async () => {
        const projectPath = join(
          collectionName.PROJECTS,
          req.query.projectId as string
        );
        const project = await db.doc(projectPath).get();

        return res.status(200).json(project.data());
      });
    case methodName.POST:
      return await checkUser(req, res, async () => {
        return res.status(statusCode.OK).json({ status: "Updated" });
      });
    default:
      return res.status(404).json({ message: "Not found" });
  }
};

export default handler;
