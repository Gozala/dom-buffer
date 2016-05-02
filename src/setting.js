/* @flow */

import {Attribute, attribute, attributeNS} from "./setting/attribute"
import {Property, property} from "./setting/property"
import {style, StyleProperty} from "./setting/style"
import {EventDecoder, on, onCapture} from "./setting/event"
import {Data, data} from "./setting/data"

/*::
export type {DataSet} from "./setting/data"
export type {Attributes} from "./setting/attribute"
export type {Properties} from "./setting/property"
export type {EventDecoders} from "./setting/event"
export type {Style} from "./setting/style"

export type Setting <message> =
  | Attribute
  | Property
  | StyleProperty
  | Data
  | EventDecoder<message, *>

export type Settings <message> =
  Array<?Setting<message>>
*/

export
  { Attribute, attribute, attributeNS
  , Data, data
  , Property, property
  , EventDecoder, on, onCapture
  , StyleProperty, style
  }

export const serializeSetting = /*::<message>*/
  (setting/*:?Setting<message>*/)/*:string*/ =>
  ( setting == null
  ? ""
  : `@${setting.guid}`
  )

export const serializeSettings = /*::<message>*/
  (settings/*:Settings<message>*/)/*:string*/ =>
  settings.map(serializeSetting).sort().join("")
