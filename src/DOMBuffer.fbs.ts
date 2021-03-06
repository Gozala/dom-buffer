// automatically generated by the FlatBuffers compiler, do not modify

/**
 * @enum
 */
export namespace DOMBuffer{
export enum ChangeNode{
  NONE= 0,
  ChangeText= 1,
  ChangeComment= 2,
  ChangeElement= 3
}};

/**
 * @enum
 */
export namespace DOMBuffer{
export enum ChangeType{
  Remove= 0,
  Insert= 1,
  Edit= 2,
  Replace= 3
}};

/**
 * @enum
 */
export namespace DOMBuffer{
export enum PropertyType{
  Undefined= 0,
  Null= 1,
  Boolean= 2,
  Number= 3,
  String= 4,
  JSON= 5
}};

/**
 * @constructor
 */
export namespace DOMBuffer{
export class Change {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  bb: flatbuffers.ByteBuffer;

  /**
   * @type {number}
   */
  bb_pos:number = 0;
/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {Change}
 */
__init(i:number, bb:flatbuffers.ByteBuffer):Change {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {Change=} obj
 * @returns {Change}
 */
static getRootAsChange(bb:flatbuffers.ByteBuffer, obj?:Change):Change {
  return (obj || new Change).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {DOMBuffer.ChangeType}
 */
type():DOMBuffer.ChangeType {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? /** @type {DOMBuffer.ChangeType} */ (this.bb.readInt8(this.bb_pos + offset)) : DOMBuffer.ChangeType.Remove;
};

/**
 * @returns {DOMBuffer.ChangeNode}
 */
changeType():DOMBuffer.ChangeNode {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? /** @type {DOMBuffer.ChangeNode} */ (this.bb.readUint8(this.bb_pos + offset)) : DOMBuffer.ChangeNode.NONE;
};

/**
 * @param {flatbuffers.Table} obj
 * @returns {?flatbuffers.Table}
 */
change<T extends flatbuffers.Table>(obj:T):T|null {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
};

/**
 * @param {flatbuffers.Builder} builder
 */
static startChange(builder:flatbuffers.Builder) {
  builder.startObject(3);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {DOMBuffer.ChangeType} type
 */
static addType(builder:flatbuffers.Builder, type:DOMBuffer.ChangeType) {
  builder.addFieldInt8(0, type, DOMBuffer.ChangeType.Remove);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {DOMBuffer.ChangeNode} changeType
 */
static addChangeType(builder:flatbuffers.Builder, changeType:DOMBuffer.ChangeNode) {
  builder.addFieldInt8(1, changeType, DOMBuffer.ChangeNode.NONE);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} changeOffset
 */
static addChange(builder:flatbuffers.Builder, changeOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, changeOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
static endChange(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  return offset;
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} offset
 */
static finishChangeBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset);
};

}
}
/**
 * @constructor
 */
export namespace DOMBuffer{
export class ChangeChild {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  bb: flatbuffers.ByteBuffer;

  /**
   * @type {number}
   */
  bb_pos:number = 0;
/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {ChangeChild}
 */
__init(i:number, bb:flatbuffers.ByteBuffer):ChangeChild {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {ChangeChild=} obj
 * @returns {ChangeChild}
 */
static getRootAsChangeChild(bb:flatbuffers.ByteBuffer, obj?:ChangeChild):ChangeChild {
  return (obj || new ChangeChild).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {number}
 */
index():number {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
};

/**
 * @param {DOMBuffer.Change=} obj
 * @returns {DOMBuffer.Change|null}
 */
change(obj?:DOMBuffer.Change):DOMBuffer.Change|null {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? (obj || new DOMBuffer.Change).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
};

/**
 * @param {flatbuffers.Builder} builder
 */
static startChangeChild(builder:flatbuffers.Builder) {
  builder.startObject(2);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} index
 */
static addIndex(builder:flatbuffers.Builder, index:number) {
  builder.addFieldInt16(0, index, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} changeOffset
 */
static addChange(builder:flatbuffers.Builder, changeOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, changeOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
static endChangeChild(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  return offset;
};

}
}
/**
 * @constructor
 */
export namespace DOMBuffer{
export class ChangeProperty {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  bb: flatbuffers.ByteBuffer;

  /**
   * @type {number}
   */
  bb_pos:number = 0;
/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {ChangeProperty}
 */
__init(i:number, bb:flatbuffers.ByteBuffer):ChangeProperty {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {ChangeProperty=} obj
 * @returns {ChangeProperty}
 */
static getRootAsChangeProperty(bb:flatbuffers.ByteBuffer, obj?:ChangeProperty):ChangeProperty {
  return (obj || new ChangeProperty).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {DOMBuffer.PropertyType}
 */
type():DOMBuffer.PropertyType {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? /** @type {DOMBuffer.PropertyType} */ (this.bb.readInt8(this.bb_pos + offset)) : DOMBuffer.PropertyType.Undefined;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
name():string|null
name(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
name(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
value():string|null
value(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
value(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Builder} builder
 */
static startChangeProperty(builder:flatbuffers.Builder) {
  builder.startObject(3);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {DOMBuffer.PropertyType} type
 */
static addType(builder:flatbuffers.Builder, type:DOMBuffer.PropertyType) {
  builder.addFieldInt8(0, type, DOMBuffer.PropertyType.Undefined);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} nameOffset
 */
static addName(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, nameOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} valueOffset
 */
static addValue(builder:flatbuffers.Builder, valueOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, valueOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
static endChangeProperty(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  return offset;
};

}
}
/**
 * @constructor
 */
export namespace DOMBuffer{
export class ChangeAttribute {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  bb: flatbuffers.ByteBuffer;

  /**
   * @type {number}
   */
  bb_pos:number = 0;
/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {ChangeAttribute}
 */
__init(i:number, bb:flatbuffers.ByteBuffer):ChangeAttribute {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {ChangeAttribute=} obj
 * @returns {ChangeAttribute}
 */
static getRootAsChangeAttribute(bb:flatbuffers.ByteBuffer, obj?:ChangeAttribute):ChangeAttribute {
  return (obj || new ChangeAttribute).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
name():string|null
name(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
name(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
namespaceURI():string|null
namespaceURI(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
namespaceURI(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
value():string|null
value(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
value(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Builder} builder
 */
static startChangeAttribute(builder:flatbuffers.Builder) {
  builder.startObject(3);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} nameOffset
 */
static addName(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, nameOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} namespaceURIOffset
 */
static addNamespaceURI(builder:flatbuffers.Builder, namespaceURIOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, namespaceURIOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} valueOffset
 */
static addValue(builder:flatbuffers.Builder, valueOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, valueOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
static endChangeAttribute(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  return offset;
};

}
}
/**
 * @constructor
 */
export namespace DOMBuffer{
export class ChangeStyle {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  bb: flatbuffers.ByteBuffer;

  /**
   * @type {number}
   */
  bb_pos:number = 0;
/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {ChangeStyle}
 */
__init(i:number, bb:flatbuffers.ByteBuffer):ChangeStyle {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {ChangeStyle=} obj
 * @returns {ChangeStyle}
 */
static getRootAsChangeStyle(bb:flatbuffers.ByteBuffer, obj?:ChangeStyle):ChangeStyle {
  return (obj || new ChangeStyle).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
name():string|null
name(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
name(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
value():string|null
value(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
value(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Builder} builder
 */
static startChangeStyle(builder:flatbuffers.Builder) {
  builder.startObject(2);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} nameOffset
 */
static addName(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, nameOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} valueOffset
 */
static addValue(builder:flatbuffers.Builder, valueOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, valueOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
static endChangeStyle(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  return offset;
};

}
}
/**
 * @constructor
 */
export namespace DOMBuffer{
export class ChangeText {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  bb: flatbuffers.ByteBuffer;

  /**
   * @type {number}
   */
  bb_pos:number = 0;
/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {ChangeText}
 */
__init(i:number, bb:flatbuffers.ByteBuffer):ChangeText {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {ChangeText=} obj
 * @returns {ChangeText}
 */
static getRootAsChangeText(bb:flatbuffers.ByteBuffer, obj?:ChangeText):ChangeText {
  return (obj || new ChangeText).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
text():string|null
text(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
text(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Builder} builder
 */
static startChangeText(builder:flatbuffers.Builder) {
  builder.startObject(1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} textOffset
 */
static addText(builder:flatbuffers.Builder, textOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, textOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
static endChangeText(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  return offset;
};

}
}
/**
 * @constructor
 */
export namespace DOMBuffer{
export class ChangeComment {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  bb: flatbuffers.ByteBuffer;

  /**
   * @type {number}
   */
  bb_pos:number = 0;
/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {ChangeComment}
 */
__init(i:number, bb:flatbuffers.ByteBuffer):ChangeComment {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {ChangeComment=} obj
 * @returns {ChangeComment}
 */
static getRootAsChangeComment(bb:flatbuffers.ByteBuffer, obj?:ChangeComment):ChangeComment {
  return (obj || new ChangeComment).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
text():string|null
text(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
text(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Builder} builder
 */
static startChangeComment(builder:flatbuffers.Builder) {
  builder.startObject(1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} textOffset
 */
static addText(builder:flatbuffers.Builder, textOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, textOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
static endChangeComment(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  return offset;
};

}
}
/**
 * @constructor
 */
export namespace DOMBuffer{
export class ChangeElement {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  bb: flatbuffers.ByteBuffer;

  /**
   * @type {number}
   */
  bb_pos:number = 0;
/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {ChangeElement}
 */
__init(i:number, bb:flatbuffers.ByteBuffer):ChangeElement {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {ChangeElement=} obj
 * @returns {ChangeElement}
 */
static getRootAsChangeElement(bb:flatbuffers.ByteBuffer, obj?:ChangeElement):ChangeElement {
  return (obj || new ChangeElement).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
namespaceURI():string|null
namespaceURI(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
namespaceURI(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
localName():string|null
localName(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
localName(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {number} index
 * @param {DOMBuffer.ChangeProperty=} obj
 * @returns {DOMBuffer.ChangeProperty}
 */
propreties(index: number, obj?:DOMBuffer.ChangeProperty):DOMBuffer.ChangeProperty|null {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? (obj || new DOMBuffer.ChangeProperty).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
};

/**
 * @returns {number}
 */
propretiesLength():number {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @param {DOMBuffer.ChangeAttribute=} obj
 * @returns {DOMBuffer.ChangeAttribute}
 */
attributes(index: number, obj?:DOMBuffer.ChangeAttribute):DOMBuffer.ChangeAttribute|null {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? (obj || new DOMBuffer.ChangeAttribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
};

/**
 * @returns {number}
 */
attributesLength():number {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @param {DOMBuffer.ChangeStyle=} obj
 * @returns {DOMBuffer.ChangeStyle}
 */
style(index: number, obj?:DOMBuffer.ChangeStyle):DOMBuffer.ChangeStyle|null {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? (obj || new DOMBuffer.ChangeStyle).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
};

/**
 * @returns {number}
 */
styleLength():number {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {number} index
 * @param {DOMBuffer.ChangeChild=} obj
 * @returns {DOMBuffer.ChangeChild}
 */
children(index: number, obj?:DOMBuffer.ChangeChild):DOMBuffer.ChangeChild|null {
  var offset = this.bb.__offset(this.bb_pos, 14);
  return offset ? (obj || new DOMBuffer.ChangeChild).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
};

/**
 * @returns {number}
 */
childrenLength():number {
  var offset = this.bb.__offset(this.bb_pos, 14);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
static startChangeElement(builder:flatbuffers.Builder) {
  builder.startObject(6);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} namespaceURIOffset
 */
static addNamespaceURI(builder:flatbuffers.Builder, namespaceURIOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, namespaceURIOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} localNameOffset
 */
static addLocalName(builder:flatbuffers.Builder, localNameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, localNameOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} propretiesOffset
 */
static addPropreties(builder:flatbuffers.Builder, propretiesOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, propretiesOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
static createPropretiesVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset|null {
if(!data){
  return null;
}
  builder.startVector(4, data.length, 4);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
static startPropretiesVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} attributesOffset
 */
static addAttributes(builder:flatbuffers.Builder, attributesOffset:flatbuffers.Offset) {
  builder.addFieldOffset(3, attributesOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
static createAttributesVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset|null {
if(!data){
  return null;
}
  builder.startVector(4, data.length, 4);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
static startAttributesVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} styleOffset
 */
static addStyle(builder:flatbuffers.Builder, styleOffset:flatbuffers.Offset) {
  builder.addFieldOffset(4, styleOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
static createStyleVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset|null {
if(!data){
  return null;
}
  builder.startVector(4, data.length, 4);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
static startStyleVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} childrenOffset
 */
static addChildren(builder:flatbuffers.Builder, childrenOffset:flatbuffers.Offset) {
  builder.addFieldOffset(5, childrenOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
static createChildrenVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset|null {
if(!data){
  return null;
}
  builder.startVector(4, data.length, 4);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
static startChildrenVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
static endChangeElement(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  return offset;
};

}
}
