import { effect, Injectable, linkedSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  count = signal(1)
  newValue = linkedSignal({
    source: this.count,
    computation: () => this.count() * 2,
    equal: (a, b) => a === b
  })
  constructor() {
    effect(() => console.log('demoService', this.newValue()))
  }

  increase() {
    this.count.update(prev => prev + 1)
  }

  updateNewValue(){
    this.newValue.update(prev => prev + 1)
  }

  ngOnInit(): void {
    console.log('Service-1, ngOnInit')
  }
}