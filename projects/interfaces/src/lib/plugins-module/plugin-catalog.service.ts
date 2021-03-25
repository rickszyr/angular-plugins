import { Injectable, Injector } from '@angular/core';
import { IPlugin } from './iplugin';

@Injectable({
  providedIn: 'root'
})
export class PluginCatalogService {
  installedPlugins: IPlugin[];

  constructor() {
    this.installedPlugins = [];
  }

  public install(plugin: IPlugin){
  }
}
