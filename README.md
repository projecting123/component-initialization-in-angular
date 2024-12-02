
### This project is created by ```Angular CLI-19.0.0```
# Angular Component Initialization

When Angular sees the selector for a component which'll be rendered on DOM as-

```<app-demo></app-demo> ```

1. Angular goes to Initialize the component by calling the constructor of respective component class. 

2. Angular checks whether that component is depend upon some service(s) or not. If yes, Angular goes to initialize the service class first before the initialization of the component class, because Angular tries to keep the most updated values in the component view i.e. demo.component.html for this project.

------------------------------------------------------
### Example:
demo.component.ts

```javascript
    export class DemoComponent implements OnInit{
      demoService = inject(DemoService)
      demoService2 = inject(Demo2Service)
      constructor(){
        console.log('DemoComponent', this.demoService.newValue())
        console.log('DemoComponent constructor')
      }

      ngOnInit(): void {
        console.log('DemoComponent, ngOnInit')
      }
    }

```

demo.service.ts

```javascript
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
```

demo2.service.ts

```javascript
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

```

When it sees that the component depends upon 2 service classes i.e. demoService and demoService2.

Angular goes to initialize the demoService class first and initialize the service class and also try to execute the code inside constructor, but Angular got that the `console.log()` is present inside the effect function which runs asynchronously, so Angular skips the execution of that line.

Then Angular come back to his previous stage in the `DemoComponent` and goes to the demoService2 class to instantiate that class on same process as `demoService`. It enters the `console.log()` directly inside the constructor, that is why Angular directly executes that line and print the value of `count` signal in the console.

Then Again Angular come back to his previous stage and executes the first `console.log()` by fetching the `newValue` of demoService and then immediately executes the second `console.log()` of the constructor and then after all these execution the asynchronous `console.log()` i.e. inside the effect function get executed.

And all after these, Lifecycle hooks get executed. See more about the lifecycle hooks, how they executed, order of execution etc.

This was the simple execution order of Angular component and services

### Note:
Angular lifecycle hooks of services never get executed. Lifecycle hooks are only for Angular Components. If route guards are used for a route then the respective component for that route will only be rendered on client side, not in the server side.

### Authors

- [@ankur](https://github.com/projecting123)

