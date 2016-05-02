/* @flow */

import {pool} from "./pool"
import {serializer} from "./serializer"
import {guid} from "./guid"

/*::
import type {GUID} from "./guid"
import type {Pool} from "./pool"

interface Instance$1 <a> {
  constructor(guid:GUID, a:a):void
}

interface Instance$2 <a, b> {
  constructor(guid:GUID, a:a, b:b):void
}

interface Instance$3 <a, b, c> {
  constructor(guid:GUID, a:a, b:b, c:c):void
}

interface Instance$4 <a, b, c, d> {
  constructor(guid:GUID, a:a, b:b, c:c, d:d):void
}

interface Instance$5 <a, b, c, d, e> {
  constructor(guid:GUID, a:a, b:b, c:c, d:d, e:e):void
}

interface Instance$9 <a, b, c, d, e, f, g, h, l> {
  constructor(guid:GUID, a:a, b:b, c:c, d:d, e:e, f:f, g:g, h:h, l:l):void
}

type Intern$1 <a, type> =
  (arg1:a) =>
  type

type Intern$2 <a, b, type> =
  (arg1:a, arg2:b) =>
  type

type Intern$3 <a, b, c, type> =
  (arg1:a, arg2:b, arg3:c) =>
  type

type Intern$4 <a, b, c, d, type> =
  (arg1:a, arg2:b, arg3:c, arg4:d) =>
  type

type Intern$5 <a, b, c, d, e, type> =
  (arg1:a, arg2:b, arg3:c, arg4:d, arg5:e) =>
  type

type Intern$9 <a, b, c, d, e, f, g, h, l, type> =
  (arg1:a, arg2:b, arg3:c, arg4:d, arg5:e, arg6:f, arg7:g, arg8:h, arg9:l) =>
  type
*/

export const intern$1 = /*::<a, type:Instance$1<a>>*/
  ( constructor/*:Class<type>*/
  , serialize/*:(input:a) => string*/
  , cache/*:Pool<string, type>*/=pool()
  )/*:Intern$1<a, type>*/ =>
  (arg1) => {
    const key = serialize(arg1)
    const instance:type =
      cache.get(key) || new constructor(guid(), arg1)

    cache.set(key, instance)
    return instance
  }

export const intern$2 = /*::<a, b, type:Instance$2<a, b>>*/
  ( constructor/*:Class<type>*/
  , serialize/*:(a:a, b:b) => string*/
  , cache/*:Pool<string, type>*/=pool()
  )/*:Intern$2<a, b, type>*/ =>
  (arg1, arg2) => {
    const key = serialize(arg1, arg2)
    const instance = cache.get(key) || new constructor(guid(), arg1, arg2)
    cache.set(key, instance)
    return instance
  }

export const intern$3 = /*::<a, b, c, type:Instance$3<a, b, c>>*/
  ( constructor/*:Class<type>*/
  , serialize/*:(a:a, b:b, c:c) => string*/
  , cache/*:Pool<string, type>*/=pool()
  )/*:Intern$3<a, b, c, type>*/ =>
  (arg1, arg2, arg3) => {
    const key = serialize(arg1, arg2, arg3)
    const instance = cache.get(key) || new constructor(guid(), arg1, arg2, arg3)
    cache.set(key, instance)
    return instance
  }

export const intern$4 = /*::<a, b, c, d, type:Instance$4<a, b, c, d>>*/
  ( constructor/*:Class<type>*/
  , serialize/*:(a:a, b:b, c:c, d:d) => string*/
  , cache/*:Pool<string, type>*/=pool()
  )/*:Intern$4<a, b, c, d, type>*/ =>
  (arg1, arg2, arg3, arg4) => {
    const key = serialize(arg1, arg2, arg3, arg4)
    const instance = cache.get(key) || new constructor(guid(), arg1, arg2, arg3, arg4)
    cache.set(key, instance)
    return instance
  }

export const intern$5 = /*::<a, b, c, d, e, type:Instance$5<a, b, c, d, e>>*/
  ( constructor/*:Class<type>*/
  , serialize/*:(a:a, b:b, c:c, d:d, e:e) => string*/
  , cache/*:Pool<string, type>*/=pool()
  )/*:Intern$5<a, b, c, d, e, type>*/ =>
  (arg1, arg2, arg3, arg4, arg5) => {
    const key = serialize(arg1, arg2, arg3, arg4, arg5)
    const instance = cache.get(key) || new constructor(guid(), arg1, arg2, arg3, arg4, arg5)
    cache.set(key, instance)
    return instance
  }

export const intern$9 = /*::<a, b, c, d, e, f, g, h, l, type:Instance$9<a, b, c, d, e, f, g, h, l>>*/
  ( constructor/*:Class<type>*/
  , serialize/*:(a:a, b:b, c:c, d:d, e:e, f:f, g:g, h:h, l:l) => string*/
  , cache/*:Pool<string, type>*/=pool()
  )/*:Intern$9<a, b, c, d, e, f, g, h, l, type>*/ =>
  (arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) => {
    const key = serialize(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9)
    const instance = cache.get(key) || new constructor(guid(), arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9)
    cache.set(key, instance)
    return instance
  }
