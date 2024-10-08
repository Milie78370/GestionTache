import { request } from "express";
import connectDB from "../config/config.js"

const connection = await connectDB();

/**
 * Ajouter une tache dans la base
 * @param {*} request Requête HTTP envoyé par le front, donnée envoyé en JSON
 * @param {*} response Response HTTP qui sera envoyé au front donnée envoyé en JSON
 * 
 */
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
                    message:"Tâche sauvegardee"
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

/**
 * Récupérer une tache depuis la base
 * @param {*} request Requête HTTP envoyé par le front, donnée envoyé en JSON
 * @param {*} response Response HTTP qui sera envoyé au front donnée envoyé en JSON
 * 
 */
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

/**
 * Supprime une tache de la base
 * @param {*} request Requête HTTP envoyé par le front, donnée envoyé en JSON
 * @param {*} response Response HTTP qui sera envoyé au front donnée envoyé en JSON
 * 
 */
const removeTask = (request, response) => {
    try {
        const task_removeId = request.body.tache_id;
        connection.query('DELETE FROM tache WHERE tache_id = ?', [task_removeId], (err, res) => {
            if(err){
                throw err;
            } else {
                response.json({
                    success: true,
                    message:"Tâche supprimée"
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

/**
 * Met à jour une tache de la base
 * @param {*} request Requête HTTP envoyé par le front, donnée envoyé en JSON
 * @param {*} response Response HTTP qui sera envoyé au front donnée envoyé en JSON
 * 
 */
const updateTask = (request, response) => {
    try {
        const {emp_id, task_id} = request.body;
        connection.query(
            'UPDATE tache SET emp_id = ? Where tache_id = ?',
            [emp_id, task_id],
            (err) => {
              if (err) throw err;
          
              response.json({success: true, message: "Update de la tâche"});
            }
            
          );
    } catch(err) {
        response.json({success: false, message: err.message});
    }
}

/**
 * Récupère les informations employe_id, heure de début, heure de fin depuis la base
 * @param {*} request Requête HTTP envoyé par le front, donnée envoyé en JSON
 * @param {*} response Response HTTP qui sera envoyé au front donnée envoyé en JSON
 * 
 */
const getDataTask = (request, response) => {
    try {
        let tasks = [];
        const {task_id}= request.body;
        connection.query('SELECT emp_id, heureDeb, heureFin  FROM tache where tache_id =?', [task_id] , (err,rows) => {
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


export {addTask, getTask, removeTask, updateTask, getDataTask}