import { Router } from "express"
import * as CsvController from "../controllers/csv.controller";
import multer from 'multer';

const storage = multer.diskStorage({destination: 'temp/'})
const upload = multer({ storage })

const csvRouter = Router()

csvRouter.post('/files', [upload.single('file')], CsvController.createCsv)
csvRouter.get('/users', CsvController.getCsv)

export { csvRouter }

