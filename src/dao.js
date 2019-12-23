const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql-ait.stud.idi.ntnu.no",
    user: "thomabmo",
    password: "",
    database: "thomabmo",
    debug: false
});

function query(query, values) {
    return  new Promise(async function(resolve, reject){
        pool.getConnection((error, connection) => {
            if (error || !connection) {
                console.error("Dao failed in connecting to database!");
            } else {

                    connection.query(query, values, (err, res, fields,) =>{
                        if (err) {
                            reject(err)
                        } else {
                            console.log(res);
                            resolve(res[0]);
                        }
                    });
            }
        });
    });
}