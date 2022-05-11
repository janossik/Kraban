import { NextFunction, Response, Request } from "express";
import { collectionName, CustomError, statusCode } from "../utils";
import { auth, db } from "../firebase";
import { IUser, IUserForUpdate } from "../types";

const findUser = async (id: string) => {
  const userRef = db.collection(collectionName.USERS).doc(id);
  const doc = await userRef.get();
  return doc;
};

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
  static async create(req: Request, res: Response, next: NextFunction) {}
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

export default UserController;
