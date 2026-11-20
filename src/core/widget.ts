import { Father } from './father'
import { Port } from './types'
import { Children, Host } from './host'


export class Widget extends Father {
  public host: Host

  constructor(
    host: Host,
    children: Children = [],
    port: Port = {},
  ) {

    
    super()

    this.host = host
    
    this.host.Children = children

  }


}
