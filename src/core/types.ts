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

export type State = 'runing' | 'finished' | 'verb' | 'actor'



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

export type TriggerRelation = {
    trigger: Trigger,
    triggers: Action[]
}


export type Port = {
    input?: string | TypePart | HTMLElement
    relations?: TriggerRelation[]
    trigger?: Trigger
    [key: string]: TriggerRelation[] | TypePart | Trigger | string | HTMLElement | undefined
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



