import { string, object, text, hidden, type TypePart } from '../types'

const textContent: TypePart[] = [
  { name: 'value', type: string },
  { name: 'format', type: string },
]

const imageContent: TypePart[] = [
  { name: 'url', type: string },
  { name: 'alt', type: string },
]

const toolContent: TypePart[] = [
  { name: 'name', type: string },
  { name: 'input', type: object },
]

const content: TypePart[] = [
  { name: 'text', type: textContent },
  { name: 'image', type: imageContent },
  { name: 'tool', type: toolContent },
]

const message: TypePart[] = [
  { name: 'id', type: hidden },
  { name: 'role', type: string },
  { name: 'text', type: string },
]

const turn: TypePart[] = [
  { name: 'id', type: hidden },
  { name: 'messages', type: message },
]

const conversation: TypePart[] = [
  { name: 'id', type: hidden },
  { name: 'turns', type: turn },
]

const documentChunk: TypePart[] = [
  { name: 'id', type: hidden },
  { name: 'text', type: text },
]

const document: TypePart[] = [
  { name: 'id', type: hidden },
  { name: 'chunks', type: documentChunk },
]

/** Ítem de contexto: base + value según type (conversation | document). */
const contextItem: TypePart[] = [
  { name: 'id', type: hidden },
  { name: 'name', type: string },
  { name: 'meta', type: text },
  { name: 'type', type: string },
  { name: 'value', type: document },
]

const context: TypePart[] = contextItem

const catalog = {
  textContent,
  imageContent,
  toolContent,
  content,
  message,
  turn,
  conversation,
  documentChunk,
  document,
  contextItem,
  context,
}

export {
  textContent,
  imageContent,
  toolContent,
  content,
  message,
  turn,
  conversation,
  documentChunk,
  document,
  contextItem,
  context,
  catalog,
}
