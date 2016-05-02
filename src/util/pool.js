/* @flow */

export class Pool /*::<key, value>*/ {
  /*::
  size: number;
  map: Map<key, value>;
  */
  constructor(size/*:number*/, map/*:Map<key, value>*/) {
    this.map = map
    this.size = size
  }
  get(key/*:key*/)/*:?value*/ {
    return this.map.get(key)
  }
  drop(n/*:number=1*/)/*:this*/ {
    for (let [key, _] of this.map) {
      if (--n >= 0) {
        this.map.delete(key)
      }
      else {
        break
      }
    }
    return this
  }
  set(key/*:key*/, value/*:value*/)/*:this*/ {
    if (this.map.size === this.size) {
      this.drop()
    }
    this.map.delete(key)
    this.map.set(key, value)
    return this
  }
}

export const pool = /*::<key, value>*/
  ( size/*:number*/=1000
  , map/*:Map<key, value>*/=new Map()
  )/*:Pool<key, value>*/ =>
  new Pool(size, map)
