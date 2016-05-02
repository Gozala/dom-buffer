/* @flow */

export type Integer = number
export type GUID = Integer

let nextGUID = 0

export const guidFor =
  (subject/*:Object|Function*/)/*:Integer*/ =>
  ( 'guid' in subject
  ? subject.guid
  : ( subject.guid = ++nextGUID )
  )

export const guid =
  ()/*:Integer*/ =>
  ++nextGUID
