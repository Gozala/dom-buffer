import {DOMBuffer} from "./DOMBuffer.fbs"

export type ChangeType = DOMBuffer.ChangeType
export type PropertyType = DOMBuffer.PropertyType


export interface EventListener {
  capture:boolean
  handleEvent(event:Event):void
}

export interface ChangeText {
  kind:"Text",
  setTextContent(content:string):this
}


export interface ChangeComment {
  kind:"Change"
  setTextContent(content:string):this
}

export interface ChangeElement {
  kind:"Element"
  namespaceURI:null|string,
  name:null|string,
  setProperty(name:string, value:null|string|number|boolean):this
  removeProperty(name:string):this
  setAttribute(name:string, value:string):this
  removeAttribute(name:string):this
  setAttributeNS(ns:string, name:string, value:string):this
  removeAttributeNS(ns:string, name:string):this
  setStyleProperty(name:string, value:string):this
  removeStyleProperty(name:string):this
  setEventListener(name:string, id:EventListener, capture:boolean):this
  removeEventListener(name:string, id:EventListener, capture:boolean):this
  addClassName(name:string):this
  removeClassName(name:string):this

  removeChild(index:number):this
  insert(index:number, node:ChangeNode):this
  edit(index:number, node:ChangeNode):this
  replace(index:number, node:ChangeNode):this
  changeChild(change:ChangeChild):this
}

export type ChangeNode =
  | ChangeText
  | ChangeComment
  | ChangeElement


export interface Change {
  type:ChangeType
  change:ChangeNode
}

export interface ChangeChild {
  index:number
  change:Change
}
