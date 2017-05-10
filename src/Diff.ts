// import {HashMap} from "./DOM"

// import {EventListener, Patch, ChangeNode, ChangeElement, ChangeText, ChangeComment,
//         NewNode, NewElement, NewText, NewComment} from "./DOMChangeList"
// import {Node, Comment, Text, Element, ElementNS, Tagged, Thunk,
//         Indexed, ElementNode, Keyed, empty} from "./DOMBuffer"
// import {NoOp, Delete, CreateText, CreateComment, CreateElement,
//         PatchComment, PatchText, PatchElement} from "./DOMPatch"

// const createNode = <message> (node:Node<message>):NewNode => {
//   switch (node.kind) {
//     case "Thunk":
//       return createNode(node.force())
//     case "Text":
//       return createText(node)
//     case "Element":
//     case "ElementNS":
//       return createElement(node)
//     case "Indexed":
//       return createIndexed(node)
//     case "Tagged":
//       return createNode(node.node)
//   }
// }

// const createComment = <message> (node:Comment<message>):NewComment =>
//   new CreateComment().setTextContent(node.text)

// const createText = <message> (node:Text<message>):NewText =>
//   new CreateText().setTextContent(node.text)

// const createElement = <message> (element:Element<message>|ElementNS<message>):CreateElement => {
//   const changes = diffElement(null, element, new PatchElement())
//   return new CreateElement(element.namespaceURI, element.localName, changes)
// }

// const createIndexed = <message> (element:Indexed<message>):CreateElement => {
//   const changes = diffIndexed(null, element, new PatchElement())
//   return new CreateElement(element.namespaceURI, element.localName, changes)
// }


// const diffText = <message> (last:null|Text<message>, next:Text<message>, patch:ChangeText):ChangeText => {
//   if (last == null || last.text !== next.text) {
//     return patch.setTextContent(next.text)
//   } else {
//     return patch
//   }
// }

// const diffComment = <message> (last:null|Comment<message>, next:Text<message>, patch:ChangeComment):ChangeComment => {
//   if (last == null || last.text !== next.text) {
//     return patch.setTextContent(next.text)
//   } else {
//     return patch
//   }
// }


// const diffElement = <message> (last:null|Element<message>|ElementNS<message>, next:Element<message>|ElementNS<message>, patch:ChangeElement):ChangeElement => {
//   const settingsPatch = diffSettings(last, next, patch)
//   const childrenPatch = diffChildren(last == null ? empty : last.children, next.children, settingsPatch)
//   return childrenPatch
// }

// const diffSettings = <message> (last:null|ElementNode<message>, next:ElementNode<message>, patch:ChangeElement):ChangeElement => {
//   const {properties, attributes, events, styles} = next
//   const propertyPatch = diffProperties(last && last.properties, properties, patch)
//   const attributePatch = diffAttributes(last && last.attributes, attributes, patch)
//   const stylePatch = diffStyles(last && last.styles, styles, patch)
//   const eventPatch = diffListeners(last && last.events, events, patch)
//   return eventPatch
// }

// function diffProperties (last:HashMap<any>|null, next:HashMap<any>|null, patch:ChangeElement):ChangeElement {
//   if (last != null) {
//     for (let name in last) {
//       if (next == null || !(name in last)) {
//         patch = patch.removeProperty(name)
//       }
//     }
//   }
  
//   if (next != null) {
//     for (let name in next) {
//       const value = next[name]
//       if (last == null || last[name] !== value) {
//         patch = patch.setProperty(name, value)
//       }
//     }
//   }

//   return patch
// }

// // TODO: Decouple attributesNS from attributes
// type Attribute =
//   {namespaceURI:string|null, name:string, value:string}

// const diffAttributes = (last:HashMap<Attribute>|null, next:HashMap<Attribute>|null, patch:ChangeElement):ChangeElement => {
//   if (last != null) {
//     for (let key in last) {
//       if (next == null || !(key in next)) {
//         const {namespaceURI, name} = last[key]
//         patch = namespaceURI == null
//           ? patch.removeAttribute(name)
//           : patch.removeAttributeNS(namespaceURI, name)
//       }
//     }
//   }

//   if (next != null) {
//     for (let key in next) {
//       const {namespaceURI, name, value} = next[key]
//       const attribute = last && last[key]
//       if (attribute == null || attribute.value !== value) {
//         patch = namespaceURI == null
//           ? patch.setAttribute(name, value)
//           : patch.setAttributeNS(namespaceURI, name, value)
//       }
//     }
//   }

//   return patch
// }

// const diffStyles = (last:HashMap<string>|null, next:HashMap<string>|null, patch:ChangeElement):ChangeElement => {
//   if (last) {
//     for (let name in last) {
//       if (next == null || !(name in next)) {
//         patch = patch.removeStyleProperty(name)
//       }
//     }
//   }
    
//   if (next != null) {
//     for (let name in next) {
//       const value = next[name]
//       if (last == null || last[name] !== value) {
//         patch = patch.setStyleProperty(name, value)
//       }
//     }
//   }

//   return patch
// }


// const diffClassNames = (last:HashMap<string>|null, next:HashMap<string>|null, patch:ChangeElement):ChangeElement => {
//   if (last != null) {
//     for (let name in last) {
//       if (next == null || !(name in next)) {
//         patch = patch.removeClassName(name)
//       }
//     }
//   }

//   if (next != null) {
//     for (let name in next) {
//       if (last == null || !(name in last)) {
//         patch = patch.addClassName(name)
//       }
//     }
//   }

//   return patch
// }

// const diffListeners = (last:HashMap<EventListener>|null, next:HashMap<EventListener>|null, patch:ChangeElement):ChangeElement => {
//   if (last) {
//     for (let name in last) {
//       if (next == null || !(name in next)) {
//         const listener = last[name]
//         patch = patch.removeEventListener(name, listener, listener.capture)
//       }
//     }
//   }
    
//   if (next != null) {
//     for (let name in next) {
//       const listener = next[name]
//       const old = last && last[name]
//       const isDiff =
//         old == null ||
//         old.capture !== listener.capture ||
//         old.handleEvent !== listener.handleEvent

//       if (isDiff) {
//         patch = patch.setEventListener(name, listener, listener.capture)
//       }
//     }
//   }

//   return patch
// }

// const diffChildren = <message> (last:ReadonlyArray<Node<message>>, next:ReadonlyArray<Node<message>>, patch:ChangeElement):ChangeElement => {
//   const lastCount = last.length
//   const nextCount = next.length
//   const count = lastCount > nextCount
//     ? lastCount
//     : nextCount

//   for (let index = 0; index < count; index++) {
//     if (index >= lastCount) {
//       const child = next[index]
//       patch = patch.appendChild(createNode(child))
//     }
//     else if (index >= nextCount) {
//       patch = patch.patchChild(index, Delete)
//     }
//     else {
//       const lastChild = last[index]
//       const nextChild = next[index]
//       if (lastChild.kind != nextChild.kind) {
//         patch = patch.patchChild(index, createNode(nextChild))
//       } else {
//         patch = patch.patchChild(index, diffNode(lastChild, nextChild))
//       }
      
//       index++
//     }
//   }

//   return patch
// }

// const diffNode = <message> (last:Node<message>, next:Node<message>):Patch => {
//   switch (next.kind) {
//     case "Text": {
//       if (last.kind === "Text") {
//         return diffText(last, next, new PatchText())
//       }
//       break
//     }
//     case "Element": {
//       if (last.kind === "Element") {
//         return diffElement(last, next, new PatchElement())
//       }
//       break
//     }
//     case "ElementNS": {
//       if (last.kind === "ElementNS") {
//         return diffElement(last, next, new PatchElement())
//       }
//       break
//     }
//     case "Indexed": {
//       if (last.kind === "Indexed") {
//         return diffIndexed(last, next, new PatchElement())
//       }
//       break
//     }
//     case "Thunk": {
//       if (last.kind === "Thunk") {
//         return diffThunk(last, next)
//       }
//       break
//     }
//     case "Tagged": {
//       if (last.kind === "Tagged") {
//         return diffTagged(last, next)
//       }
//     }
//   }
//   return NoOp
// }

// const diffIndexed = <message> (last:null|Indexed<message>, next:Indexed<message>, patch:ChangeElement):ChangeElement => {
//   const settingsPatch = diffSettings(last, next, patch)
//   const childrenPatch = diffKeyedChildren(last == null ? empty : last.children, next.children, settingsPatch)
//   return childrenPatch
// }

// const diffKeyedChildren = <message> (last:ReadonlyArray<Keyed<Node<message>>>, next:ReadonlyArray<Keyed<Node<message>>>, patch:ChangeElement):ChangeElement => {
//   return patch
// }



// const diffThunk = <message> (last:Thunk<message>, next:Thunk<message>):Patch => {
//   const isDiff =
//     last.render !== next.render ||
//     last.args.length !== next.args.length ||
//     last.args[0] !== next.args[0] ||
//     last.args[1] !== next.args[1] ||
//     last.args[2] !== next.args[2] ||
//     last.args[3] !== next.args[3] ||
//     last.args[4] !== next.args[4] ||
//     last.args[5] !== next.args[5] ||
//     last.args[6] !== next.args[6] ||
//     last.args[7] !== next.args[7] ||
//     last.args[8] !== next.args[8]
  
//   if (isDiff) {
//     return diffNode(last.force(), next.force())
//   } else {
//     next.node = last.node
//     return NoOp
//   }
// }


// const diffTagged = <message, tagged> (last:Tagged<message, tagged>, next:Tagged<message, tagged>):Patch => {
//   if (last.tag === next.tag) {
//     return diffNode(last.node, next.node)
//   } else {
//     return createNode(next.node)
//   }
// }