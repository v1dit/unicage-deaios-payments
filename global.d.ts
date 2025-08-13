declare module '*.svg' {
    const src: string;
    export default src;
  }
  declare module '*.png' {
    const src: string;
    export default src;
  }
  declare module '*.jpg' {
    const src: string;
    export default src;
  }
  declare module '*.css';
  
  interface EthereumProvider {
    isMetaMask?: boolean;
    request(args: { method: string; params?: any[] | object }): Promise<any>;
    on?(event: string, listener: (...args: any[]) => void): void;
    removeListener?(event: string, listener: (...args: any[]) => void): void;
  }
  
  declare global {
    interface Window {
      ethereum?: EthereumProvider;
    }
  }
  export {};
  