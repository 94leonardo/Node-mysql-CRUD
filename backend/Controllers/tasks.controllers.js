import { pool } from "../db.js";

/**
 * @function getTasks
 * @description Maneja la solicitud GET para obtener todas las tareas.
 * @route GET /tasks
 * @returns {Object} Respuesta JSON con el estado y un mensaje indicando que se están obteniendo las tareas.
 */
export const getTasks = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM tasks ORDER BY createat ASC"
        );

        return res.status(200).json({
            status: "success",
            message: "Obteniendo Tareas",
            result,
        });
    } catch (error) {
        return res.status(404).send({
            status: "error",
            message: "No se pudo obtener las tareas",
        });
    }
};

/**
 * @function getTask
 * @description Maneja la solicitud GET para obtener una tarea específica por su ID.
 * @route GET /tasks/:id
 * @returns {Object} Respuesta JSON con el estado y un mensaje indicando que se está obteniendo la tarea.
 */
export const getTask = async (req, res) => {
    try {
        const [result] = await pool.query("select * from tasks where id = ?", [
            req.params.id,
        ]);

        if (result.length === 0)
            return res
                .status(404)
                .json({ status: "error", message: "No se encontro la tarea" });

        console.log(result);
        return res.status(200).json({
            status: "success",
            message: "Obteniendo la Tarea",
            result: result[0],
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "No se pudo obtener la tarea",
        });
    }
};

/**
 * @function createTask
 * @description Maneja la solicitud POST para crear una nueva tarea.
 * @route POST /tasks
 * @param {Object} req - La solicitud HTTP que contiene los datos de la nueva tarea.
 * @returns {Object} Respuesta JSON con el estado y un mensaje indicando que se está creando la tarea.
 */
export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const [result] = await pool.query(
            "INSERT INTO tasks (title,description) VALUES (?,?)",
            [title, description]
        );

        return res.status(200).json({
            status: "success",
            message: "Tarea insertada con exito",
            id: result.insertId,
            title,
            description,
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "No se pudo crear la tarea",
        });
    }
};

/**
 * @function updateTask
 * @description Maneja la solicitud PUT para actualizar una tarea específica por su ID.
 * @route PUT /tasks/:id
 * @param {Object} req - La solicitud HTTP que contiene los datos actualizados de la tarea.
 * @returns {Object} Respuesta JSON con el estado y un mensaje indicando que se está actualizando la tarea.
 */
export const updateTask = async (req, res) => {
    try {
        console.log(req.params.body);
        const [result] = await pool.query("UPDATE tasks SET ? WHERE id = ?", [
            req.body,
            req.params.id,
        ]);

        return res.status(200).send({
            status: "success",
            message: "Actualizando Tarea",
            result,
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "No se pudo actualizar la tarea",
        });
    }
};

/**
 * @function deleteTask
 * @description Maneja la solicitud DELETE para eliminar una tarea específica por su ID.
 * @route DELETE /tasks/:id
 * @returns {Object} Respuesta JSON con el estado y un mensaje indicando que se está eliminando la tarea.
 */
export const deleteTask = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
            req.params.id,
        ]);
        if (result.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                message: "No se encontro la tarea",
            });
        }

        return res.status(204).send({
            status: "success",
            message: "Borrando Tarea",
            result,
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "No se pudo borrar la tarea",
        });
    }
};
