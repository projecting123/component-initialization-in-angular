import { effect, Injectable, linkedSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoService{
  count = signal(1)
  newValue = linkedSignal({
    source: this.count,
    computation: () => this.count() * 2,
    equal: (a, b) => a === b
  })
  constructor() {
    effect(() => console.log('demoService', this.newValue()))
  }

  // Lifecycle hooks never execute on service
  ngOnInit(): void {
    console.log('Service-1, ngOnInit')
  }
}