import connectDB from "../config/config.js"

const connection = await connectDB();

const getUser = async (request, response) => {
    try {
        let tasks = [];
        connection.query('SELECT * FROM employe', (err,rows) => {
            if(err) {
                throw err;
            } else {
                tasks = Object.values(JSON.parse(JSON.stringify(rows))); 
                response.json({success: true, data: tasks});
            }
        });
    } catch (err) {
        response.json({success: false, message: err.message});
    }
}

export {getUser}