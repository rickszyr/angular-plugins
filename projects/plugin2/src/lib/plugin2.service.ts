import { Injectable } from '@angular/core';

@Injectable()
export class Plugin2Service {

  constructor() { }

  print(){
    console.log("Llamando a servicio de Plugin 2");
  }
}
