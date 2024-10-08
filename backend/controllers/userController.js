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

const updateUser = (request, response) => {
    try {
        const {heureTotal, emp_id} = request.body;
        connection.query(
            'UPDATE employe SET heureTravailTotal = ? Where emp_id = ?',
            [heureTotal, emp_id],
            (err, result) => {
              if (err) {
                throw err;
              } else {
                response.json({success: true, message: "Update de la tache"});
              }
            }
          );
    } catch(err) {
        response.json({success: false, message: err.message});
    }
}

const getHeureTravailForEmp = (request, response) => {
    try {
        const {emp_id} = request.body;
        let employe_id = [];
        connection.query(
            'SELECT heureTravailTotal FROM employe Where emp_id = ?',
            [emp_id],
            (err, result) => {
              if (err) {
                throw err;
              } else {
                employe_id = Object.values(JSON.parse(JSON.stringify(result))); 
                response.json({success: true, data: employe_id});
              }
            }
          );
    } catch(err) {
        response.json({success: false, message: err.message});
    }
}

const getNomEmp = (request, response) => {
    try {
        const {emp_id} = request.body;
        let employe_nom = [];
        connection.query(
            'SELECT emp_id, nom FROM employe Where emp_id = ?',
            [emp_id],
            (err, result) => {
              if (err) {
                throw err;
              } else {
                employe_nom = Object.values(JSON.parse(JSON.stringify(result))); 
                response.json({success: true, data: employe_nom});
              }
            }
          );
    } catch(err) {
        response.json({success: false, message: err.message});
    }
}



export {getUser, updateUser, getHeureTravailForEmp,getNomEmp}