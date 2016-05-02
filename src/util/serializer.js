/* @flow */

import {Pool, pool} from "./pool"

export const serializer = /*::<value>*/
  ( tag/*:string*/
  , cache/*:Pool<value, string>*/=pool()
  , nextID/*:number*/=0
  ) =>
  (value/*:value*/)/*:string*/ => {
    const key = cache.get(value) || `${tag}${++nextID}`
    cache.set(value, key)
    return key
  }

export const serializeSymbol = serializer
  ( "`"
  , pool()
  , 0
  )

export const serializeSymbolFor =
  (symbol/*:Symbol*/) =>
  `'${Symbol.keyFor(symbol)}'`


const Object$prototype$toString = ({}).toString
const isArray = Array.isArray

export const serializeObject/*:(input:any) => string*/ = serializer
  ( "@"
  , pool()
  , 0
  )

export const serializeTag1 = /*::<a>*/
  (tag/*:string*/, a/*:a*/)/*:string*/ =>
  `${tag}(${serialize(a)})`

export const serializeTag2 = /*::<a, b>*/
  (tag/*:string*/, a/*:a*/, b/*:b*/)/*:string*/ =>
  `${tag}(${serialize(a)},${serialize(b)})`

export const serializeTag3 = /*::<a, b, c>*/
  (tag/*:string*/, a/*:a*/, b/*:b*/, c/*:c*/)/*:string*/ =>
  `${tag}(${serialize(a)},${serialize(b)},${serialize(c)})`

export const serializeField = /*::<value>*/
  (name/*:string*/, value/*:value*/)/*:string*/ =>
  `${name}:${serialize(value)}`


export const serializeArray = /*::<a>*/
  (array/*:Array<a>*/)/*:string*/ => {
    let key = "["
    const count = array.length
    let index = 0
    while (index < count) {
      key += `${index > 0 ? ",": ""}${serialize(array[index])} `
      index ++
    }
    key += "]"
    return key
}

export const serializeString =
  (string/*:string*/)/*:string*/ =>
  `"${string}"`

export const serializeNumber =
  (number/*:number*/)/*:string*/ =>
  `${number}`

export const serializeBoolean =
  (value/*:boolean*/)/*:string*/ =>
  ( value === true
  ? "I"
  : "O"
  );

export const serialize = /*::<a>*/
  (value/*:a*/)/*:string*/ => {
    if (value === void(0)) {
      return "＿"
    }
    else if (value === null) {
      return "_"
    }
    else if (value === true) {
      return "I"
    }
    else if (value === false) {
      return "O"
    }

    const type = typeof(value)
    if (type === "string") {
      return `"${value}"`
    }
    else if (type === "number") {
      return `${value}`
    }
    else if (type === "symbol" /*:: && value instanceof Symbol*/) {
      const key = Symbol.keyFor(value)
      if (key != null) {
        return `'${key}`
      }
      else {
        return serializeSymbol(value)
      }
    }

    if (isArray(value) /*:: && value instanceof Array*/) {
      return serializeArray(value)
    }

    const tag = Object$prototype$toString.call(value)
    if (tag === "[object RegExp]" /*:: && value instanceof RegExp*/) {
      return `/${value.source}/`
    }
    else if (tag === "[object Date]") {
      return `:{value.valueOf()}`
    }
    else if (tag === "[object Number]") {
      return `${value}`
    }
    else if (tag === "[object String]") {
      return `"{value}"`
    }

    return serializeObject(value)
  }
