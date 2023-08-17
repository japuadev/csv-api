import "express-async-errors";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { routers } from "./router/index.router";
import * as dotenv from "dotenv";
import cors from "cors";
import { AppError } from "./models/errors.model";
import { HttpStatus } from "./utils/http.status";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routers);

app.use("*", (req: Request, res: Response) => {
  throw new AppError("Route Not Found.", HttpStatus.NOT_FOUND);
});

app.use(
  (
    err: ErrorRequestHandler | Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const isError = err instanceof Error;
    const isAppError = err instanceof AppError;

    const objError: AppError = {
      message: isAppError
        ? err.message
        : isError
        ? err.message
        : "Internal Server Error",
      status: isAppError ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
    };

    res.status(objError.status).json(objError);
  },
);

const port = process.env.PORT || 3000;
const ambient = process.env.NODE_ENV || "develop";
app.listen(port, async () => {
  console.log(`App started in port: ${port} and environment: ${ambient}`);
});
