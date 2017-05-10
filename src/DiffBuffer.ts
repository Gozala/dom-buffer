import {
  Node, Comment, Text, Element, ElementNS, Tagged, Thunk,
  IndexedElement, KeyedChildren,
  empty, Properties, Attributes, Styles} from "./DOMBuffer"

import {DOMBuffer} from './DOMBuffer.fbs'
import {flatbuffers} from 'flatbuffers'

type Builder = flatbuffers.Builder
type ChangeChild = DOMBuffer.ChangeChild
type PropertyType = DOMBuffer.PropertyType
type ChangeType = DOMBuffer.ChangeType
type Change = DOMBuffer.Change

const {
  Change, ChangeChild, ChangeType, 
  ChangeText, ChangeComment, ChangeElement,
  PropertyType, ChangeAttribute, ChangeProperty, ChangeStyle,
} = DOMBuffer

const Builder = flatbuffers.Builder


const change = (type:ChangeType) => (change:number, builder:Builder):number => {
  Change.startChange(builder)
  Change.addType(builder, type)
  Change.addChange(builder, change)
  return Change.endChange(builder)
}

const remove = (builder:Builder) => {
  Change.startChange(builder)
  Change.addType(builder, ChangeType.Remove)
  return Change.endChange(builder)
}


const insert = change(ChangeType.Insert)
const edit = change(ChangeType.Edit)
const replace = change(ChangeType.Replace)

const changeText = (text:string,
                    builder:Builder):number => {
  ChangeText.startChangeText(builder)
  ChangeText.addText(builder, builder.createString(text))
  return ChangeText.endChangeText(builder)
}

const changeComment = (text:string,
                       builder:Builder):number => {
  ChangeComment.startChangeComment(builder)
  ChangeComment.addText(builder, builder.createString(text))
  return ChangeComment.endChangeComment(builder)
}


const changeElement = (namespaceURI:null|string,
                        localName:null|string,
                        properties:number|null,
                        attributes:number|null,
                        style:number|null,
                        children:number|null,
                        builder:Builder):number => {
  ChangeElement.startChangeElement(builder)

  if (namespaceURI != null) {
    ChangeElement.addNamespaceURI(builder, builder.createString(namespaceURI))
  }

  if (localName != null) {
    ChangeElement.addLocalName(builder, builder.createString(localName))
  }

  if (properties != null) {
    ChangeElement.addPropreties(builder, properties)
  }

  if (attributes != null) {
    ChangeElement.addAttributes(builder, attributes)
  }

  if (style != null) {
    ChangeElement.addStyle(builder, style)
  }

  if (children != null) {
    ChangeElement.addChildren(builder, children)
  }
  

  return ChangeElement.endChangeElement(builder)
}


///////


const createText = <message> (node:Text<message>, builder:Builder):number =>
  changeText(node.text, builder)

const createComment = <message> (node:Comment<message>, builder:Builder):number =>
  changeComment(node.text, builder)

const createElement = <message> (element:Element<message>|ElementNS<message>,
                                  builder:Builder):number => {

  const {localName, namespaceURI, properties, attributes, styles, children} = element

  return changeElement(localName,
                        namespaceURI,
                        diffProperties(null, properties, builder),
                        diffAttributes(null, attributes, builder),
                        diffStyles(null, styles, builder),
                        diffChildren(empty, children, builder),
                        builder)
  
}

const createIndexedElement = <message> (element:IndexedElement<message>,
                                        builder:Builder):number => {
  const {localName, namespaceURI, properties, attributes, styles, children} = element

  return changeElement(localName,
                        namespaceURI,
                        diffProperties(null, properties, builder),
                        diffAttributes(null, attributes, builder),
                        diffStyles(null, styles, builder),
                        diffKeyedChildren(empty, children, builder),
                        builder)
  
}

const createTagged = <message> (element:Tagged<any, message>,
                                builder:Builder):number => {
  return createElement(element.node, builder)
}

const createThunk = <message> (thunk:Thunk<message>, builder:Builder):number =>
  createNode(thunk.force(), builder)

const createNode = <message> (node:Node<message>, builder:Builder):number => {
  switch (node.kind) {
    case "Text":
      return createText(node, builder)
    case "Comment":
      return createComment(node, builder)
    case "Element":
      return createElement(node, builder)
    case "ElementNS":
      return createElement(node, builder)
    case "IndexedElement":
      return createIndexedElement(node, builder)
    case "Tagged":
      return createTagged(node, builder)
    case "Thunk":
      return createThunk(node, builder)
  }
}

// ///////////////


const push = <value> (item:value, items:null|Array<value>):Array<value> =>
  items == null ? [item] : (items.push(item), items)


const deleteProperty = (name:string, builder:Builder):number =>
  setProperty(name, undefined, builder)
  

const setProperty = (name:string,
                      value:undefined|null|boolean|number|string,
                      builder:Builder):number => {

  ChangeProperty.startChangeProperty(builder)
  ChangeProperty.addName(builder, builder.createString(name))

  switch (typeof(value)) {
    case "boolean": {
      ChangeProperty.addType(builder, PropertyType.Boolean)
      ChangeProperty.addValue(builder, builder.createString(String(value)))
      break
    }
    case "number": {
      ChangeProperty.addType(builder, PropertyType.String)
      ChangeProperty.addValue(builder, builder.createString(String(value)))
      break
    }
    case "string": {
      ChangeProperty.addType(builder, PropertyType.String)
      ChangeProperty.addValue(builder, builder.createString(<string>value))
      break
    }
    case "undefined": {
      ChangeProperty.addType(builder, PropertyType.Undefined)
      break
    }
    default: {
      if (value === null) {
        ChangeProperty.addType(builder, PropertyType.Null)
      } else {
        ChangeProperty.addType(builder, PropertyType.JSON)
        ChangeProperty.addValue(builder,
                                builder.createString(JSON.stringify(value)))
      }
    }

  }
  
  return ChangeProperty.endChangeProperty(builder)
}

const diffProperties = (last:null|Properties,
                        next:null|Properties,
                        builder:Builder):number|null => {
  const properties = null
  if (last != null) {
    for (let name in last) {
      if (next == null || !(name in last)) {
        push(deleteProperty(name, builder), properties)
      }
    }
  }
  
  if (next != null) {
    for (let name in next) {
      const value = next[name]
      if (last == null || last[name] !== value) {
        push(setProperty(name, value, builder), properties)
      }
    }
  }

  const change = properties == null
    ? null
    : ChangeElement.createPropretiesVector(builder, properties)

  return change
}
  

///// 

const setAttribute = (namespaceURI:null|string,
                      name:string,
                      value:null|string,
                      builder:Builder):number => {
  ChangeAttribute.startChangeAttribute(builder)
  ChangeAttribute.addName(builder, builder.createString(name))
  if (namespaceURI != null) {
    ChangeAttribute.addNamespaceURI(builder, builder.createString(namespaceURI))
  }
  if (value != null) {
    ChangeAttribute.addValue(builder, builder.createString(value))
  }
  return ChangeAttribute.endChangeAttribute(builder)
}

const removeAttribute = (namespaceURI:null|string,
                          name:string,
                          builder:Builder):number =>
  setAttribute(namespaceURI, name, null, builder)

const diffAttributes = (last:null|Attributes,
                        next:null|Attributes,
                        builder:Builder):number|null => {
  let attributes = null
  
  if (last != null) {
    for (let key in last) {
      if (next == null || !(key in next)) {
        const {name, namespaceURI} = last[key]
        attributes = push(removeAttribute(namespaceURI, name, builder), attributes)
      }
    }
  }

  if (next != null) {
    for (let key in next) {
      const {namespaceURI, name, value} = next[key]
      const attribute = last && last[key]
      if (attribute == null || attribute.value !== value) {
        attributes = push(setAttribute(namespaceURI, name, value, builder), attributes)
      }
    }
  }

  const change = attributes == null
    ? null
    : ChangeElement.createAttributesVector(builder, attributes)

  return change
}

const diffStyles = (last:null|Styles,
                    next:null|Styles,
                    builder:Builder):number|null => {
  let styles = null

  if (last) {
    for (let name in last) {
      if (next == null || !(name in next)) {
        styles = push(removeStyleRule(name, builder), styles)
      }
    }
  }
    
  if (next != null) {
    for (let name in next) {
      const value = next[name]
      if (last == null || last[name] !== value) {
        styles = push(setStyleRule(name, value, builder), styles)
      }
    }
  }

  const change = styles == null
    ? null
    : ChangeElement.createStyleVector(builder, styles)

  return change
}

const setStyleRule = (name:string,
                      value:null|string,
                      builder:Builder):number => {
  ChangeStyle.startChangeStyle(builder)
  ChangeStyle.addName(builder, builder.createString(name))
  if (value != null) {
    ChangeStyle.addValue(builder, builder.createString(value))
  }
  return ChangeStyle.endChangeStyle(builder)
}

const removeStyleRule = (name:string, builder:Builder):number =>
  setStyleRule(name, null, builder)

const diffText = <message> (last:null|Text<message>,
                            next:Text<message>,
                            builder:Builder):null|number => {
  // TODO: Optimize prepend, append, delete cases
  if (last == null) {
    return replace(changeText(next.text, builder), builder)
  } else if (last.text !== next.text) {
    return edit(changeText(next.text, builder), builder)
  } else {
    return null
  }
}

const diffComment = <message> (last:null|Comment<message>,
                                next:Comment<message>,
                                builder:Builder):null|number => {
  // TODO: Optimize prepend, append, delete cases
  if (last == null) {
    return replace(changeComment(next.text, builder), builder)
  } else if (last.text !== next.text) {
    return edit(changeComment(next.text, builder), builder)
  } else {
    return null
  }
}

const changeChild = (index:number, change:number, builder:Builder):number => {
  ChangeChild.startChangeChild(builder)
  ChangeChild.addIndex(builder, index)
  ChangeChild.addChange(builder, change)
  return ChangeChild.endChangeChild(builder)
}


export const diff = <message> (last:null|Node<message>,
                        next:Node<message>):Uint8Array|null => {
  const builder = new Builder(1024)
  const change = last == null
    ? insert(createNode(next, builder), builder)
    : diffNode(last, next, builder)
  
  if (change == null) {
    return change
  } else {
    builder.finish(change)
    return builder.asUint8Array()
  }
}

const diffNode = <message> (last:Node<message>,
                            next:Node<message>,
                            builder:Builder):null|number => {
  switch (next.kind) {
    case "Text": {
      if (last.kind === "Text") {
        return diffText(last, next, builder)
      } else {
        return replace(createText(next, builder), builder)
      }
    }
    case "Comment": {
      if (last.kind === "Comment") {
        return diffComment(last, next, builder)
      } else {
        return replace(createComment(next, builder), builder)
      }
    }
    case "Element": {
      if (last.kind === "Element") {
        return diffElement(last, next, builder)
      } else {
        return replace(createElement(next, builder), builder)
      }
    }
    case "ElementNS": {
      if (last.kind === "Element") {
        return diffElement(last, next, builder)
      } else {
        return replace(createElement(next, builder), builder)
      }
    }
    case "IndexedElement": {
      if (last.kind === "IndexedElement") {
        return diffIndexedElement(last, next, builder)
      } else {
        return replace(createIndexedElement(next, builder), builder)
      }
    }
    case "Tagged": {
      if (last.kind === "Tagged") {
        return diffTagged(last, next, builder)
      } else {
        return replace(createTagged(next, builder), builder)
      }
    }
    case "Thunk": {
      if (last.kind === "Thunk") {
        return diffThunk(last, next, builder)
      } else {
        return replace(createNode(next.force(), builder), builder)
      }
    }
  }
}

const diffTagged = <message, tagged> (last:Tagged<message, tagged>,
                                      next:Tagged<message, tagged>,
                                      builder:Builder):null|number => {
  return diffElement(last.node, next.node, builder)
}

const diffIndexedElement = <message> (last:IndexedElement<message>,
                                      next:IndexedElement<message>,
                                      builder:Builder):null|number => {
  if (last == null ||
      last.localName !== next.localName ||
      last.namespaceURI !== next.namespaceURI) {
    return replace(createIndexedElement(next, builder), builder)
  } else {
    const properties =
      diffProperties(last.properties, next.properties, builder)
    
    const attributes =
      diffAttributes(last.attributes, next.attributes, builder)
  
    const styles =
      diffStyles(last.styles, next.styles, builder)
    
    const children =
      diffKeyedChildren(last.children, next.children, builder)

    const change =
      changeElement(null,
                    null,
                    properties,
                    attributes,
                    styles,
                    children,
                    builder)

    return replace(change, builder)
  }
}

const diffThunk = <message> (last:Thunk<message>,
                              next:Thunk<message>,
                              builder:Builder):number|null => {
  const {args:lastArgs, render:lastRender} = last
  const {args:nextArgs, render:nextRender} = next
  const equal =
    lastRender === nextRender &&
    lastArgs.length === nextArgs.length &&
    lastArgs[0] === nextArgs[0] &&
    lastArgs[1] === nextArgs[1] &&
    lastArgs[2] === nextArgs[2] &&
    lastArgs[3] === nextArgs[3] &&
    lastArgs[4] === nextArgs[4] &&
    lastArgs[5] === nextArgs[5] &&
    lastArgs[6] === nextArgs[6] &&
    lastArgs[7] === nextArgs[7] &&
    lastArgs[8] === nextArgs[8]
  
  if (equal) {
    next.node = last.node
    return null
  } else {
    return diffNode(last.force(), next.force(), builder)
  }
}

const appendChild = (node:number, builder:Builder):number =>
  changeChild(-1, insert(node, builder), builder)

const removeChild = (index:number, builder:Builder):number =>
  changeChild(index, remove(builder), builder)

const replaceChild = (index:number, change:number, builder:Builder):number =>
  changeChild(index, replace(change, builder), builder)

const diffChildren = <message> (last:ReadonlyArray<Node<message>>,
                                next:ReadonlyArray<Node<message>>,
                                builder:Builder):number|null => {
  let children = null

  const lastCount = last.length
  const nextCount = next.length
  const count = lastCount > nextCount
    ? lastCount
    : nextCount

  for (let index = 0; index < count; index++) {
    if (index >= lastCount) {
      const nextChild = next[index]
      children = push(appendChild(createNode(nextChild, builder), builder), children)
    }
    else if (index >= nextCount) {
      children = push(removeChild(index, builder), children)
    }
    else {
      const lastChild = last[index]
      const nextChild = next[index]
      if (lastChild.kind != nextChild.kind) {
        push(replaceChild(index, createNode(nextChild, builder), builder), children)
      } else {
        const change = diffNode(lastChild, nextChild, builder)
        if (change != null) {
          push(changeChild(index, change, builder), children)
        }
      }
      
      index++
    }
  }
  
  const change = children == null
    ? null
    : ChangeElement.createChildrenVector(builder, children)

  return change
}


const keyedChild = <a, b> ([,node]:[a, b]) => node
const diffKeyedChildren = <message> (last:KeyedChildren<message>,
                                      next:KeyedChildren<message>,
                                      builder:Builder):number|null => {
  return diffChildren(last.map(keyedChild), next.map(keyedChild), builder)              
}



const diffElement = <message> (last:null|Element<message>|ElementNS<message>,
                                next:Element<message>|ElementNS<message>,
                                builder:Builder):number => {
  if (last == null ||
      last.localName !== next.localName ||
      last.namespaceURI !== next.namespaceURI) {
    return replace(createElement(next, builder), builder)
  } else {
    const properties =
      diffProperties(last.properties, next.properties, builder)
    
    const attributes =
      diffAttributes(last.attributes, next.attributes, builder)
  
    const styles =
      diffStyles(last.styles, next.styles, builder)
    
    const children =
      diffChildren(last.children, next.children, builder)

    const change =
      changeElement(null,
                    null,
                    properties,
                    attributes,
                    styles,
                    children,
                    builder)

    return edit(change, builder)
  }
}

