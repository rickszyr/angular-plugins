import { ModuleWithProviders, NgModule } from '@angular/core';
import { IPlugin, PluginCatalogService } from 'interfaces';
import { MainMenuService } from './main-menu.service';
import { MainMenuComponent } from './main-menu/main-menu.component';

@NgModule({
  declarations: [MainMenuComponent],
  providers: [MainMenuService],
  imports: [],
  exports: [MainMenuComponent]
})
export class Plugin1Module implements IPlugin {
  get name(): string {
    return "Plugin 1";
  }

  get mainComponent(): any{
    return MainMenuComponent;
  }

  constructor(pluginService: PluginCatalogService, menuService: MainMenuService) {
    console.log("Se registro Plugin 1");
    pluginService.installedPlugins.push(this);
    menuService.registerCallback(() => console.log("Triggered!!!"));
  }
}
