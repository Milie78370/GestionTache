import connectDB from "../config/config.js"

const connection = await connectDB();

/**
 * Récupérer tous les employes depuis la base
 * @param {*} request Requête HTTP envoyé par le front, donnée envoyé en JSON
 * @param {*} response Response HTTP qui sera envoyé au front donnée envoyé en JSON
 * 
 */
const getUser = async (request, response) => {
    try {
        let employes = [];
        connection.query('SELECT * FROM employe', (err,rows) => {
            if(err) {
                throw err;
            } else {
                employes = Object.values(JSON.parse(JSON.stringify(rows))); 
                response.json({success: true, data: employes});
            }
        });
    } catch (err) {
        response.json({success: false, message: err.message});
    }
}

/**
 * Modifier l'heure de travail d'un employe dans la base
 * @param {*} request Requête HTTP envoyé par le front, donnée envoyé en JSON
 * @param {*} response Response HTTP qui sera envoyé au front donnée envoyé en JSON
 * 
 */
const updateUser = (request, response) => {
    try {
        const {heureTotal, emp_id} = request.body;
        connection.query(
            'UPDATE employe SET heureTravailTotal = ? Where emp_id = ?',
            [heureTotal, emp_id],
            (err) => {
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

/**
 * Récuperer l'heure de travail d'un employe dans la base
 * @param {*} request Requête HTTP envoyé par le front, donnée envoyé en JSON
 * @param {*} response Response HTTP qui sera envoyé au front donnée envoyé en JSON
 * 
 */
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




export {getUser, updateUser, getHeureTravailForEmp}