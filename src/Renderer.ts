import {DOM, HashMap, EventHandler, EventTarget, Mailbox} from "./DOM"
import {Node, Style, Patch} from "./VirtualDOM"

const render = <message> (root:Node<message>, mailbox:Mailbox<message>):DOM<message> => {
  switch (root.kind) {
    case "Thunk": {
      const thunk = root
      const node = thunk.node == null
        ? thunk.force()
        : thunk.node
      
      return render(node, mailbox)
    }
    case "Tagged": {
      const {node, tag} = root
      return render(node, mailbox.map(tag))
    }
    case "Text": {
      return document.createTextNode(root.text)
    }
    case "ElementNS":
    case "Element": {
      const {events, properties, attributes, styles, classNames} = root
      const tree = root.namespaceURI == null
        ? document.createElement(root.localName)
        : document.createElementNS(root.namespaceURI, root.localName)
      
      if (properties != null) {
        applyProperties(tree, properties)
      }

      if (attributes != null) {
        applyAttributes(tree, attributes)
      }
      
      if (styles != null) {
        applyStyles(tree, styles)
      }

      if (classNames != null) {
        applyClassNames(tree, classNames)
      }

      if (events != null) {
        applyEvents(tree, mailbox, events)
      }

      for (let child of root.children) {
        tree.appendChild(render(child, mailbox))
      }

      return tree
    }
    case "Indexed": {
      const {events, properties, attributes, styles, classNames} = root
      const tree = root.namespaceURI == null
        ? document.createElement(root.localName)
        : document.createElementNS(root.namespaceURI, root.localName)
      
      if (properties != null) {
        applyProperties(tree, properties)
      }

      if (attributes != null) {
        applyAttributes(tree, attributes)
      }
      
      if (styles != null) {
        applyStyles(tree, styles)
      }

      if (classNames != null) {
        applyClassNames(tree, classNames)
      }

      if (events != null) {
        applyEvents(tree, mailbox, events)
      }

      for (let child of root.children) {
        tree.appendChild(render(child[1], mailbox))
      }

      return tree
    }
  }
}

const applyStyles = (node:{style?:CSSStyleDeclaration}, rules:HashMap<string|undefined>):void => {
  const {style} = node
  if (style) {
    for (let name in rules) {
      const value = rules[name]
      if (value === undefined) {
        style.removeProperty(name)
      } else {
        style.setProperty(name, value)
      }
    }
  }
}

const applyAttributes = (element:Element,
                         attributes:HashMap<{namespaceURI:string|null, value:string|undefined}>):void => {
  for (let name in attributes) {
    const {namespaceURI, value} = attributes[name]
    if (value === undefined) {
      if (namespaceURI == null) {
        element.removeAttribute(name)
      } else {
        element.removeAttributeNS(namespaceURI, name)
      }
    } else {
      if (namespaceURI == null) {
        element.setAttribute(name, value)
      } else {
        element.setAttributeNS(namespaceURI, name, value)
      }
    }
  }
}

const applyProperties = (element:{[key:string]:any},
                         properties:HashMap<any>):void => {
  for (let name in properties) {
    const value = properties[name]
    if (value === undefined) {
      delete element[name]
    } else if (element[name] !== value) {
      element[name] = value
    }
  }
}


const applyClassNames = (element:Element, classNames:HashMap<string|undefined>):void => {
  const {classList} = element
  for (let key in classNames) {
    const value = classNames[key]
    if (value == null) {
      classList.remove(key)
    } else {
      classList.add(value)
    }
  }
}

const applyEvents = <message> (element:DOM<message>, mailbox:Mailbox<message>, events:HashMap<null|EventHandler<message>>):void => {
  const eventTarget = element.eventTarget == null
    ? new EventRouter(mailbox, Object.create(null))
    : element.eventTarget
  
  eventTarget.mailbox = mailbox
  const {decoders} = eventTarget

  for (let type in events) {
    const handler = events[type]
    if (!(type in decoders)) {
      element.addEventListener(type, eventTarget)
    }

    eventTarget.decoders[type] = handler
  }
}

class EventRouter <message> implements EventTarget<message> {
  constructor(
    public mailbox:Mailbox<message>,
    public decoders:HashMap<null|EventHandler<message>>) {
    
  }
  handleEvent(event:Event):void {
    const handler = this.decoders[event.type]
    if (handler == null) {
      event.target.removeEventListener(event.type, this)
    } else {
      const payload = handler.decode(event)
      this.mailbox.send(payload)
    }
  }
}



const applyPatch = <message> (root:DOM<message>, patch:Patch):DOM<message> => {
  if (patch.changes.length === 0) {
    return root
  } else {
    for (let change of patch.changes) {
      switch (change.kind) {
        case "Redraw": {
          
        }
      }
    }
  }
  return root
}