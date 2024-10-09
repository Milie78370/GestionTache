import mysql from "mysql"

const connectDB = async () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'gestiontaches'
    });
    return connection
}

export default connectDB;