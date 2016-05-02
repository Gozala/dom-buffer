/* @flow */

export const serializeNS =
  (namespaceURI/*:?string*/)/*:string*/ =>
  ( namespaceURI == null
  ? ''
  : `:${namespaceURI}`
  )
