import {NextApiRequest, NextApiResponse} from "next";
import {RulePostModel} from "@/apimodels/rule-api-model";
const {Client} = require('pg')

export default function Handler(request:NextApiRequest, response: NextApiResponse){
    // const client = new Client({
    //     user: 'postgres',
    //     host: '65.108.207.94',
    //     database: 'pg-migration',
    //     password: 'dbA@pr3mium'
    // })
    // if (request.method === 'GET'){
    //     response.status(400).json("Not implemented")
    // }
    // else if (request.method === 'POST'){
    //     if (request.body instanceof RulePostModel){
    //         const model = request.body as RulePostModel
    //
    //         response.status(200).json("Nice")
    //     }
    //     else{
    //         response.status(400).json("Invalid")
    //     }
    // }
    //
    // client.end
}