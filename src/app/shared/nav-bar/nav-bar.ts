import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
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
