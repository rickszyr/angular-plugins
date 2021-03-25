import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainMenuService {
  callbacks: (() => void)[]

  constructor() {
    this.callbacks = [];
   }

  registerCallback(func: () => void){
    this.callbacks.push(func);
  }

  invoke(){
    for(let callback of this.callbacks){
      callback();
    }
  }

}
