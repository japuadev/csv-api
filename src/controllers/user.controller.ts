import { Request, Response } from "express"
import { importUserCsvService, getUserService } from "../services/user.service"
import { UserModel } from "../models/user.model"

const importUserCsv = async (req: Request, res: Response) => {
    const file = req.file
    const userCsvFile = await importUserCsvService(file)
    res.status(201).json(userCsvFile)
}

const getUsers = async (req: Request<{}, {}, {}, UserModel>, res: Response) => {
    const { query } = req;
    const users = await getUserService(query)
    res.status(200).json(users)
}

export {
    importUserCsv,
    getUsers,
}
