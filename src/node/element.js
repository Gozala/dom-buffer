/* @flow */

import {intern$4} from "../util/intern"
import {pool} from "../util/pool"
import {blank} from "../util/constant"
import {Tagger} from "./tagger"
import {serializeNS} from "./namespace"
import {Attribute, Property, EventDecoder, StyleProperty} from "../setting"
import {unstyled} from "../setting/style"
import {serializeSettings} from "../setting"

/*::
import type {Node} from "../node"
import type {GUID} from "../util/guid"
import type {Settings, Attributes, Properties, DataSet, EventDecoders} from "../setting"
import type {Style} from "../setting/style"

export type ChildNodes <message> =
  Array<Node<message>>
*/

export const element = /*::<message>*/
  ( tagName/*:string*/
  , settings/*:Settings<message>*/
  , childNodes/*:ChildNodes<message>*/
  )/*:Element<message>*/ =>
  Element.create(tagName, null, settings, childNodes)

export const elementNS = /*::<message>*/
  ( tagName/*:string*/
  , namespaceURI/*:string*/
  , settings/*:Settings<message>*/
  , childNodes/*:ChildNodes<message>*/
  )/*:Element<message>*/ =>
  Element.create(tagName, namespaceURI, settings, childNodes)

export class Element <message> {
  /*::
  guid: GUID;
  nodeType: 3;
  nodeName: string;
  id: ?string;
  key: ?string;
  namespaceURI: ?string;
  childNodes: ChildNodes<message>;
  size: number;
  style: Style;
  attributes: Attributes;
  properties: Properties;
  dataset: DataSet;
  events: EventDecoders<message, *>;
  index: {[key:string]: number};
  unindexed: Array<number>;
  static create: (tagName:string, namespaceURI:?string, settings:Settings<message>, childNodes:ChildNodes<message>) => Element<message>;
  */
  constructor(
    guid/*:GUID*/
  , nodeName/*:string*/
  , namespaceURI/*:?string*/
  , settings/*:Settings<message>*/
  , childNodes/*:ChildNodes<message>*/
  ) {
    const count = childNodes.length
    let size = count
    let index  = 0
    while (index < count) {
      const node = childNodes[index]
      size += node.size
      index ++
    }


    this.guid = guid
    this.nodeType = 3
    this.nodeName = nodeName
    this.namespaceURI = namespaceURI
    this.childNodes = childNodes
    this.size = size
    this.key = null
    this.id = null
    this.style = unstyled
    this.events = blank
    this.dataset = blank
    this.properties = blank
    this.attributes = blank
    assignSettings(this, settings)
  }
  map /*::<tagged>*/ (tag/*:(input:message) => tagged*/)/*:Tagger<tagged, message>*/ {
    return Tagger.create(this, tag)
  }
}

const assignSettings = /*::<message>*/
  ( element/*:Element<message>*/
  , settings/*:Settings<message>*/
  ) => {
    let events = null
    let attributes = null
    let properties = null

    let index = 0
    const length = settings.length
    while (index < length) {
      let setting = settings[index++]
      if (setting instanceof Attribute) {
        const {name, value} = setting
        if (value != null) {
          if (attributes == null) {
            attributes = Object.create(null)
            element.attributes = attributes
          }
          attributes[name] = value
        }
      }
      else if (setting instanceof Property) {
        const {name, value} = setting
        if (value != null) {
          if (properties == null) {
            properties = Object.create(null)
            element.properties = properties
          }
          properties[name] = value

          if (name === "key") {
            element.key = `${value}`
          }
          else if (name === "id") {
            element.id = `${value}`
          }
        }
      }
      else if (setting instanceof EventDecoder) {
        if (events == null) {
          events = Object.create(null)
          element.events = events
        }

        const name =
          ( setting.capture
          ? `${setting.type}Capture`
          : setting.type
          )

        events[name] = setting
      }
      else if (setting instanceof StyleProperty) {
        element.style = setting.style
      }
    }
  }


Element.create = intern$4
( Element
, (tagName:string, ns:?string, settings, childNodes) =>
  `${tagName}${serializeNS(ns)}${serializeSettings(settings)}${serializeChildNodes(childNodes)}`
, pool()
)


export const serializeChildNodes = /*::<message>*/
  (nodes/*:ChildNodes<message>*/)/*:string*/ => {
    let key = ""
    const length = nodes.length
    let index = 0
    while (index < length) {
      key += `.${nodes[index].guid}`
      index ++
    }
    return key
  }
