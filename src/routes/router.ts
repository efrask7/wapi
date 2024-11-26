import { Router } from "express";
import { webhookAlert } from "../controllers/webhook";
import { addUser, deleteUser, getUsers } from "../controllers/users";

const expressRouter = Router()

//Webook
expressRouter.post('/alert', webhookAlert)

//Usuarios
expressRouter.post('/user', addUser)
expressRouter.delete('/user', deleteUser)
expressRouter.get('/users', getUsers)

export default expressRouter
