import {
  Component,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { IPlugin, PluginCatalogService } from "interfaces";

import { ModuleLoaderService } from "./module-loader.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styles: [],
})
export class AppComponent {
  title = "plugins";

  @ViewChild("putStuffHere", { read: ViewContainerRef })
  putStuffHere: ViewContainerRef;

  constructor(
    public pluginService: PluginCatalogService,
    private loader: ModuleLoaderService,
    public viewContainer: ViewContainerRef
  ) {}

  loadModule(modulePath: string, moduleName: string, packageName: string) {
    this.loader.loadModule(modulePath, moduleName, packageName).then((moduleRef) => {
      const module = <IPlugin>moduleRef.instance;
      if(module.mainComponent !== undefined){
        const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(
          module.mainComponent
        );
        this.putStuffHere.createComponent(componentFactory);
        }
    });
  }
}
