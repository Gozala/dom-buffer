import {HashMap} from "./DOM"
import {Node, Text, Element, ElementNS, Tagged, Thunk, Indexed, ElementNode, Keyed, empty} from "./DOMBuffer"
import {EventListener, ChangeNode, ChangeElement, ChangeText, ChangeComment,
        NewNode, NewElement, NewText, NewComment} from "./DOMChangeList"

class ModifyText {
  kind:"Text" = "Text"
  setTextContent(text:string):this {
    return this
  }
}

export class PatchText extends ModifyText implements ChangeText {
  type:"Change"
}

export class CreateText extends ModifyText implements NewText {
  type:"New"
}

class ModifyComment {
  kind:"Comment" = "Comment"
  setTextContent(text:string):this {
    return this
  }
}

export class PatchComment extends ModifyComment implements ChangeComment {
  type:"Change"
}

export class CreateComment extends ModifyComment implements NewComment {
  type:"New"
}



export const NoOp = new class {type:"NoOp" = "NoOp"}
export const Delete = new class {type:"Delete" = "Delete"}

type PropertyChanges = {
  [key:string]:undefined|null|string|number|boolean
}

type AttributeChanges = {
  [key:string]:undefined|string
}

type AttributeNSChanges = {
  [key:string]:undefined|{namespaceURI:string, value:string}
}

type StyleChanges = {
  [key:string]:undefined|string
}

interface AppendNode {
  kind:"Append"
  node:NewNode
}

interface InsertNode {
  kind:"Insert"
  index:number
  node:NewNode
}

interface PatchNode {
  index:number
  change:ChangeNode
}



export class PatchElement implements ChangeElement {
  kind:"Element" = "Element"
  type:"Change" = "Change"
  propertyChanges:PropertyChanges
  attributeChanges:AttributeChanges
  attributeNSChanges:AttributeNSChanges
  styleChanges:StyleChanges

  setProperty(name:string, value:null|string|number|boolean):this {
    return this
  }
  removeProperty(name:string):this {
    return this
  }
  setAttribute(name:string, value:string):this {
    return this
  }
  removeAttribute(name:string):this {
    return this
  }
  setAttributeNS(ns:string, name:string, value:string):this {
    return this
  }
  removeAttributeNS(ns:string, name:string):this {
    return this
  }
  setStyleProperty(name:string, value:string):this {
    return this
  }
  removeStyleProperty(name:string):this {
    return this
  }
  addClassName(name:string):this {
    return this
  }
  removeClassName(name:string):this {
    return this
  }

  setEventListener(name:string, listener:EventListener, capture:boolean):this {
    return this
  }
  removeEventListener(name:string, listener:EventListener, capture:boolean):this {
    return this
  }

  appendChild(node:NewNode):this {
    return this
  }
  insertChild(index:number, child:NewNode):this {
    return this
  }
  changeChild(index:number, change:ChangeNode):this {
    return this
  }
}

export class CreateElement implements NewElement {
  type:"New" = "New"
  constructor(public namespaceURI:null|string,
              public localName:string,
              public changes:PatchElement) {
  }
}

