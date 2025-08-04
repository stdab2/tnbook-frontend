import { Component } from '@angular/core';
import { NavBar } from './shared/nav-bar/nav-bar'
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [NavBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'whatsbook';
  
  ngOnInit(): void {
    initFlowbite();
  }
}
