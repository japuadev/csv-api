import { Request, Response } from "express"
import { createCsvService, getLoadCsvService } from "../services/csv.service"

const createCsv = async (req: Request, res: Response) => {
    const body = req.body
    const csv = await createCsvService(body)
    res.status(201).json(csv)
}

const getCsvLoad = async (req: Request, res: Response) => {
    const {q} = req.params
    const csv = await getLoadCsvService(q)
    res.status(200).json(csv)
}

export {
    createCsv,
    getCsvLoad,
}