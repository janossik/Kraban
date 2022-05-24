// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { checkUser } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth, db } from "src/firebase";
import { collectionName, methodName } from "src/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case methodName.GET:
      return await checkUser(req, res, async () => {
        const querySnapshot = await db.collection(collectionName.USERS).get();
        const data = querySnapshot.docs.map((doc) => doc.data());
        res.status(200).json(data);
      });
    case methodName.POST:
      return await checkUser(
        req,
        res,
        async () => {
          const { email, firstName, lastName, permission } = req.body;
          console.log({ email, firstName, lastName, permission });

          if (!email || !firstName || !lastName || !permission) {
            return res.status(400).json({ message: "Invalid request" });
          }

          const user = await adminAuth.createUser({
            email: email,
            emailVerified: false,
            displayName: `${firstName} ${lastName}`,
            disabled: false,
          });

          const userRef = db.collection(collectionName.USERS).doc(user.uid);
          userRef.set({
            uid: user.uid,
            name: `${firstName} ${lastName}`,
            firstName,
            lastName,
            email,
            permission: permission || 1,
            status: false,
          });

          const link = await adminAuth.generatePasswordResetLink(email);

          res
            .status(201)
            .json({ message: "Created", email, resetPasswordLink: link });
        },
        true
      );
    default:
      return res.status(404).json({ message: "Not found" });
  }
};

export default handler;

/* 


class UserController {
  static async getOne(req: Request, res: Response, next: NextFunction) {
    const doc = await findUser(req.params.id);
    if (!doc.exists) {
      return res.status(404).send("User not found");
    } else {
      res.json(doc.data());
    }
  }
  static async getAll(req: Request, res: Response) {
    const querySnapshot = await db.collection(collectionName.USERS).get();
    const data = querySnapshot.docs.map((doc) => doc.data());

    res.status(200).json({ data });
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return next(new CustomError("Invalid Token", statusCode.UNAUTHORIZED));
    }

    const DecodedIdToken = await auth.verifyIdToken(req.headers.authorization);
    const currentUser = await auth.getUser(DecodedIdToken.uid);

    if (currentUser.customClaims?.admin !== true) {
      return next(new CustomError("Forbidden", statusCode.Forbidden));
    }
    const { email, displayName } = req.body;
    auth
      .createUser({
        email: email,
        emailVerified: false,
        displayName: displayName,
        disabled: false,
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
      })
      .catch((error) => {
        console.log("Error creating new user:", error);
      });

    //const link = await auth.generatePasswordResetLink(email);
    //---
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "youremail@gmail.com",
        pass: "yourpassword",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: "myfriend@yahoo.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return next(new CustomError("Invalid Token", statusCode.UNAUTHORIZED));
    }

    const DecodedIdToken = await auth.verifyIdToken(req.headers.authorization);
    const currentUser = await auth.getUser(DecodedIdToken.uid);

    if (currentUser.customClaims?.admin !== true) {
      return next(new CustomError("Forbidden", statusCode.Forbidden));
    }

    const { id } = req.params;

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

    res.status(statusCode.OK).json({ status: "ok" });
  }
  static async remove(req: Request, res: Response, next: NextFunction) {}
}

*/
