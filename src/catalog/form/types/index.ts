import { TypePart } from 'core/types'

export const string = 'string'
export const number = 'number'

export const name: TypePart = {
    name: 'name',
    type: string,
}

export const door: TypePart = {
    name: 'door',
    type: number,
}

export const street: TypePart = {
    name: 'street',
    type: [name, door],
}

export const city: TypePart = {
    name: 'city',
    type: string,
}

export const state: TypePart = {
    name: 'state',
    type: string,
}

export const zip: TypePart = {
    name: 'zip',
    type: string,
}

export const address: TypePart = {
    name: 'address',
    type: [street, city, state, zip],
}