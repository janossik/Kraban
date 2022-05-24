// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { checkUser } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "src/firebase";
import { collectionName, methodName } from "src/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);

  switch (req.method) {
    case methodName.GET:
      return await checkUser(req, res, async () => {
        const querySnapshot = await db
          .collection(collectionName.USERS)
          .orderBy("uid")
          .limit(Number(req.query.limit))
          .startAfter(req.query.id)
          .get();
        const data = querySnapshot.docs.map((doc) => doc.data());
        return res.status(200).json(data);
      });
    default:
      return res.status(404).json({ message: "Not found" });
  }
};

export default handler;
