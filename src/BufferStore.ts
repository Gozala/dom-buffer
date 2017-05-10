import {DOMBuffer} from './DOMBuffer.fbs'
import {flatbuffers} from 'flatbuffers'


var builder = new flatbuffers.Builder(1024)


DOMBuffer.ChangeText.startChangeText(builder)
DOMBuffer.ChangeText.addText(builder, builder.createString('Hello World'))
var node = DOMBuffer.ChangeText.endChangeText(builder)

DOMBuffer.Change.startChange(builder)
DOMBuffer.Change.addType(builder, DOMBuffer.ChangeType.Insert)
DOMBuffer.Change.addChange(builder, node)
var change = DOMBuffer.Change.endChange(builder)

builder.finish(change)
var bytes = builder.asUint8Array()

// Read

var buffer = new flatbuffers.ByteBuffer(bytes)
var diff = DOMBuffer.Change.getRootAsChange(buffer)
var changeType = diff.type()
var textNode = diff.change(new DOMBuffer.ChangeText)