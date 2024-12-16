/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
declare global {
  interface Window {
    sendMessageToBackground: (message: string, data: any) => Promise<any>;
  }
}