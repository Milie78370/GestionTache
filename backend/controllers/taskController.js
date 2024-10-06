import connectDB from "../config/config.js"

const connection = await connectDB();

const addTask = (request, response) => {
    try {
        const tasks = {
            libelle: request.body.libelle,
            heureDeb: request.body.heureDeb,
            heureFin: request.body.heureFin
        }
        connection.query('INSERT INTO tache SET ?', tasks, (err, res) => {
            if(err){
                throw err;
            } else {
                response.json({
                    success: true,
                    message:"Tache sauvegardee"
                })
            }
          });
    } catch (error) {
        response.json({
            success: false,
            message: error.message
        })
    }


}

const getTask = async (request, response) => {
    try {
        let tasks = [];
        connection.query('SELECT * FROM tache', (err,rows) => {
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

const removeTask = (request, response) => {
    try {
        const task_removeId = request.body.tache_id;
        connection.query('DELETE FROM tache WHERE tache_id = ?', [task_removeId], (err, res) => {
            if(err){
                throw err;
            } else {
                response.json({
                    success: true,
                    message:"Tache supprimée"
                })
            }
          });
    } catch (error) {
        response.json({
            success: false,
            message: error.message
        })
    }


}



export {addTask, getTask, removeTask}