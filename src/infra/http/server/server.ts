export interface Server {
  start: (port: number) => void;
}

export interface ServerSettings {
  setConfig(app: any): void;
}
