import { CsvModel } from "../models/csv.model";
import fs from "fs";
import csvParser from "csv-parser";
import { queryExecute } from "../config/database";

export const createCsvService = async (file: any): Promise<string> => {
    const filePath = file.path;
    if(file.mimetype != "text/csv"){
        throw new Error("This file extension is not supported.")
    }

    fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", async (row) => {
        const query = "INSERT INTO person (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)";
        await queryExecute(query, [row.name, row.city, row.country, row.favorite_sport])
    })
    .on('end', () => {
        fs.unlinkSync(filePath);
    });

    return "Dados do CSV foram importados com sucesso.";
}

export const getCsvService = async (queryParams: string): Promise<void> => {
    // const findCsvLoad = await CsvModel.find({
    //     where: {
    //         id: queryParams
    //     }
    // })
    
    // return findCsvLoad;
}





