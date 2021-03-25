const SystemJs = window.System;
import * as ngCore from "@angular/core";
import * as ngRouter from "@angular/router";
import * as ngCommon from "@angular/common";
import * as ngForms from "@angular/forms";
import * as rxjs from "rxjs";
import * as interfaces from "interfaces";

import { Compiler, Injectable, Injector } from "@angular/core";
import { PluginCatalogService } from "interfaces";

@Injectable()
export class ModuleLoaderService {

  constructor(private injector: Injector, 
    private pluginService: PluginCatalogService,
    private compiler: Compiler) 
    { 

    }

  /**
   * Call this BEFORE calling load(url)
   */
  private register(modules: { [name: string]: object }): Promise<this> {
    const currentScript = document.getElementById("module-loader-imports");
    if(currentScript){
      currentScript.remove();
    }
    const imports: { [name: string]: string } = {};
    Object.keys(modules).forEach(key => {
      imports[key] = './lib/' + key;
    });
    const script = document.createElement('script');
    script.type = 'systemjs-importmap';
    script.id = "module-loader-imports";
    script.textContent = JSON.stringify({ imports }, null, 3);
    document.head.appendChild(script);
    return SystemJs.prepareImport().then(() => {
      const baseUrl = this.getBaseUrl();
      Object.keys(modules).forEach(key => {
          SystemJs.set(baseUrl + 'lib/' + key, modules[key]);
      });
      return this;
    });
  }

  private load(url: string): Promise<any> {
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

  registeredModules = {
    "@angular/core": ngCore,
    "@angular/common": ngCommon,
    "@angular/forms": ngForms,
    "@angular/router": ngRouter,
    "rxjs": rxjs,
    "interfaces": interfaces
  };

  externalModules = {

  };

  loadModule(modulePath: string, moduleName: string, packageName: string): Promise<ngCore.NgModuleRef<any>> {

    console.log(this.pluginService.installedPlugins);
    if (this.pluginService.installedPlugins.find(x => x.name.toLowerCase() == moduleName.trim().toLowerCase()) != null) {
      throw new Error("Plugin loaded already");
    }

    return this.register(this.registeredModules).then(ml => ml.load(modulePath).then(m => {
      this.registeredModules[packageName] = m;
      this.externalModules[packageName] = modulePath;

      return this.compiler.compileModuleAndAllComponentsAsync(m[moduleName]).then(
        mwf => {
          let moduleRef = mwf.ngModuleFactory.create(this.injector);
          return moduleRef;
        })
    }));
  }

}