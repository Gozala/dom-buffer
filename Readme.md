# DOM Buffer

Experimental (not yet working) take on Virtual DOM abstraction.

## Motivation

Existing Virtual DOM libraries either tent to put a lot of pressure on GC on tight update loops like lengthy animations, that is because amount of objects instantiated to represent Virtual DOM tree is somewhat proportional to the application size. For example single style property change in one Virtual DOM element requires creating Virtual DOM elements for all the ancestors leading to it on every animation frame.

To overcome this issue user has two choices:

1. Give up on predictable state a.k.a mutable local state. Which is alright to some degree but works poorly if your animation drives multiple components in different parts of the UI.

2. Give up on idea of presenting view as Virtual DOM tree data structure and something along the lines of [Incremental-DOM][].

3. Add a query language a la [Om.next][] / [GraphQL][] to be able to predict what views need to get re-rendered on which state changes.

Non of the above options seemed ideal as they introduces certain dependencies that is far beyond simple idea of Virtual DOM.

## Goals

1. Substantially reduce GC overhead.
2. Allow off main thread execution model.
3. Do not force mutable local state on users.

## Approach

In order to reduce GC overhead we employ object pooling, API for creating Virtual DOM nodes has also being intentionally redesigned to allow more aggressive pooling. Pools will produce helpful warnings to let authors know when they are reaching limits so that application authors could tune them to their application needs. General idea is that construction of equal Virtual DOM nodes will produce referentially equal values (at the cost of constant time overhead) there for avoid pressure on GC & increase Virtual DOM diff-ing process as well. What's interesting is the same technique will be used for node properties and attributes to minimize number of objects allocated even for nodes that do changes due to state change.

Execution off main thread will come with certain limitations. Application code will have no access to an actual DOM, which also means event handlers won't be able access [DOM Event][] objects or act in the same tick. Our theory is it's not actually a bad thing. We draw our inspiration from [Elm][] [Json.Decode][] library and some prior done in [Mozilla Addon-SDK][] to extract data on the main thread and pass it over to the event handler on other to handle it. We believe this approach will cover large enough surface of the web-platform to allow building non-trivial applications all of main thread. We believe we'll be able to tailor specific solutions to parts of the web platform where this is not enough.

In order to make minimize off main thread execution overhead Virtual DOM diffs will be represented in form of `ArrayBuffer` so that can be transferred and applied on the DOM on main thread without copying.


[Incremental-DOM]:http://google.github.io/incremental-dom/#about
[Om.next]:https://github.com/omcljs/om/wiki/Quick-Start-(om.next)
[GraphQL]:http://graphql.org
[DOM Event]:https://developer.mozilla.org/en-US/docs/Web/Events
[Elm]:http://elm-lang.org
[Json.Decode]:http://package.elm-lang.org/packages/elm-lang/core/3.0.0/Json-Decode
[Mozilla Addon-SDK]:https://github.com/mozilla/addon-sdk/blob/master/lib/sdk/context-menu/readers.js
