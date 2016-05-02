/* @flow */

import {pool} from "../util/pool"
import {intern$4} from "../util/intern"
import {serializeBoolean} from "../util/serializer"
import {guidFor} from "../util/guid"

/*::
import type {GUID} from "../util/guid"

export type Decoder <data, message> =
  (input:data) => message

export type EventDecoders <message, event> =
  { [key:string]: EventDecoder<message, event>
  }
*/

export const on = /*::<message, event:Event>*/
  ( type/*:string*/
  , decoder/*:Decoder<event, message>*/
  , stopPropagation/*:boolean*/=false
  , preventDefault/*:boolean*/=false
  )/*:EventDecoder<message, event>*/ =>
  EventDecoder.create
  ( type
  , decoder
  , stopPropagation
  , preventDefault
  , false
  )

export const onCapture = /*::<message, event:Event>*/
  ( type/*:string*/
  , decoder/*:Decoder<event, message>*/
  , stopPropagation/*:boolean*/=false
  , preventDefault/*:boolean*/=false
  )/*:EventDecoder<message, event>*/ =>
  EventDecoder.create
  ( type
  , decoder
  , stopPropagation
  , preventDefault
  , true
  )

export class EventDecoder /*::<message, event:Event>*/ {
  /*::
  guid: GUID;
  type: string;
  decode: Decoder<event, message>;
  stopPropagation: boolean;
  preventDefault: boolean;
  capture: boolean;
  static create:
    ( type:string
    , decoder:Decoder<event, message>
    , capture:boolean
    , stopPropagation:boolean
    , preventDefault:boolean
    ) => EventDecoder<message, event>;
  */
  constructor(
    guid/*:GUID*/
  , type/*:string*/
  , decoder/*:Decoder<event, message>*/
  , stopPropagation/*:boolean*/
  , preventDefault/*:boolean*/
  , capture/*:boolean*/
  ) {
    this.guid = guid
    this.type = type
    this.decode = decoder
    this.stopPropagation = stopPropagation
    this.preventDefault = preventDefault
    this.capture = capture
  }
}
EventDecoder.create = intern$4
( EventDecoder
, (type, decoder, stopPropagation, preventDefault, capture) =>
  `${type}#${guidFor(decoder)}:${capture ? 1 : 0}${stopPropagation ? 1 : 0}${preventDefault ? 1 : 0}`
, pool()
)
