import type { Express, Request, Response } from "express";
import express from "express";
import { notFound, catchErrors } from "./middlewares/errors";
import userRouter from "./routers/user";
const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/users", userRouter());

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running!");
});

// errors handling
app.use(notFound);
app.use(catchErrors);

export default app;
