import { Router } from "express"
import * as UserController from "../controllers/user.controller";
import multer from 'multer';

const storage = multer.diskStorage({destination: 'temp/'})
const upload = multer({ storage })

const userRouter = Router()

userRouter.post('/files', [upload.single('file')], UserController.importUserCsv)
userRouter.get('/users', UserController.getUsers)

export { userRouter }

