
export type OnAction = (verb: string) => void;

export type Trigger = {
    name: string;
    executed: string;
};

export class Container {
    constructor(
        readonly parent: Container | null,
        readonly element: HTMLElement | Container,
        triggers: Trigger[] = [],
        onAction: OnAction = () => {}
    ) {
        // Registrar eventos si el elemento los soporta
        if ('addEventListener' in element) {
            triggers.forEach(trigger => {
                element.addEventListener(trigger.name, () => {
                    onAction(trigger.executed);
                });
            });
        }

        // Incorporar al padre
        if (parent) {
            const parentElement = parent.element;

            if (parentElement instanceof HTMLElement) {
                if (element instanceof Container) {
                    parentElement.appendChild(element.element as Node);
                } else {
                    parentElement.appendChild(element);
                }
            }
        }
    }
}
