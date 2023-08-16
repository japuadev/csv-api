import { Request, Response } from "express"
import { createCsvService, getCsvService } from "../services/csv.service"

const createCsv = async (req: Request, res: Response) => {
    const file = req.file
    const csvFile = await createCsvService(file)
    res.status(201).json(csvFile)
}

const getCsv = async (req: Request, res: Response) => {
    const {q} = req.params
    const csv = await getCsvService(q)
    res.status(200).json(csv)
}

export {
    createCsv,
    getCsv,
}