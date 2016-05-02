/* @flow */

import {pool} from "../util/pool"
import {guidFor} from "../util/guid"
import {serialize} from "../util/serializer"
import {intern$9} from "../util/intern"
import {Tagger} from "./tagger"

/*::
import type {GUID} from "../util/guid"
import type {Node} from "../node"

export type View <message, a, b, c, d, e, f, g, h> =
  (a:a, b:b, c:c, d:d, e:e, f:f, g:g, h:h) =>
  Node<message>
*/

export const thunk = /*::<message, a, b, c, d, e, f, g, h>*/
  ( view/*:View<message, a, b, c, d, e, f, g, h>*/
  , a/*:a*/
  , b/*:b*/
  , c/*:c*/
  , d/*:d*/
  , e/*:e*/
  , f/*:f*/
  , g/*:g*/
  , h/*:h*/
  )/*:Thunk<message, a, b, c, d, e, f, g, h>*/ =>
  Thunk.create(view, a, b, c, d, e, f, g, h)

export class Thunk /*::<message, a, b, c, d, e, f, g, h>*/ {
  /*::
  guid: GUID;
  nodeType: 17;
  nodeName: "#thunk";
  node: ?Node<message>;
  size: number;
  a: a;
  b: b;
  c: c;
  d: d;
  e: e;
  f: f;
  g: g;
  h: h;
  view: View<message, a, b, c, d, e, f, g, h>;
  static create:
    ( view:View<message, a, b, c, d, e, f, g, h>
    , a:a
    , b:b
    , c:c
    , d:d
    , e:e
    , f:f
    , g:g
    , h:h
  ) => Thunk<message, a, b, c, d, e, f, g, h>;
  */
  constructor(
    guid/*:GUID*/
  , view/*:View<message, a, b, c, d, e, f, g, h>*/
  , a/*:a*/
  , b/*:b*/
  , c/*:c*/
  , d/*:d*/
  , e/*:e*/
  , f/*:f*/
  , g/*:g*/
  , h/*:h*/
  ) {
    this.guid = guid
    this.nodeType = 17
    this.nodeName = "#thunk"
    this.size = 0
    this.node = null

    this.view = view
    this.a = a
    this.b = b
    this.c = c
    this.d = d
    this.e = e
    this.f = f
    this.g = g
    this.h = h
  }
  map /*::<tagged>*/(tag/*:(input:message) => tagged*/)/*:Tagger<tagged, message>*/ {
    return Tagger.create(this, tag)
  }
}
Thunk.create = intern$9
( Thunk
, (view, a, b, c, d, e, f, g, h) =>
  `${guidFor(view)} ${serialize(a)} ${serialize(b)} ${serialize(c)} ${serialize(d)} ${serialize(e)} ${serialize(f)} ${serialize(g)} ${serialize(h)}`
, pool()
)
