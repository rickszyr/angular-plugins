import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, Type } from '@angular/core';
import { NgModule } from '@angular/core';
import { IPlugin, PluginCatalogService } from 'interfaces';
import { MainMenuService } from 'plugin1';
import { Plugin2Component } from './plugin2.component';



@NgModule({
  declarations: [Plugin2Component],
  imports: [CommonModule],
  exports: [Plugin2Component],
  entryComponents: [Plugin2Component]
})
export class Plugin2Module implements IPlugin {
  get name(): string{
    return "Plugin 2";
  }

  get mainComponent(): Type<any>{
    return Plugin2Component;
  }

  constructor(pluginService: PluginCatalogService, public resolver: ComponentFactoryResolver, menuservice: MainMenuService){
    console.log("Se registro Plugin 2");
    pluginService.installedPlugins.push(this);
    menuservice.invoke();
  }
}
