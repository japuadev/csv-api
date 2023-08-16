import fs from "fs";
import csvParser from "csv-parser";
import { queryExecute } from "../config/database";
import { CsvModel } from "../models/csv.model";

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

export const getCsvService = async (queryParams: CsvModel): Promise<CsvModel> => {
    let query: string = "SELECT * FROM person";
    let finalQuery: string = "";
    const sanitizeQueryParams = ["name", "country", "city", "country", "favorite_sport"];

    if(queryParams) {
        let relations: Array<String> = [];

        for (const key in queryParams) {
            if(!sanitizeQueryParams.includes(key)) {
                delete queryParams[key];
            } else {
                relations.push(`${key} LIKE '%${queryParams[key]}%'`)   
            }

            if(Object.keys(queryParams).length > 1) {
                const whereClause = relations.join(" AND ");
                finalQuery = `${query} WHERE ${whereClause}`;
            } else {
                finalQuery = `${query} WHERE ${relations}`
            }         
        }
    } else {
        finalQuery = query;
    }
    
    const result = await queryExecute(finalQuery)
    if(result.length == 0) {
        throw new Error("User not found with provided parameters." )
    }

    return result;
}





