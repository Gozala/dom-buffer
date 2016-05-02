/* @flow */

import {pool} from "../util/pool"
import {intern$3} from "../util/intern"
import {serializeNS} from "../node/namespace"
/*::
import type {GUID} from "../util/guid"

export type Attributes =
  {[key:string]: string}
*/
export const attribute =
  ( name/*:string*/
  , value/*:?string*/
  )/*:?Attribute*/ =>
  ( value == null
  ? null
  : Attribute.create(null, name, value)
  )

export const attributeNS =
  ( namespaceURI/*:string*/
  , name/*:string*/
  , value/*:?string*/
  )/*:?Attribute*/ =>
  ( value == null
  ? null
  : Attribute.create(namespaceURI, name, value)
  )

export class Attribute {
  /*::
  guid: GUID;
  nodeType: 2;
  namespaceURI: ?string;
  name: string;
  value: string;
  static create: (ns:?string, name:string, value:string) => Attribute;
  */
  constructor(
    guid/*:GUID*/
  , namespaceURI/*:?string*/
  , name/*:string*/
  , value/*:string*/
  ) {
    this.guid = guid;
    this.nodeType = 2;
    this.namespaceURI = namespaceURI;
    this.name = name;
    this.value = value;
  }
}
Attribute.create = intern$3
( Attribute
, (name, ns, value) => `${name}:${serializeNS(ns)}="${value}"`
, pool()
)
