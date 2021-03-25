import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginCatalogService } from './plugin-catalog.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PluginsModule {
  constuctor(@Optional() @SkipSelf() parentModule?: PluginsModule){
    if(parentModule){
      throw new Error('Do not include the module management module in any other plugin.')
    }
  }

  static forRoot(): ModuleWithProviders<PluginsModule>{
    return {
      ngModule: PluginsModule,
      providers: [ PluginCatalogService ]
    }
  }
 }
