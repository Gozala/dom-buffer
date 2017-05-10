import {DOM, HashMap, EventHandler} from "./DOM"


export class Text <message> {
  kind:"Text" = "Text"
  descendantsCount:number = 0
  constructor(public text:string) {   
  }
  map <tagged> (tag:(payload:message) => tagged):Text<tagged> {
    const tagged:Text<any> = this
    return tagged
  }
  diff(next:Node<message>, patch:Patch, index:number):Patch {
    if (next.kind === "Text") {
      return patch.patchText(index, this.text)
    } else {
      return patch.redraw(index, this)
    }
  }
}

const erase = {}



export class ElementNode <message> {
  events:HashMap<EventHandler<message>>|null
  properties:HashMap<any>|null
  attributes:HashMap<Attribute>|null
  styles:HashMap<string>|null
  classNames:HashMap<string>|null
  descendantsCount:number
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
  diff(next:Node<message>, patch:Patch, index:number):Patch {
    if (next.kind === "Element" && this.localName === next.localName && this.namespaceURI === next.namespaceURI) {
      const {properties, attributes, events, classNames, styles, children} = next
      const patch1 = this.diffProperties(properties, patch, index)
      const patch2 = this.diffAttributes(attributes, patch, index)
      const patch3 = this.diffStyles(styles, patch, index)
      const patch4 = this.diffClassNames(classNames, patch, index)
      const patch5 = this.diffChildren(children, patch2, index)
      return patch5
    } else {
      return patch.redraw(index, next)
    }
  }
  diffChildren(children:ReadonlyArray<any>, patch:Patch, index:number):Patch {
    return patch
  }
  diffProperties(next:HashMap<any>|null, patch:Patch, index:number):Patch {
    const current = this.properties
    if (current != null) {
      for (let name in current) {
        if (next == null || !(name in next)) {
          patch = patch.deleteProperty(index, name)
        }
      }
    }
    
    if (next != null) {
      for (let name in next) {
        const value = next[name]
        if (current == null || current[name] !== value) {
          patch = patch.setProperty(index, name, next)
        }
      }
    }

    return patch
  }
  diffAttributes(next:HashMap<Attribute>|null, patch:Patch, index:number):Patch {
    const current = this.attributes
    if (current != null) {
      for (let key in current) {
        if (next == null || !(key in next)) {
          const {namespaceURI, name} = current[key]
          patch = namespaceURI == null
            ? patch.removeAttribute(index, name)
            : patch.removeAttributeNS(index, namespaceURI, name)
        }
      }
    }

    if (next != null) {
      for (let key in next) {
        const {namespaceURI, name, value} = next[key]
        const attribute = current && current[key]
        if (attribute == null || attribute.value !== value) {
          patch = namespaceURI == null
            ? patch.setAttribute(index, name, value)
            : patch.setAttributeNS(index, namespaceURI, name, value)
        }
      }
    }

    return patch
  }
  diffStyles(next:HashMap<string>|null, patch:Patch, index:number):Patch {
    const current = this.styles
    if (current) {
      for (let name in current) {
        if (next == null || !(name in next)) {
          patch = patch.removeStyleProperty(index, name)
        }
      }
    }
    
    if (next != null) {
      for (let name in next) {
        const value = next[name]
        if (current == null || current[name] !== value) {
          patch = patch.setStyleProperty(index, name, value)
        }
      }
    }

    return patch
  }
  diffClassNames(next:HashMap<string>|null, patch:Patch, index:number):Patch {
    const current = this.classNames
    if (current != null) {
      for (let name in current) {
        if (next == null || !(name in next)) {
          patch = patch.removeClassName(index, name)
        }
      }
    }

    if (next != null) {
      for (let name in next) {
        if (current == null || !(name in current)) {
          patch = patch.addClassName(index, name)
        }
      }
    }

    return patch
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

    let descendantsCount = 0
    if (children == null) {
      this.children = empty
    } else {
      for (let child of children) {
        kids.push(child)
        descendantsCount += child.descendantsCount
      }

      this.children = kids
      this.descendantsCount += kids.length
    }
  }
  diffChildren(next:Array<Node<message>>, patch:Patch, index:number):Patch {
    const current = this.children || empty
    const currentCount = current.length
    const nextCount = next.length
    const count = currentCount > nextCount
      ? currentCount
      : nextCount

    let n = 0
    for (let i = 0; i < count; i++) {
      if (index >= currentCount) {
        patch = patch.appendChild(index, next[i])
      }
      else if (index >= nextCount) {
        patch = patch.removeChild(index, i)
      }
      else {
        const child = current[i]
        patch = child.diff(next[i], patch, ++index)
        index += child.descendantsCount
      }
    }

    return patch
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
  

export class Indexed <message> extends ElementNode<message> {
  kind:"Indexed" = "Indexed"
  descendantsCount:number
  children:ReadonlyArray<Keyed<Node<message>>>
  constructor(namespaceURI:string|null,
              localName:string,
              settings:Iterable<Setting<message>>,
              children?:Iterable<Keyed<Node<message>>>) {
    super(namespaceURI, localName, settings)

    const kids = []

    let descendantsCount = 0
    if (children == null) {
      this.children = empty
    } else {
      for (let child of children) {
        kids.push(child)
        descendantsCount += child[1].descendantsCount
      }

      this.children = kids
    }
    this.descendantsCount += kids.length
  }
  diffChildren(newChildren:ReadonlyArray<Keyed<Node<message>>>, patch:Patch, index:number):Patch {
    const localPatches:Array<any> = []
    const changes:HashMap<any> = {}
    const inserts:Array<any> = []

    const oldChildren = this.children

    const newCount = newChildren.length
    const oldCount = oldChildren.length

    let positionInOld = 0
    let positionInNew = 0

    while (positionInOld < oldCount && positionInNew < newCount) {
      const oldChild = oldChildren[positionInOld]
      const newChild = newChildren[positionInNew]

      const [oldKey, oldNode] = oldChild
      const [newKey, newNode] = newChild

      if (oldKey === newKey) {
        index++
        patch = oldNode.diff(newNode, patch, index)
        index += oldNode.descendantsCount

        positionInOld ++
        positionInNew ++
      } else {
        const oldNextChild = oldChildren[positionInOld + 1]
        const newNextChild = newChildren[positionInNew + 1]
        const oldMatch = oldNextChild == null
          ? false
          : newKey === oldNextChild[0]
        const newMatch = newNextChild == null
          ? false
          : oldKey === newNextChild[0]

        const bothMatch = oldMatch && newMatch
        const nextMatch = oldNextChild == null
          ? false
          : newNextChild == null
          ? false
          : oldNextChild[0] === newNextChild[0]
        
        
        // Swap
        
        if (oldNextChild != null && newNextChild != null && bothMatch) {
          const [oldNextKey, oldNextNode] = oldNextChild
          const [newNextKey, newNextNode] = newNextChild

          index ++
          patch = oldNode.diff(newNextNode, patch, index)
          patch = insertNode(changes,
                              patch,
                              oldKey,
                              newNode,
                              positionInNew,
                              inserts)

          index += oldNode.descendantsCount

          index ++
          patch = removeNode(changes, patch, oldKey, newNextNode, index)
          index += newNextNode.descendantsCount

          positionInOld += 2
          positionInNew += 2

        } else if (oldNextChild != null && newNextChild != null && newMatch) {

        // Insert

          const [newNextKey, newNextNode] = newNextChild

          index++
			    patch = insertNode(changes,
                              patch,
                              oldKey,
                              newNode,
                              positionInNew,
                              inserts)

          patch = oldNode.diff(newNextNode, patch, index)
          index += oldNode.descendantsCount

          positionInOld += 1
          positionInNew += 2

        } else if (newNextChild != null && oldNextChild != null && oldMatch) {
        
        // Remove
          
          const [oldNextKey, oldNextNode] = oldNextChild
          index++

          patch = removeNode(changes, patch, oldKey, oldNode, index)
			    index += oldNode.descendantsCount

			    index++
          patch = oldNextNode.diff(newNode, patch, index)
			    index += oldNextNode.descendantsCount || 0;

          positionInOld += 2
          positionInNew += 1

        } else if (oldNextChild != null && newNextChild != null && nextMatch) {
          const [oldNextKey, oldNextNode] = oldNextChild
          const [newNextKey, newNextNode] = newNextChild
          // Remove, Insert

          index++;
			    patch = removeNode(changes, patch, oldKey, oldNode, index)
			    patch  = insertNode(changes, patch, newKey, newNode, positionInNew, inserts)

			    index += oldNode.descendantsCount;

			    index++
			    patch = oldNextNode.diff(newNextNode, patch, index)
			    index += oldNextNode.descendantsCount;

			    positionInOld += 2
          positionInNew += 2
        } else {
          // eat up any remaining nodes with removeNode and insertNode
          while (positionInOld < oldCount) {
            index ++
            const [oldKey, oldNode] = oldChildren[positionInOld]
            patch = removeNode(changes, patch, oldKey, oldNode, index)
            index += oldNode.descendantsCount
            positionInOld ++
          }

          let endInserts
          while (positionInNew < newCount) {
            endInserts = endInserts || [];
            const [newKey, newNode] = newChildren[positionInNew]
            patch = insertNode(changes, patch, newKey, newNode, undefined, endInserts);
            positionInNew ++
          }
        }

        
      }
    }

    return patch
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
  constructor(public node:Node<inner>, public tag:(payload:inner) => message) {
    this.descendantsCount = node.descendantsCount + 1  
  }
  map <tagged> (tag:(payload:message) => tagged):Node<tagged> {
    const f = compose(this.tag, tag)
    return new Tagged(this.node, f)
  }
  diff(next:Node<message>, patch:Patch, index:number):Patch {
    if (next.kind === "Tagged") {
      const {tag, node} = next
      const tagPatch = this.tag !== tag
        ? patch.patchTagger(index, tag)
        : patch
      
      return this.node.diff(node, tagPatch, index + 1)
    } else {
      return patch.redraw(index, next)
    }
  }
}



export class Thunk <message>  {
  kind:"Thunk"="Thunk"
  descendantsCount:number = 0
  constructor (
    private render:(...args:Array<any>) => Node<message>,
    private args:Array<any>,
    public node?:Node<message>) {
      
  }
  force():Node<message> {
    const node = this.node == null
      ? this.node = this.render(...this.args)
      : this.node
    return node
  }
  diff(next:Node<message>, patch:Patch, index:number):Patch {
    const {node} = this
    if (next.kind === "Thunk" && node != null) {
      const thunk:Thunk<message> = next
      const {render, args} = next
      const isEqual =
        this.render === render &&
        this.args[0] === args[0] &&
        this.args[1] === args[1] &&
        this.args[2] === args[2] &&
        this.args[3] === args[3] &&
        this.args[4] === args[4] &&
        this.args[5] === args[5] &&
        this.args[6] === args[6] &&
        this.args[7] === args[7]

        if (isEqual) {
          next.node = node
          return patch
        } else {
          next.node = render(...args)
          return patch.patchThunk(index, node.diff(next.node, new Patch([]), 0))
        }
    } else {
      return patch.redraw(index, next)
    }
  }
}


export type Node <message> =
  | Text <message>
  | Element<message>
  | ElementNS<message>
  | Indexed<message>
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
  return new Indexed(null, name, settings, children)
}


class Redraw {
  kind:"Redraw" = "Redraw"
  constructor(public index:number,
              public node:Node<any>) {

  }
}

class ThunkPatch {
  kind:"ThunkPatch" = "ThunkPatch"
  constructor(public index:number,
              public patch:Patch) {

  }
}

class TaggerPatch <message, tagged> {
  kind: "TaggerPatch" = "TaggerPatch"
  constructor(public index:number,
              public tag:(payload:message) => tagged) {

  }
}

class TextPatch {
  kind: "TaggerPatch" = "TaggerPatch"
  constructor(public index:number,
              public text:string) {

  }
}

export type Change =
  | Redraw
  | ThunkPatch
  | TaggerPatch <any, any>
  | TextPatch

export class Patch {
  constructor(public changes:Array<Change>) {

  }
  redraw(index:number, node:Node<any>):Patch {
    this.changes.push(new Redraw(index, node))
    return this
  }
  patchThunk(index:number, change:Patch):Patch {
    this.changes.push(new ThunkPatch(index, change))
    return this
  }
  patchTagger <message, tagged> (index:number, tag:(payload:message) => tagged):Patch {
    this.changes.push(new TaggerPatch(index, tag))
    return this
  }
  patchText(index:number, text:string):Patch {
    this.changes.push(new TextPatch(index, text))
    return this
  }
  deleteProperty(index:number, name:string):Patch {
    return this
  }
  setProperty(index:number, name:string, value:any):Patch {
    return this
  }
  setAttribute(index:number, name:string, value:string):Patch {
    return this
  }
  removeAttribute(index:number, name:string):Patch {
    return this
  }
  setAttributeNS(index:number, namespaceURI:string, name:string, value:string):Patch {
    return this
  }
  removeAttributeNS(index:number, namespaceURI:string, name:string):Patch {
    return this
  }
  setStyleProperty(index:number, name:string, value:string):Patch {
    return this
  }
  removeStyleProperty(index:number, name:string):Patch {
    return this
  }
  addClassName(index:number, names:string):Patch {
    return this
  }
  removeClassName(index:number, name:string):Patch {
    return this
  }
  appendChild <message> (index:number, node:Node<message>):Patch {
    return this
  }
  removeChild(index:number, n:number):Patch {
    return this
  }
}

const insertNode = <message> (changes:HashMap<any>, localPatches:Patch, key:string, vnode:Node<message>, positionInNew:void|number, inserts:Array<any>):Patch => {
  return localPatches
}

const removeNode = <message> (changes:HashMap<any>, localPatches:Patch, key:string, vnode:Node<message>, index:number):Patch => {
  return localPatches
}