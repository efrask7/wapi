import express, { Application } from "express"
import cors from "cors"
import { Client } from "whatsapp-web.js";
import expressRouter from "../routes/router";

export default class ExpressServer {
  private readonly PORT = process.env.PORT ?? 9090
  private app: Application = undefined
  public whatsappClient: Client = undefined

  constructor(whatsappClient: Client) {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    this.whatsappClient = whatsappClient

    this.app = app
    this.setRoutes = this.setRoutes.bind(this)
    this.startServer = this.startServer.bind(this)
  }

  private setRoutes() {
    console.log('[Express] - Iniciando rutas')

    //Router (/api) y ruta inicial
    this.app.use('/api', expressRouter)
    this.app.get('/', (_, res) => { res.status(200).send('Ready!') })

    //Log rutas
    this.logRoute('GET', '/')
    this.logRoute('POST', '/api/alert')
    this.logRoute('POST', '/api/user')
    this.logRoute('DELETE', '/api/user')
    this.logRoute('GET', '/api/users')

    console.log('[Express] - Rutas iniciadas')
  }

  private startServer() {
    console.log('[Express] - Iniciando servidor')
    this.app.listen(this.PORT, () => {
      console.log(`[Express] - Servidor iniciado en el puerto ${this.PORT}`)
    })
  }

  start() {
    console.log('[Express] - Iniciando...')
    this.setRoutes()
    this.startServer()
  }

  private logRoute(method: string, path: string) {
    console.log(`[Express] - Ruta [${method}] ${path}`)
  }
}