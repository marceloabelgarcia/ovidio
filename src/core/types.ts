export type TypePart = {
    name: string
    type: string | TypePart[]
}

export type Verb = {
    name: string
    noun: string
    gerund: string
    participle: string
};

export type State = 'progress' | 'finished' | 'verb' | 'actor'



export type Action = {
    verb: Verb["name"];
    actor: Verb["noun"];
    progress: Verb["gerund"];
    finished: Verb["participle"];
    [key: string]: Verb["name"] | Verb["gerund"] | Verb["participle"] | undefined
};

export type Trigger = {
    action: Action
    state: State
}

/**
 * Una frase: cuando llega alguno de `triggers` (acción en una forma: orden, gerundio,
 * participio o sustantivo), este nivel lo cuenta como `trigger`.
 * Ej.: cuando el botón fue soltado (click/finished) → orden: cargar (load/verb).
 */
export type TriggerRelation = {
    trigger: Trigger,
    triggers: Trigger[]
}


/** El port es siempre esto: qué entra, qué espera, qué traduce. */
export type Port = {
    input?: string | TypePart | HTMLElement
    relations?: TriggerRelation[]
    trigger?: Trigger
}

export type Event = {
    trigger: Trigger
    time: Date
    target: unknown
}


export type Resource = {
    type: TypePart["name"]
    value?: unknown
}

export type Output =
    {
        event: Event,
        resource?: Resource
    }



