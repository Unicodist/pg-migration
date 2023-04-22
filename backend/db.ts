const {Pool} = require('pg')

class PGConnection {
    private readonly database: string;

    constructor(database: string) {
        this.database = database
    }

    async getAll<T>(table: string, requiredCols?: string, schema?: string, queryParam?: string) {
        let pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: this.database,
            password: process.env.PGPASSWORD
        })
        if (!schema) schema = "public";

        const query = `select ${requiredCols?' '+requiredCols+' ':' * '} from ${schema}.${table}${queryParam?' where '+queryParam:''};`;
        console.log(query)
        try {
            const result = await pool.query(query);
            console.log(result)
            return result.rows as T[];
        } catch (e: any) {
            console.log('Error: ' + e.message)
            throw e
        } finally {
            pool.end()
        }
    }

}

export default PGConnection