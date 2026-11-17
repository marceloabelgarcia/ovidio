

export type Verb = {
    name: string
    noun: string
    gerund: string
    participle: string
};

export type State = 'inProgress' | 'completed'


export type Port = {
    input?: TypePart[] | string
    output?: TypePart[]
    trigger?: Trigger | string
    [key: string]: string | TypePart | TypePart[] | string[] | Trigger | string[] | undefined
}


export type Action = {
    action: Verb["name"];
    actor: Verb["noun"];
    inProgress: Verb["gerund"];
    completed: Verb["participle"];
};

export type Trigger = {
    name: Action["action"]
    completed: Action["completed"]
}


export type Event = {
    action: Action
    state: State
    time: Date
}


export type TypePart = {
    name: string
    type: string | TypePart[]
}

export type Resource = {
    type: TypePart["name"]
    value?: unknown
}

export type Output =
    {
        event: Event,
        resource: Resource
    }

export type OnAction = (output: Output) => void


