import { Father } from './father'
import { Port } from './types'
import { Children, Mother } from './mother'


export class Widget extends Father {
  public mother: Mother

  constructor(
    mother: Mother,
    children: Children = [],
    port: Port = {},
  ) {

    
    super()

    this.mother = mother
    
    this.mother.children = children

  }


}
