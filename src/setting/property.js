/* @flow */

import {pool} from "../util/pool"
import {intern$2} from "../util/intern"
import {serialize} from "../util/serializer"

/*::
import type {GUID} from "../util/guid"


export type Properties =
  { [key:string]: JSON
  }
*/

export const property =
  ( name/*:string*/
  , value/*:JSON*/
  )/*:?Property*/ =>
  ( value == null
  ? null
  : Property.create(name, value)
  )

export class Property {
  /*::
  guid: GUID;
  name: string;
  value: JSON;
  static create: (name:string, value:JSON) => Property;
  */
  constructor(
    guid/*:GUID*/
  , name/*:string*/
  , value/*:JSON*/
  ) {
    this.guid = guid
    this.name = name
    this.value = value
  }
}
Property.create = intern$2
( Property
, (name, value) => `=${name}${serialize(value)}`
, pool()
)
