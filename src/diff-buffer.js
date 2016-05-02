/* @flow */

import {Attribute, Property, EventDecoder, Text, Element, Thunk, Tagger} from "./dom"
import type {Node, ChildNodes} from "./dom"

export const Instruction =
  { REPLACE_TEXT_CONTENT: 0
  , NEXT_CHILD: 1
  , REPLACE_NODE: 2
  , APPEND_CHILD_NODE: 3
  , SET_ATTRIBUTE: 4
  , REMOVE_ATTRIBUTE: 5
  , ASSIGN_PROPERTY: 6
  , DELETE_PROPERTY: 7
  , ADD_EVENT_LISTENER: 8
  , REMOVE_EVENT_LISTENER: 9
  , REPLACE_EVENT_LISTENER: 10
  , REMOVE_CHILD: 11
  , REMOVE_NODE: 12
  , SELECT_PARENT: 13
  , SELECT_CHILD: 14
  , SET_TAG: 15
  , SET_STYLE_PROPERTY: 16
  , UNSET_STYLE_PROPERTY: 17
  , SET_DATA_ATTRIBUTE: 18
  , REMOVE_DATA_ATTRIBUTE: 19
  }


class Delta {
  /*::
  buffer: Array<any>;
  moves: Array<number>;
  */
  constructor() {
    this.buffer = []
    this.moves = []
  }
  move(data) {
    this.moves.unshift(data)
    return this
  }
  dropMove() {
    this.moves.shift()
    return this
  }
  selectParentNode() {
    return ( this.moves.length === 0
      ? this.move(-1)
      : this.moves[0] >= 0
      ? this
        .dropMove()
        .move(-1)
      : this.move(-1)
      )
  }
  selectChildNode(index) {
    return this.move(index)
  }
  writeMove() {
    let count = this.moves.length
    while (count-- > 0) {
      const move = this.moves[count]
      if (move < 0) {
        this.write(Instruction.SELECT_PARENT)
      }
      else {
        this
          .write(Instruction.SELECT_CHILD)
          .write(move)
      }
    }
    this.moves.length = 0
    return this
  }
  write(data) {
    this.buffer.push(data)
    return this
  }
  replaceTextContent(data) {
    return (
      this
      .writeMove()
      .write(Instruction.REPLACE_TEXT_CONTENT)
      .write(data)
    )
  }
  replaceNode(element) {
    return (
      this
      .writeMove()
      .write(Instruction.REPLACE_NODE)
      .write(element)
    )
  }
  removeNode() {
    return (
      this
      .writeMove()
      .write(Instruction.REMOVE_NODE)
    )
  }
  removeChild(index) {
    return (
      this
      .writeMove()
      .write(Instruction.REMOVE_CHILD)
      .write(index)
    )
  }
  appendChild(node) {
    return (
      this
      .writeMove()
      .write(Instruction.APPEND_CHILD_NODE)
      .write(node)
    )
  }
  setAttribute(name, value) {
    return (
      this
      .writeMove()
      .write(Instruction.SET_ATTRIBUTE)
      .write(name)
      .write(value)
    )
  }
  removeAttribute(name) {
    return (
      this
      .writeMove()
      .write(Instruction.REMOVE_ATTRIBUTE)
      .write(name)
    )
  }
  setDataAttribute(name, value) {
    return (
      this
      .writeMove()
      .write(Instruction.SET_DATA_ATTRIBUTE)
      .write(name)
      .write(value)
    )
  }
  removeDataAttribute(name) {
    return (
      this
      .writeMove()
      .write(Instruction.REMOVE_DATA_ATTRIBUTE)
      .write(name)
    )
  }
  assignProperty(name, value) {
    return (
      this
      .writeMove()
      .write(Instruction.ASSIGN_PROPERTY)
      .write(name)
      .write(value)
    )
  }
  deleteProperty(name, value) {
    return (
      this
      .writeMove()
      .write(Instruction.DELETE_PROPERTY)
      .write(name)
    )
  }
  setStyleProperty(name, value) {
    return (
      this
      .writeMove()
      .write(Instruction.SET_STYLE_PROPERTY)
      .write(name)
      .write(value)
    )
  }
  unsetStyleProperty(name) {
    return (
      this
      .writeMove()
      .write(Instruction.UNSET_STYLE_PROPERTY)
      .write(name)
    )
  }
  addEvent(name, value) {
    return (
      this
      .writeMove()
      .write(Instruction.ADD_EVENT_LISTENER)
      .write(name)
      .write(value)
    )
  }
  removeEvent(name) {
    return (
      this
      .writeMove()
      .write(Instruction.REMOVE_EVENT_LISTENER)
      .write(name)
    )
  }
  replaceEvent(name, value) {
    return (
      this
      .writeMove()
      .write(Instruction.REPLACE_EVENT_LISTENER)
      .write(name)
      .write(value)
    )
  }
  setTag(tag) {
    return (
      this
      .writeMove()
      .write(Instruction.SET_TAG)
      .write(tag)
    )
  }
}

const diff = /*::<message>*/
  ( left/*:Node<message>*/
  , right/*:Node<message>*/
  )/*:Delta*/ =>
  diffNodes(left, right, new Delta())

const diffNodes = /*::<message>*/
  ( left/*:Node<message>*/
  , right/*:Node<message>*/
  , delta/*:Delta*/
  )/*:Delta*/ => {
    if (left === right) {
      return delta
    }
    else if (left instanceof Thunk && right instanceof Thunk) {
      let isEqual =
        left.view === right.view &&
        left.a === right.a &&
        left.b === right.b &&
        left.c === right.c &&
        left.d === right.d &&
        left.e === right.e &&
        left.f === right.f &&
        left.g === right.g &&
        left.h === right.h

      const node = left.node
      if (node == null) {
        throw Error('Existing thunk expected to have a node during diffing, please report a bug.')
      }
      else {
        if (isEqual) {
          right.node = node
          return delta
        }
        else {
          right.node = right.view(right.a, right.b, right.c, right.d, right.e, right.f, right.g, right.h)
          return diffNodes(node, right.node, delta)
        }
      }

    }
    else if (left instanceof Tagger && right instanceof Tagger) {
      delta = diffNodes(left.node, right.node, delta)
      return delta.setTag(delta)
    }
    else if (left instanceof Text && right instanceof Text) {
      if (left.textContent != right.textContent) {
        return delta.replaceTextContent(right.textContent)
      }
      else {
        return delta
      }
    }
    else if (left instanceof Element && right instanceof Element) {
      if (left.nodeName !== right.nodeName || left.namespaceURI !== right.namespaceURI) {
        return delta.replaceNode(right)
      }
      else {
        delta = diffAttributes(left.attributes, right.attributes, delta);
        delta = diffProperties(left.properties, right.properties, delta);
        delta = diffEvents(left.events, right.events, delta);
        delta = diffStyle(left.style, right.style, delta);
        delta = diffDatasets(left.dataset, right.dataset, delta);
        return diffChildNodes(left.childNodes, right.childNodes, delta);
      }
    }
    // else if (left instanceof Widget && right instanceof Widget) {
    //
    // }
    else {
      return delta.replaceNode(right)
    }
  }

const diffAttributes =
  (left, right, delta) => {
    for (let name in right) {
      if (!(name in left)) {
        delta.setAttribute(name, right[name])
      }
    }

    for (let name in left) {
      if (!(name in right)) {
        delta.removeAttribute(name)
      }
      else {
        const leftValue = left[name]
        const rightValue = right[name]
        if (leftValue != rightValue) {
          delta.setAttribute(name, rightValue)
        }
      }
    }

    return delta
  }

const diffProperties =
  (left, right, delta) => {
    for (let name in right) {
      if (!(name in left)) {
        delta.assignProperty(name, right[name])
      }
    }

    for (let name in left) {
      if (!(name in right)) {
        delta.deleteProperty(name)
      }
      else {
        const leftValue = left[name]
        const rightValue = right[name]
        if (leftValue != rightValue) {
          delta.assignProperty(name, rightValue)
        }
      }
    }

    return delta
  }

const diffDatasets =
  (left, right, delta) => {
    for (let name in right) {
      if (!(name in left)) {
        delta.setDataAttribute(name, right[name])
      }
    }

    for (let name in left) {
      if (!(name in right)) {
        delta.removeDataAttribute(name)
      }
      else {
        const leftValue = left[name]
        const rightValue = right[name]
        if (leftValue != rightValue) {
          delta.setDataAttribute(name, rightValue)
        }
      }
    }

    return delta
  }

const diffStyle =
  (left, right, delta) => {
    for (let name in right) {
      if (!(name in left)) {
        delta.setStyleProperty(name, right[name])
      }
    }

    for (let name in left) {
      if (!(name in right)) {
        delta.unsetStyleProperty(name)
      }
      else {
        const leftValue = left[name]
        const rightValue = right[name]
        if (leftValue != rightValue) {
          delta.setStyleProperty(name, rightValue)
        }
      }
    }

    return delta
  }

const diffEvents =
  (left, right, delta) => {
    for (let name in right) {
      if (!(name in left)) {
        delta.addEvent(name, right[name])
      }
    }

    for (let name in left) {
      if (!(name in right)) {
        delta.removeEvent(name)
      }
      else {
        const leftValue = left[name]
        const rightValue = right[name]
        if (leftValue != rightValue) {
          delta.replaceEvent(name, rightValue)
        }
      }
    }

    return delta
  }

const diffChildNodes = /*::<message>*/
  ( left/*:ChildNodes<message>*/
  , right/*:ChildNodes<message>*/
  , delta/*:Delta*/
  )/*:Delta*/ => {
    const diff = right.length - left.length
    if (diff < 0) { // children removed
      let index = diff
      while (index < 0) {
        delta.removeChild(right.length - index)
        index = index + 1
      }
    }
    else if (diff < 0) { // children added
      let index = 0
      while (index < diff) {
        delta.appendChild(right[left.length + index])
        index = index + 1
      }
    }

    // children updated
    const length =
      ( left.length > right.length
      ? right.length
      : left.length
      )

      let index = 0
      while (index < length) {
        const leftNode = left[index]
        const rightNode = right[index]
        delta.selectChildNode(index)
        index ++
        diffNodes(leftNode, rightNode, delta)
        delta.selectParentNode()
      }
      return delta
    }
