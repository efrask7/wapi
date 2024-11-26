import { Request, Response } from "express";
import prisma from "../prisma";

export async function addUser(req: Request, res: Response) {
  const auth = req.headers.authorization

  if (!auth) {
    res.status(401).send('Unauthorized')
    return
  }

  if (auth !== process.env.API_KEY) {
    res.status(403).send('Forbidden')
    return
  }

  const user = req.body as {
    phone: string
  }

  if (!req.body || !req.body.phone) {
    res.status(400).send({
      status: false,
      message: 'No se ingreso el telefono (phone)'
    })
    return
  }

  console.log('[Express] - Usuario recibido:', user.phone)

  const userExists = await prisma.alertUsers.findUnique({
    where: {
      id: user.phone
    }
  })

  if (!userExists) {
    res.status(400).send({
      status: false,
      message: 'El usuario ya existe'
    })
    return
  }

  await prisma.alertUsers.create({
    data: {
      id: user.phone
    }
  })

  res.status(200).send({
    status: true,
    message: 'Usuario creado'
  })
}

export async function getUsers(req: Request, res: Response) {
  const auth = req.headers.authorization

  if (!auth) {
    res.status(401).send('Unauthorized')
    return
  }

  if (auth !== process.env.API_KEY) {
    res.status(403).send('Forbidden')
    return
  }

  const users = await prisma.alertUsers.findMany()

  res.status(200).send({
    status: true,
    data: users
  })
}

export async function deleteUser(req: Request, res: Response) {
  const auth = req.headers.authorization

  if (!auth) {
    res.status(401).send('Unauthorized')
    return
  }

  if (auth !== process.env.API_KEY) {
    res.status(403).send('Forbidden')
    return
  }

  const user = req.body as {
    phone: string
  }

  if (!req.body || !req.body.phone) {
    res.status(400).send({
      status: false,
      message: 'No se ingreso el telefono (phone)'
    })
    return
  }

  console.log('[Express] - Usuario eliminado:', user.phone)

  await prisma.alertUsers.delete({
    where: {
      id: user.phone
    }
  })

  res.status(200).send({
    status: true,
    message: 'Usuario eliminado'
  })
}