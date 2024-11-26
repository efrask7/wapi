import { Request, Response } from "express";
import prisma from "../prisma";
import { client } from "..";
import genError from "../utils/genError";

export async function webhookAlert(req: Request, res: Response) {
  const auth = req.headers.authorization

  if (!auth) {
    res.status(401).send('Unauthorized')
    return
  }

  if (auth !== process.env.API_KEY) {
    res.status(403).send('Forbidden')
    return
  }

  const alert = req.body as IKumaBody

  if (!alert.msg) {
    res.status(400).send('Bad Request')
    return
  }

  console.log('[Express] - Alerta recibida:', alert.msg)

  if (client) {

    const sendToUsersString = alert.toUsers
    const sendToUsers = sendToUsersString ? sendToUsersString.replaceAll(' ', '').split(',') : null


    if (sendToUsers) {

      if (sendToUsersString.length < 8 || sendToUsersString.match(/[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|~.<>/?]/g)) {
        res.status(400).send('Bad Request, formato de usuarios incorrectos, ej valido: "59812345678, 59887654321"')
        return
      }

      for (const user of sendToUsers) {
        try {
          await client.sendMessage(user + '@c.us', alert.msg)
        } catch (error: any) {
          console.error('[WAPI] - Error al enviar mensaje a:', user, 'Error:', error.message)
          genError(error.message)
          continue
        }
      }
    } else {
      const users = await prisma.alertUsers.findMany()
      for (const user of users) {
        try {
          await client.sendMessage(user.id + '@c.us', alert.msg)
        } catch (error: any) {
          console.error('[WAPI] - Error al enviar mensaje a:', user.id, 'Error:', error.message)
          genError(error.message)
          continue
        }
      }
    }

  }

  await prisma.history.create({
    data: {
      name: alert.msg
    }
  })

  res.status(200).send('OK!')
}