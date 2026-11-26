// Traza de comportamiento del core, sin DOM: los lugares son imitaciones con un elemento falso.
// Se corre antes y después de un cambio y se compara con la salida esperada.
//
// Uso, desde la raíz del repo:
//   npx tsx --tsconfig tsconfig.json scripts/verify/trace.mts | diff - scripts/verify/trace.expected.txt
//
// Sin diferencias, el core se comporta igual. Si un cambio la mueve a propósito, se revisa
// la diferencia línea por línea y recién ahí se regenera trace.expected.txt.
// Si el orden del catálogo mueve html-container, hay que actualizar su import.
import { Widget } from '../../src/core/widget'
import { Mother } from '../../src/core/mother'
import { HtmlContainer } from '../../src/catalog/html/core/html-container'
import { triggerKey } from '../../src/core/resource'
import type { Port, Output, Action, TriggerRelation, TypePart, Trigger } from '../../src/core/types'

const A = (verb: string, actor: string, progress: string, finished: string): Action => ({ verb, actor, progress, finished })
const click = A('click', 'user', 'press', 'released')
const change = A('change', 'user', 'changing', 'changed')
const submit = A('submit', 'system', 'submitting', 'submitted')
const save = A('save', 'system', 'saving', 'saved')
const modify = A('modify', 'system', 'modifying', 'modified')
const load = A('load', 'system', 'loading', 'loaded')
const fail = A('fail', 'system', 'failing', 'failed')
const T = (action: Action, state: Trigger['state'] = 'finished'): Trigger => ({ action, state })

const trace: string[] = []
const nm = (x: unknown) => (x as object)?.constructor?.name ?? String(x)
// la entrada de un nivel ahora es su lugar (Mother.receive); se firma con el nombre de su widget
const origReceive = Mother.prototype.receive
Mother.prototype.receive = function (this: Mother, output: Output, from: Widget | null = null) {
  trace.push(`  dispatched ${nm(this.widget)} key=${triggerKey(output.event.trigger)} from=${from ? nm(from) : '-'} box=${output.resource?.type}:${JSON.stringify(output.resource?.value)} target=${nm(output.event.target)}`)
  return origReceive.call(this, output, from)
}
const origExecute = Widget.prototype.execute
Widget.prototype.execute = function (this: Widget, output: Output) {
  trace.push(`  execute ${nm(this)} key=${triggerKey(output.event.trigger)} box=${output.resource?.type}:${JSON.stringify(output.resource?.value)}`)
  return origExecute.call(this, output)
}

class Box extends Mother { append(_c: Mother) {} }

/** Elemento falso: guarda los sensores como el DOM guarda los listeners. */
type FakeEl = { fire: (() => void)[] }
const fakeEl = (): FakeEl => ({ fire: [] })
const fire = (m: Mother) => ((m as HtmlContainer).element as unknown as FakeEl).fire.forEach((f) => f())
/** Imita ButtonContainer: hereda el bindRelations real de HtmlContainer; el sensor cuenta conjugado. */
class BtnMother extends HtmlContainer {
  constructor(port: Port) { super(fakeEl() as unknown as Text, port) }
  protected sense(action: Action): void {
    trace.push(`  dom-bind ${action.verb}`)
    ;(this.element as unknown as FakeEl).fire.push(() => this.emit({ action, state: 'finished' }, { type: 'button', value: 'btn' }))
  }
}
/** Imita InputContainer: escribe la caja y la cuenta conjugada; execute copia si es su tipo. */
class InMother extends HtmlContainer {
  value = ''
  constructor(public name: string, port: Port) { super(fakeEl() as unknown as Text, port) }
  protected sense(action: Action): void {
    trace.push(`  dom-bind ${action.verb}`)
    ;(this.element as unknown as FakeEl).fire.push(() => { this.widget!.set(this.name, this.value); this.emit({ action, state: 'finished' }, this.widget!.ref(this.name)) })
  }
  type(v: string) { this.value = v; fire(this) }
  execute(o: Output) { if (o.resource?.type === this.name) this.widget!.set(this.name, o.resource.value) }
}
/** Imita FetchContainer: emite progress, finished y fail con emit(). */
class NetMother extends Box {
  run() {
    this.emit(T(load, 'progress'), this.widget!.ref('addr'))
    this.widget!.set('addr', { street: 'x' })
    this.emit(T(load, 'finished'), this.widget!.ref('addr'))
    this.emit(T(fail), { type: 'error', value: 'boom' })
  }
}

const relBtn: TriggerRelation = { trigger: T(submit), triggers: [T(click)] }
class Btn extends Widget { constructor(p: Port = {}) { const port = { ...p, relations: [relBtn, relBtn] }; super(new BtnMother(port), [], port) } }
const nameT: TypePart = { name: 'name', type: 'string' }
const relIn: TriggerRelation = { trigger: T(change), triggers: [T(change)] }
class In1 extends Widget { constructor(p: Port = {}) { const port = { ...p, relations: [relIn] }; super(new InMother('name', port), [], port); this.set('name', '') } }
class In2 extends Widget { constructor(p: Port = {}) { const port = { ...p, relations: [relIn] }; super(new InMother('name', port), [], port); this.set('name', '') } }
class Net extends Widget { constructor(p: Port = {}) { super(new NetMother(p), [], p); this.set('addr', undefined) } }
class OnLoad extends Widget { constructor(p: Port = {}) { super(new Box(p), [], p) } }

const relSave: TriggerRelation = { trigger: T(save), triggers: [T(submit)] }
class Page extends Widget {
  constructor(p: Port = {}) {
    super(new Box(), [
      { child: Btn },
      { child: In1, port: { input: nameT, trigger: T(change) } },
      { child: In2, port: { input: nameT, trigger: T(change) } },
      { child: Net, port: { trigger: T(load, 'verb') } },
      { child: OnLoad, port: { trigger: T(load) } },
    ], { relations: [relSave, relSave, { trigger: T(modify), triggers: [T(submit), T(change)] }] })
  }
}
class SavedWatcher extends Widget { constructor(p: Port = {}) { super(new Box(), [], p) } }
class FailWatcher extends Widget { constructor(p: Port = {}) { super(new Box(), [], p) } }
/** 3b: una orden que baja por niveles que declaran el mismo trigger. */
class BoomMother extends Box { boom() { this.emit(T(fail), { type: 'error', value: 'adentro' }) } }
class Boom extends Widget { constructor(p: Port = {}) { super(new BoomMother(p), [], p) } }
class Deep extends Widget { constructor(p: Port = {}) { super(new Box(), [], p) } }
class Alert extends Widget { constructor(p: Port = {}) { super(new Box(), [{ child: Deep, port: { trigger: T(fail) } }, { child: Boom }], p) } }
class Deaf extends Widget { constructor(p: Port = {}) { super(new Box(), [], p) } }
class Plain extends Widget { constructor(p: Port = {}) { super(new Box(), [], p) } }
class Shell extends Widget {
  constructor(p: Port = {}) {
    super(new Box(), [{ child: Alert, port: { trigger: T(fail) } }, { child: Deaf, port: { trigger: T(save) } }, { child: Plain }], p)
  }
}
class Root extends Widget {
  constructor() {
    super(new Box(), [
      { child: Page },
      { child: SavedWatcher, port: { trigger: T(save) } },
      { child: SavedWatcher, port: { trigger: T(modify) } },
      { child: FailWatcher, port: { trigger: T(fail) } },
      { child: Shell, port: { trigger: T(fail) } },
    ])
  }
}

trace.push('montaje')
const root = new Root()
const page = root.children[0]
const [btn, in1, in2, net] = page.children
const step = (label: string, fn: () => void) => { trace.push(label); fn() }
step('click', () => fire(btn.mother))
step('in1 escribe Ana', () => (in1.mother as InMother).type('Ana'))
step('in2 escribe Luis', () => (in2.mother as InMother).type('Luis'))
step('net', () => (net.mother as NetMother).run())
step('boom (nace adentro de Alert)', () => ((root.children[4].children[0].children[1]).mother as BoomMother).boom())
trace.push('cajas')
trace.push(`  root name=${JSON.stringify(root.get('name'))} addr=${JSON.stringify(root.get('addr'))} error=${JSON.stringify(root.get('error'))} button=${JSON.stringify(root.get('button'))}`)
trace.push(`  page name=${JSON.stringify(page.get('name'))} in1=${JSON.stringify(in1.get('name'))} in2=${JSON.stringify(in2.get('name'))}`)
trace.push(`  misma caja: root/in2=${root.ref('name') === in2.ref('name')} page/in1=${page.ref('name') === in1.ref('name')} root/net=${root.ref('addr') === net.ref('addr')}`)
// 3c: gerundio → orden derivada (loading → disable), participio → orden (loaded → enable)
const disable = A('disable', 'system', 'disabling', 'disabled')
const enable = A('enable', 'system', 'enabling', 'enabled')
class NetPMother extends Box {
  run() {
    this.emit(T(load, 'progress'), this.widget!.ref('addr'))
    this.emit(T(load, 'finished'), this.widget!.ref('addr'))
  }
}
class NetP extends Widget { constructor(p: Port = {}) { super(new NetPMother(p), [], p); this.set('addr', undefined) } }
class Form extends Widget {
  constructor(p: Port = {}) {
    super(new Box(), [{ child: NetP }], {
      relations: [
        { trigger: T(disable, 'verb'), triggers: [T(load, 'progress')] },
        { trigger: T(enable, 'verb'), triggers: [T(load, 'finished')] },
      ],
    })
  }
}
class DisableWatcher extends Widget { constructor(p: Port = {}) { super(new Box(), [], p) } }
class EnableWatcher extends Widget { constructor(p: Port = {}) { super(new Box(), [], p) } }
class Screen extends Widget {
  constructor() {
    super(new Box(), [
      { child: Form },
      { child: DisableWatcher, port: { trigger: T(disable, 'verb') } },
      { child: EnableWatcher, port: { trigger: T(enable, 'verb') } },
    ])
  }
}
const screen = new Screen()
step('form carga', () => (screen.children[0].children[0].mother as NetPMother).run())
console.log(trace.join('\n'))
