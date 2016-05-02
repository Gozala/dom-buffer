/* @flow */

import {Instruction} from "./diff-buffer";
import * as DOM from  "./dom"

const OnEvent =
  (capture/*:boolean*/) =>
  /*::<event:Event>*/ (event/*:event*/) => {
    const {type, currentTarget} = event
    const target:Object = currentTarget
    const inbox = target.$VirtualDOMBuffer$inbox
    const events = target.$VirtualDOMBuffer$event$decoders
    const decoder =
      ( events == null
      ? null
      : ( capture
        ? events[`${type}Capture`]
        : events[type]
        )
      )

    if (decoder != null && inbox != null) {
      inbox.receive(decoder.decode(event))
    }
  }

export const onEvent = OnEvent(false)
export const onEventCapture = OnEvent(true)

class Inbox /*::<incoming, outgoing>*/ {
  /*::
  delegate: ?Inbox<outgoing, *>;
  tagger: DOM.Tagger<outgoing, incoming>;
  */
  constructor(
    delegate/*:?Inbox<outgoing, *>*/
  , tagger/*:DOM.Tagger<outgoing, incoming>*/
  ) {
    this.delegate = delegate
    this.tagger = tagger
  }
  receive(input/*:incoming*/) {
    const {delegate} = this
    if (delegate != null) {
      const output = this.tagger.tag(input)
      delegate.receive(output)
    }
  }
}

const patch = /*::<message>*/
  (root/*:HTMLElement*/
  , delta/*:Array<any>*/
  , eventTarget/*:EventTarget<message, void>*/
  ) => {

  }

const createNode = /*::<message>*/
  ( source/*:DOM.Node<message>*/
  , inbox/*:Inbox<message, *>*/
  )/*:Node*/ => {
    while (source != null) {
      if (source instanceof DOM.Thunk) {
        while (source instanceof DOM.Thunk) {
          source =
            ( source.node == null
            ? ( source.node = source.view
                ( source.a
                , source.b
                , source.c
                , source.d
                , source.e
                , source.f
                , source.g
                , source.h
                )
              )
            : source.node
            )
        }
      }
      else if (source instanceof DOM.Tagger) {
        inbox = new Inbox(inbox, source)
        source = source.node
      }
      else if (source instanceof DOM.Text) {
        return document.createTextNode(source.textContent);
      }
      else if (source instanceof DOM.Element) {
        const
          { guid
          , nodeName
          , namespaceURI
          , attributes
          , properties
          , style
          , events
          , childNodes
          } = source

        const node =
          ( namespaceURI == null
          ? document.createElement(nodeName)
          : document.createElementNS(namespaceURI, nodeName)
          )

        for (let name in attributes) {
          node.setAttribute(name, attributes[name])
        }

        // Note: We cast `node` to `Object` so that flow will treat it as
        // such & allow arbitrary modifications to it.
        // For more details (See: https://github.com/facebook/flow/issues/1730)
        const expando:Object = node
        for (let name in properties) {
          expando[name] = properties[name]
        }
        expando.$VirtualDOMBuffer$guid = guid
        expando.$VirtualDOMBuffer$inbox = inbox
        expando.$VirtualDOMBuffer$event$decoders = events


        if (node.style == null) {
          console.error(`Can not apply styles on <${node.nodeName} xmlns="${node.namespaceURI}"> node as it has no .style property. If this seems wrong please report an issue.`)
        }
        else {
          const nodeStyle:Object = node.style
          for (let name in style) {
            if (name in style) {
              nodeStyle[name] = style[name]
            }
          }
        }

        for (let name in events) {
          const {type, capture} = events[name]

          node.addEventListener
          ( type
          , ( capture
            ? onEventCapture
            : onEvent
            )
          , capture
          )
        }


        const count = childNodes.length
        let index = 0
        while (index < count) {
          const child = childNodes[index]
          node.appendChild(createNode(child, inbox))
        }

        return node
      }
    }
    throw Error('Unexpected node instance was passed. createNode experts it to be one of the following: Text, Element, Tagger, Thunk.')
  }
