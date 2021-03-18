import { Type } from "@angular/core";

export interface IPlugin {
    name: string;
    mainComponent?: Type<any>;
}
