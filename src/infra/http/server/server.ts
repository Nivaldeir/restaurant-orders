export interface Server {
  start: (port: number) => void;
  settings: (settings: ServerSettings[]) => void;
}

export interface ServerSettings {
  setConfig(app: any): void;
}
