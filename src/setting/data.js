/* @flow */

import {pool} from "../util/pool"
import {intern$2} from "../util/intern"
import {serialize} from "../util/serializer"
import {guidFor} from "../util/guid"

/*::
import type {GUID} from "../util/guid"

export type DataSet =
  { [key:string]: string
  }
*/

export const data =
  ( name/*:string*/
  , value/*:?string*/
  )/*:?Data*/ =>
  ( value == null
  ? null
  : Data.create(name, value)
  )

export class Data {
  /*::
  guid: GUID;
  name: string;
  value: string;
  static create: (name:string, value:string) => Data;
  */
  constructor(guid:GUID, name:string, value:string) {
    this.guid = guid;
    this.name = name;
    this.value = value;
  }
}
Data.create = intern$2
( Data
, (name, ns, value) => `${name}="${value}"`
, pool()
)
