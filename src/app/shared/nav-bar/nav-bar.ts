import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
  navBarSections = [
    {
      id: 'how-it-works',
      value: 'How It Works'
    },
    {
      id: 'features',
      value: 'Features'
    },
    {
      id: 'pricing',
      value: 'Pricing'
    },
    {
      id: 'faq',
      value: 'FAQ'
    }
  ]

  scrollSmoothTo(value: string) {
    const element = document.getElementById(value)!;
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
