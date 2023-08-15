import { Router } from "express"
import * as CsvController from "../controllers/csv.controller";

const csvRouter = Router()

csvRouter.post('/api/files', CsvController.createCsv)
csvRouter.get('/api/users', CsvController.getCsvLoad)

export { csvRouter }