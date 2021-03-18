import { Compiler, Component, ComponentFactoryResolver, Injector, NgModuleFactory, ViewChild, ViewContainerRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IPlugin, PluginCatalogService } from "interfaces";

import * as ngCore from "@angular/core";
import * as ngCommon from "@angular/common";
import * as ngBrowser from "@angular/platform-browser";
import * as commonInterfaces from "interfaces";
import { ModuleLoader } from "./remote-module-loader.service";
import { DynamicComponentDirective } from "./directives/dynamic-component.directive";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styles: [],
})
export class AppComponent {
  title = "plugins";
  loader: ModuleLoader;
  
  @ViewChild('putStuffHere', {read: ViewContainerRef}) putStuffHere: ViewContainerRef;

  constructor(
    public pluginService: PluginCatalogService,
    private injector: Injector,
    private factoryResolver: ComponentFactoryResolver,
    private compiler: Compiler,
    public viewContainer: ViewContainerRef
  ) {
    this.loader = new ModuleLoader();
  }


  loadModule(modulePath: string, moduleName: string) {
    this.loader.register({
      "@angular/core": ngCore,
      "@angular/common": ngCommon,
      "interfaces": commonInterfaces
    }).then(ml => ml.load(modulePath).then(m => {
      const moduleFactory: NgModuleFactory<any> = <NgModuleFactory<any>>m.default[moduleName+ "NgFactory"];

      const moduleReference = moduleFactory.create(this.injector);
      moduleReference.componentFactoryResolver.resolveComponentFactory((<IPlugin>moduleReference.instance).mainComponent);
      var compFactory = moduleReference.componentFactoryResolver.resolveComponentFactory(this.getEntryComponent(moduleFactory));

      this.putStuffHere.createComponent(compFactory); // <<< this fails

      var component = compFactory.create(this.injector); 
      this.putStuffHere.insert(component.hostView);// <<< this fails
      
    }));
  }

  getEntryComponent(moduleFactory: any):any {
    var existModuleLoad = (<any>moduleFactory.moduleType).decorators[0].type.prototype.ngMetadataName === "NgModule"
    if (!existModuleLoad) return null;
    return moduleFactory.moduleType.decorators[0].args[0].entryComponents[0];
  }
}
