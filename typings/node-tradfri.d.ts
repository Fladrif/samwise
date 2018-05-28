declare module 'node-tradfri' {
  export interface Config {
    identity?: string;
    preSharedKey?: string;
    coapClientPath?: string;
    securityId?: string;
    hubIpAddress?: string;
  }

  export function create(config: Config): any;
}
