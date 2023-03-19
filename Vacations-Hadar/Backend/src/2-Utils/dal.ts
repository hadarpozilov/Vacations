import mysql from 'mysql'
import config from './config';

const connection = mysql.createPool({
    host: config.sqlHost,
    user: config.sqlUser,
    password: config.sqlPassword,
    database: config.sqlDatabase
})

async function execute(sql: string, values?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
}

export default { execute }