import { Component } from '@angular/core';
import { DemoComponent } from "./demo/demo.component";
import { FormComponent } from "./form/form.component";

@Component({
  selector: 'app-root',
  imports: [DemoComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angutest';
  component = 'demos'
}
