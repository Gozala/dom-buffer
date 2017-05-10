export type HashMap <value> =
  {[key:string]: value}


export interface Mailbox <message> {
  send(payload:message):void,
  map <tagged> (tag:(payload:message) => tagged):Mailbox<tagged>
}

export interface EventHandler <message> {
  kind:"EventHandler"
  capture:boolean
  eventType:string
  decode(event:Event):message
  map <tagged> (tag:(payload:message) => tagged):EventHandler<tagged>
  handleEvent(event:Event):void
}


export interface EventTarget <message> {
  mailbox:Mailbox<message>
  decoders:HashMap<null|EventHandler<message>>
  handleEvent(event:Event):void
}

export interface DOM <message> extends Node {
  eventTarget?:EventTarget<message>
}