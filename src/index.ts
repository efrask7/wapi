import { Client, LocalAuth } from "whatsapp-web.js"
import * as qrcode from 'qrcode-terminal'
import * as dotenv from "dotenv"
import ExpressServer from "./classes/expressserver"

dotenv.config()

qrcode.setErrorLevel('Q')


export const client = new Client({
  authStrategy: new LocalAuth({
    clientId: process.env.WHATSAPP_CLIENT
  }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ],
  }
})
const webServer = new ExpressServer(client)


client.on('qr', qr => {
  console.log('[WAPI] - QR Code recibido')
  qrcode.generate(qr, { small: true }, (qrcode) => {
    console.log(qrcode)
  })
})

client.on('ready', () => {
  console.log('[WAPI] - Cliente iniciado')
  webServer.start()
})

client.on('auth_failure', (error) => {
  console.error('[WAPI] - Error en la autenticacion', error);
});

client.on('disconnected', (reason) => {
  console.log('[WAPI] - Se desconecto el cliente', reason);
});

client.on('authenticated', () => {
  console.log('[WAPI] - Cliente autenticado');
});

client.on('loading_screen', (percent, message) => {
  console.log('[WAPI] - Cargando', `${percent}%`, message);
});

client.initialize()