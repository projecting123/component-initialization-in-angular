import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Demo2Service {
  count = signal(0)
  constructor() { 
    console.log('demoService2', this.count())
  }
}
