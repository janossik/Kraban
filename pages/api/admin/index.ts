// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { adminAuth } from "@/firebase";
import { methodName } from "@utils";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case methodName.GET:
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: "Invalid Token" });
      }

      const DecodedIdToken = await adminAuth.verifyIdToken(token);
      const currentUser = await adminAuth.getUser(DecodedIdToken.uid);

      if (currentUser.customClaims?.admin !== true) {
        return res.status(200).json({ admin: false });
      }

      return res.status(200).json({ admin: true });
    default:
      return res.status(404).json({ message: "Not found" });
  }
};

export default handler;
