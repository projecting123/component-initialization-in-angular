import { Component, inject, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';
import { Demo2Service } from '../demo2.service';

@Component({
  selector: 'app-demo',
  imports: [],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
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
