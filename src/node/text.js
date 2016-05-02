/* @flow */

import {pool} from "../util/pool"
import {intern$1} from "../util/intern"
import type {GUID} from "../util/guid"

export class Text {
  /*::
  guid: GUID;
  nodeType: 1;
  nodeName: "#text";
  size: number;
  textContent: string;
  static create: (textContent:string) => Text;
  */
  constructor(guid/*:GUID*/, textContent/*:string*/) {
    this.guid = guid
    this.nodeName = "#text"
    this.nodeType = 1
    this.size = 0
    this.textContent = textContent
  }
  map /*::<tagged>*/(tag/*:(input:*) => tagged*/)/*:Text*/ {
    return this
  }
}
Text.create = intern$1
( Text
, textContent => `${textContent}`
, pool()
)

export const text =
  (content/*:string*/)/*:Text*/ =>
  Text.create(content)
