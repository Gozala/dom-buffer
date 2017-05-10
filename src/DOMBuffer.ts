import {HashMap, EventHandler} from "./DOM"

export class Text <message> {
  kind:"Text" = "Text"
  descendantsCount:number = 0
  constructor(public text:string) {   
  }
  map <tagged> (tag:(payload:message) => tagged):Text<tagged> {
    void tag
    const anyText:Text<any> = this
    const taggedText:Text<tagged> = anyText
    return taggedText
  }
}

export class Comment <message> {
  kind:"Comment" = "Comment"
  descendantsCount:number = 0
  constructor(public text:string) {   
  }
  map <tagged> (tag:(payload:message) => tagged):Comment<tagged> {
    void tag
    const anyComment:Comment<any> = this
    const taggedComment:Comment<tagged> = anyComment
    return taggedComment
  }
}


export type Properties =
  HashMap<null|boolean|number|string>

export type Attributes =
  HashMap<Attribute>

export type Styles =
  HashMap<string>

export class ElementNode <message> {
  events:HashMap<EventHandler<message>>|null
  properties:null|Properties
  attributes:null|Attributes
  styles:null|Styles
  classNames:null|ClassNames
  constructor(public namespaceURI:string|null,
              public localName:string,
              settings?:Iterable<Setting<message>>) {
    if (settings != null) {
      for (let setting of settings) {
        switch (setting.kind) {
          case "Property": {
            this.setProperty(setting)
            continue
          }
          case "Attribute": {
            this.setAttribute(setting)
            continue
          }
          case "EventHandler": {
            this.setListener(setting)
            continue
          }
          case "Style": {
            this.addStyle(setting)
            continue
          }
          case "ClassNames": {
            this.addClassNames(setting)
            continue
          }
        }
      }
    }
  }
  setProperty(property:Property) {
    const properties = this.properties == null
      ? this.properties = Object.create(null)
      : this.properties

    properties[property.name] = property.value
    return this
  }
  setAttribute(attribute:Attribute) {
    const attributes = this.attributes == null
      ? this.attributes = Object.create(null)
      : this.attributes

    const key = attribute.namespaceURI == null
      ? attribute.name
      : `${attribute.namespaceURI}:{attribute.name}`
    attributes[key] = attribute
    
    return this
  }
  setListener(event:EventHandler<message>) {
    const events = this.events == null
      ? this.events = Object.create(null)
      : this.events

    events[event.eventType] = event
    return this
  }
  addStyle(style:Style) {
    const styles = this.styles == null
      ? this.styles = Object.create(null)
      : this.styles

    for (let rule of style.rules) {
      styles[rule.name] = rule.value
    }
  }
  addClassNames({names}:ClassNames) {
    const classNames = this.classNames == null
      ? this.classNames = Object.create(null)
      : this.classNames

    for (let name of names) {
      classNames[name] = name
    }
  }
}

export const empty:ReadonlyArray<any> = Object.freeze([])

export class DOMElementNode <message> extends ElementNode<message> {
  children:ReadonlyArray<Node<message>>
  constructor(namespaceURI:string|null,
              localName:string,
              settings?:Iterable<Setting<message>>,
              children?:Iterable<Node<message>>) {
    super(namespaceURI, localName, settings)
    
    const kids = []

    if (children == null) {
      this.children = empty
    } else {
      for (let child of children) {
        kids.push(child)
      }

      this.children = kids
    }
  }
}

export class Element <message> extends DOMElementNode<message> {
  kind:"Element" = "Element"
  map <tagged> (tag:(payload:message) => tagged):Node<tagged> {
    return new Tagged(this, tag)
  }
}

export class ElementNS <message> extends DOMElementNode<message> {
  kind:"ElementNS"
  map <tagged> (tag:(payload:message) => tagged):Node<tagged> {
    return new Tagged(this, tag)
  }
}

export type Keyed <node> = [string, node]
export type Indexed <node> = [number, node]
export type KeyedChildren <message> =
  ReadonlyArray<Keyed<Node<message>>>
export type IndexedChildren <message> =
  Readonly<HashMap<Indexed<Node<message>>>>

export const blank = Object.freeze(Object.create(null))


export class IndexedElement <message> extends ElementNode<message> {
  kind:"IndexedElement" = "IndexedElement"
  children:KeyedChildren<message>
  constructor(namespaceURI:string|null,
              localName:string,
              settings:Iterable<Setting<message>>,
              children?:Iterable<Keyed<Node<message>>>) {
    super(namespaceURI, localName, settings)

    this.children = children == null
      ? empty
      : [...children]
  }
}

const cache = new WeakMap()

export const compose = <a, b, c> (f:(value:a) => b, g:(value:b) => c):(value:a) => c => {
  const innerCache = cache.has(f)
    ? cache.get(f)
    : cache.set(f, new WeakMap())
  
  const composed = innerCache.has(g)
    ? innerCache.get(g)
    : innerCache.set(g, (value:a):c => g(f(value)))
  
  return composed
}

export class Tagged <inner, message> {
  kind:"Tagged" = "Tagged"
  descendantsCount:number
  constructor(public node:Element<inner>|ElementNS<inner>, public tag:(payload:inner) => message) {
  }
  map <tagged> (tag:(payload:message) => tagged):Node<tagged> {
    const f = compose(this.tag, tag)
    return new Tagged(this.node, f)
  }
}



export class Thunk <message>  {
  kind:"Thunk"="Thunk"
  descendantsCount:number = 0
  constructor (
    public render:(...args:Array<any>) => Node<message>,
    public args:Array<any>,
    public node?:Node<message>) {
      
  }
  force():Node<message> {
    const node = this.node == null
      ? this.node = this.render(...this.args)
      : this.node
    return node
  }
}


export type Node <message> =
  | Text <message>
  | Comment <message>
  | Element<message>
  | ElementNS<message>
  | IndexedElement<message>
  | Tagged<any, message>
  | Thunk<message>


export const createTextNode = (text:string):Node<any> =>
  new Text(text)

export const createElement = <message> (name:string, 
                                  settings:Iterable<Setting<message>>,
                                  children?:Iterable<Node<message>>):Element<message> => {
  return new Element(null, name, settings, children)
}

export const createElementNS = <message> (namespaceURI:string,
                                    name:string, 
                                    settings:Iterable<Setting<message>>,
                                    children?:Iterable<Node<message>>):ElementNS<message> => {
  return new ElementNS(namespaceURI, name, settings, children)
}

function createThunk<message>(render: () => message):Node<message>
function createThunk<a, message>(render:(a1:a) => message, a1: a):Node<message>
function createThunk<a, b, message>(render:(a1:a, a2:b) => message, a1:a, a2:b):Node<message>
function createThunk<a, b, c, message>(render:(a1:a, a2:b, a3:c) => message, a1:a, a2:b, a3:c):Node<message>
function createThunk<a, b, c, d, message>(render:(a1:a, a2:b, a3:c, a4:d) => message, a1:a, a2:b, a3:c, a4:d):Node<message>
function createThunk<a, b, c, d, e, message>(render:(a1:a, a2:b, a3:c, a4:d, a5:e) => message, a1:a, a2:b, a3:c, a4:d, a5:e):Node<message>
function createThunk<a, b, c, d, e, f, message>(render:(a1:a, a2:b, a3:c, a4:d, a5:e, a6:f) => message, a1:a, a2:b, a3:c, a4:d, a5:e, a6:f):Node<message>
function createThunk<a, b, c, d, e, f, g, message>(render:(a1:a, a2:b, a3:c, a4:d, a5:e, a6:f, a7:g) => message, a1:a, a2:b, a3:c, a4:d, a5:e, a6:f, a7:g):Node<message>
function createThunk<a, b, c, d, e, f, g, h, message>(render:(a1:a, a2:b, a3:c, a4:d, a5:e, a6:f, a7:g, a8:h) => message, a1:a, a2:b, a3:c, a4:d, a5:e, a6:f, a7:g, a8:h):Node<message>
function createThunk<message>(render: (...args:Array<any>) => Node<message>, ...args:Array<any>):Node<message> {
  return new Thunk(render, args)
}
export {createThunk}

export class Property {
  kind:"Property" = "Property"
  constructor(public name:string, public value:any) {

  }
}

export class Attribute {
  kind:"Attribute" = "Attribute"
  constructor(public namespaceURI:string|null, public name:string, public value:string) {
  }
}

export class Style {
  kind:"Style" = "Style"
  constructor(public rules:Iterable<StyleRule>) {

  }
}

export class On <message> implements EventHandler<message> {
  kind:"EventHandler" = "EventHandler"
  capture:boolean = false
  constructor(public eventType:string,
              public decoder:Decoder<message>,
              public stopPropagation?:(payload:message) => boolean,
              public preventDefault?:(payload:message) => boolean) {
  }
  map <tagged> (tag:(payload:message) => tagged):EventHandler<tagged> {
    return new TaggedOn(this.eventType, 
                        this.decoder,
                        tag,
                        this.stopPropagation,
                        this.preventDefault)

  }
  decode(event:Event):message {
    const payload = this.decoder(event)
    if (this.stopPropagation && this.stopPropagation(payload)) {
      event.stopPropagation()
    }
    if (this.preventDefault && this.preventDefault(payload)) {
      event.preventDefault()
    }

    return payload
  }
  handleEvent(event:Event) {
    void this.decode(event)
  }
}

class TaggedOn <untagged, message> implements EventHandler<message> {
  kind:"EventHandler" = "EventHandler"
  capture:boolean = false
  constructor(public eventType:string,
              public decoder:Decoder<untagged>,
              public tag:(payload:untagged) => message,
              public stopPropagation?:(payload:untagged) => boolean,
              public preventDefault?:(payload:untagged) => boolean) {
    
  }
  map <tagged> (tag:(payload:message) => tagged):EventHandler<tagged> {
    return new TaggedOn(this.eventType,
                        this.decoder,
                        compose(this.tag, tag),
                        this.stopPropagation,
                        this.preventDefault)
  }
  decode(event:Event):message {
    const payload = this.decoder(event)
    if (this.stopPropagation && this.stopPropagation(payload)) {
      event.stopPropagation()
    }
    if (this.preventDefault && this.preventDefault(payload)) {
      event.preventDefault()
    }

    return this.tag(payload)
  }
  handleEvent(event:Event) {
    void this.decode(event)
  }
}

export class ClassNames {
  kind:"ClassNames" = "ClassNames"
  constructor(public names:Iterable<string>) {
  }
}

export type Setting <message> =
  | Property
  | Attribute
  | Style
  | EventHandler <message>
  | ClassNames

export const mapSetting = <a, b> (f:(message:a) => b, setting:Setting<a>):Setting<b> => {
  switch (setting.kind) {
    case "Property":
      return setting
    case "Attribute":
      return setting
    case "Style":
      return setting
    case "EventHandler":
      return setting.map(f)
    case "ClassNames":
      return setting
  }
}

export class StyleRule {
  constructor(public name:string, public value:string) {

  }
}

export const style = (rules:Array<StyleRule>):Style => {
  return new Style(rules)
}

export type Decoder <message> =
  (value:any) => message
  
export const onWithOptions = <message> (eventType:string,
                                 decoder:Decoder<message>,
                                 stopPropagation:(payload:message) => boolean,
                                 preventDefault:(payload:message) => boolean):EventHandler<message> => {
   return new On(eventType, decoder, stopPropagation, preventDefault)
}

export const indexed = <message> (name:string,
                          settings:Array<Setting<message>>,
                          children:Iterable<Keyed<Node<message>>>):Node<message> => {
  return new IndexedElement(null, name, settings, children)
}



