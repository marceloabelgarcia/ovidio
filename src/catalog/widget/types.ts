

export type Port = {
    input?: TypePart[] | string
    output?: TypePart[] | string
    trigger?: Trigger
    [key: string]: string | TypePart[] | string[] | Trigger | undefined
}

export type Verb = {
    name: string
    noun: string
    gerund: string
    participle: string
};

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

export type TypePart = {
    name: string
    type: string | TypePart[]
}

export type Output = 
    {
        trigger: Trigger,
        type: string,
        value: unknown | string,    
    }

export type OnAction = (output: Output) => void


type TriggerRelation = {
    trigger: Trigger
    action: Action
}

// Ejemplo de uso:
const send: Verb = {
    name: 'send',
    noun: 'sender',
    gerund: 'sending',
    participle: 'sent',
};


const sender: Action = {
    action: send.name,
    actor: send.noun,
    inProgress: send.gerund,
    completed: send.participle,
};
