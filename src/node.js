/* @flow */

import {Text, text} from "./node/text"
import {Element, element, elementNS} from "./node/element"
import {Thunk, thunk} from "./node/thunk"
import {Tagger} from "./node/tagger"

/*::
export type {ChildNodes} from "./node/element"

export type Node <message> =
  | Text
  | Element <message>
  | Thunk <message, *, *, *, *, *, *, *, *>
  | Tagger <message, *>
*/

export {Text, text, Element, element, elementNS, Thunk, thunk, Tagger}
