import { Request, Response } from "express"
import { createCsvService, getCsvService } from "../services/csv.service"
import { CsvModel } from "../models/csv.model"

const createCsv = async (req: Request, res: Response) => {
    const file = req.file
    const csvFile = await createCsvService(file)
    res.status(201).json(csvFile)
}

const getCsv = async (req: Request<{}, {}, {}, CsvModel>, res: Response) => {
    const { query } = req;
    const csvFile = await getCsvService(query)
    res.status(200).json(csvFile)
}

export {
    createCsv,
    getCsv,
}
