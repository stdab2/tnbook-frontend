import { afterNextRender, Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'whatsbook';

  constructor() {
    afterNextRender(() => {
      const element = document.getElementById('nav-bar')!;
      element.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  ngOnInit(): void {
    initFlowbite();
  }
}
