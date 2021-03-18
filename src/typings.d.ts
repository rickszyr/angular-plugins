interface Window {
  define: (name: string, deps: string[], definitionFn: () => any) => void;

  System: {
    import: (path) => Promise<any>;
    set: (id, module) => any;
    prepareImport: () => Promise<void>;
    resolve: (string) => Promise<void>;
  };
}
