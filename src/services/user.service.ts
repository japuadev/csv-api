import fs from "fs";
import csvParser from "csv-parser";
import { queryExecute } from "../config/database";
import { UserModel } from "../models/user.model";

function notEmptyObject(obj: any): boolean {
    if(Object.keys(obj).length === 0) {
        return false
    } else {
        return true;
    }
}

export const importUserCsvService = async (file: any): Promise<string> => {
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

    return "Data imported successfully.";
}

export const getUserService = async (queryParams?: UserModel): Promise<UserModel> => {
    let query: string = "SELECT * FROM person";
    let finalQuery: string = "";
    const sanitizeQueryParams = ["name", "country", "city", "country", "favorite_sport"];

    if(notEmptyObject(queryParams)) {
        let relations: Array<String> = [];

        for (const key in queryParams) {
            if(queryParams.hasOwnProperty(key) && sanitizeQueryParams.includes(key)) {
                relations.push(`${key} LIKE '%${queryParams[key as keyof UserModel]}%'`)   
            }

            if (relations.length > 0) {
                finalQuery = `${query} WHERE ${relations.join(" AND ")}`;
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

    return result as UserModel;
}





