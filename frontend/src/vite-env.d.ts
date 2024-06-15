/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ip: string;
  readonly VITE_SQport: string;
  readonly VITE_UIport: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
