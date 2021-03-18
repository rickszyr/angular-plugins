import { Injectable } from '@angular/core';
import { IPlugin } from './iplugin';

@Injectable({
  providedIn: 'root'
})
export class PluginCatalogService {
  installedPlugins: IPlugin[];

  constructor() {
    this.installedPlugins = [];
  }
}
