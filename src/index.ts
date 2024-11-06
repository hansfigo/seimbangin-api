import express, { Express, Request, Response } from "express";
import authenticateJWT from "./middleware/jwt";
import authRouter from "./routes/auth.routes";
import path from "path";
import userRouter from "./routes/user.routes";
import transactionRouter from "./routes/transaction.routes";

// intialize express
const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/transaction", transactionRouter);

app.get("/", (req: Request, res: Response) => {
  res.render("index", {
    title: "seimbang.in",
  });
});

app.get("/protected", authenticateJWT, (req: Request, res: Response) => {
  res.send({
    message: "This is a protected route",
    data: {
      user: res.locals.user,
    },
  });
});

app.listen(3000, () => {
  console.log(
    "🎉 Server Expressnya dah jalan ya beb! 🚀 disini yhh http://localhost:3000"
  );
});
