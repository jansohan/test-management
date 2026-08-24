declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_DUMMY_LOGIN: string;
  readonly VITE_DUMMY_DATA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
