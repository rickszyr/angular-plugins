const SystemJs = window.System;


export class ModuleLoader {
    /**
     * Call this BEFORE calling load(url)
     */
    register(modules: { [name: string]: object }): Promise<this> {
      const imports: { [name: string]: string } = {};
      Object.keys(modules).forEach(key => {
        imports[key] = './lib/' + key;
      });
      const script = document.createElement('script');
      script.type = 'systemjs-importmap';
      script.textContent = JSON.stringify({imports}, null, 3);
      document.head.appendChild(script);
      return SystemJs.prepareImport().then(() => {
        const baseUrl = this.getBaseUrl();
        Object.keys(modules).forEach(key => {
          SystemJs.set(baseUrl + 'lib/' + key, modules[key]);
        });
        return this;
      });
    }
  
    load(url: string): Promise<any> {
      return SystemJs.import(url);
    }
  
    private getBaseUrl(): string {
      let baseUrl;
      const baseEl = document.querySelector('base[href]');
      if (baseEl) {
        baseUrl = (baseEl as any).href;
      }
  
      if (!baseUrl && typeof location !== 'undefined') {
        baseUrl = location.href.split('#')[0].split('?')[0];
        const lastSepIndex = baseUrl.lastIndexOf('/');
        if (lastSepIndex !== -1) {
          baseUrl = baseUrl.slice(0, lastSepIndex + 1);
        }
      }
      return baseUrl;
    }
  
  }