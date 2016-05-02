/* @flow */

import {intern$2} from "../util/intern"
import {guidFor} from "../util/guid"
import {pool} from "../util/pool"

import type {GUID} from "../util/guid"
import type {Node} from "../node"

export class Tagger /*::<outgoing, incoming>*/ {
  /*::
  nodeType: 18;
  nodeName: "#tagger";
  node: Node<incoming>;
  tag:(input:incoming) => outgoing;
  size: number;
  guid: GUID;
  static create: (node:Node<incoming>, tag:(input:incoming) => outgoing) => Tagger<outgoing, incoming>;
  */
  constructor(
    guid/*:GUID*/
  , node/*:Node<incoming>*/
  , tag/*:(input:incoming) => outgoing*/
  ) {
    this.guid = guid
    this.nodeType = 18
    this.nodeName = "#tagger"
    this.node = node
    this.tag = tag
    this.size = this.node.size + 1
  }
  map /*::<tagged>*/ (tag/*:(input:outgoing) => tagged*/)/*:Tagger<tagged, outgoing>*/ {
    return Tagger.create(this, tag)
  }
}
Tagger.create = intern$2
( Tagger
, (node, tag) => `${node.guid}#${guidFor(tag)}`
, pool()
)
