interface IKumaBody {
  heartbeat: IKumaHeartbeat
  monitor: IKumaMonitor
  msg: string
  toUsers?: string
}

interface IKumaHeartbeat {
  monitorID: number
  status: number
  time: string
  msg: string
  ping: number
  important: boolean
  duration: number
  timezone: string
  timezoneOffset: string
  localDateTime: string
}

interface IKumaMonitor {
  id: number
  name: string
  description?: string
  pathName: string
  parent: number
  childrenIDs: number[]
  url: string
  method: string
  hostname?: string
  port?: number
  maxretries: number
  weight: number
  active: boolean
  forceInactive: boolean
  type: string
  timeout: number
  interval: number
  retryInterval: number
  type: string
  timoeut: number
  retryInterval: number
  resendInterval: number
  keyword?: string
  invertKeyword: boolean
  expiryNotification: boolean
  ignoreTls: boolean
  upsideDown: boolean
  packetSize: number
  maxredirects: number
  accepted_statuscodes: string[]
  dns_resolve_type: string
  dns_resolve_server: string
  dns_last_result?: string
  docker_container: string
  docket_host?: string
  proxyId?: number
  notificationIDList: { [key: string]: boolean }
  tags: string[]
  maintenance: boolean
  mqttTopic: string
  mqttSuccessMessage: string
  databaseQuery?: string
  authMethod?: string
  grpcUrl?: string
  grpcProtobuf?: string
  grpcMethod?: string
  grpcServiceName?: string
  grpcEnableTls: boolean
  radiusCalledStationId?: number
  radiusCallingStationId?: number
  game?: string
  gamedigGivenPortOnly: boolean
  httpBodyEncoding: string
  jsonPath?: string
  expectedValue?: string
  kafkaProducertTopic?: string
  kafkaProducerBrokers: string[]
  kafkaProducerSsl: boolean
  kafkaProducerAllowAutoTopicCreation: boolean
  kafkaProducerMessage?: string
  screenshot?: string
  includeSensitiveData: boolean
}