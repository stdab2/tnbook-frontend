import { Component } from '@angular/core';
import { NavBar } from './shared/nav-bar/nav-bar'
import { initFlowbite } from 'flowbite';
import { LandingPage } from "./pages/landing-page/landing-page";

@Component({
  selector: 'app-root',
  imports: [NavBar, LandingPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'whatsbook';
  
  ngOnInit(): void {
    initFlowbite();
  }
}
