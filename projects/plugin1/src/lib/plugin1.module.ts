import { NgModule } from '@angular/core';
import { IPlugin, PluginCatalogService } from 'interfaces';
import { MainMenuComponent } from './main-menu/main-menu.component';

@NgModule({
  declarations: [MainMenuComponent],
  imports: [],
  exports: []
})
export class Plugin1Module implements IPlugin {
  get name(): string {
    return "plugin 1!";
  }
  constructor(pluginService: PluginCatalogService) {
    console.log("Se registro Plugin 1");
    pluginService.installedPlugins.push(this);
  }
}
