import { CsvModel } from "../models/csv.model";

export const createCsvService = async (csv: CsvModel): Promise<CsvModel> => {
    return csv;
}

export const getLoadCsvService = async (queryParams: string): Promise<CsvModel> => {
    const findCsvLoad = await CsvModel.find({
        where: {
            id: queryParams
        }
    })
    
    return findCsvLoad;
}
