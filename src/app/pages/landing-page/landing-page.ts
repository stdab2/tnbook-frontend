import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { HeroSection } from './hero-section/hero-section';
import { ProblemSolution } from './problem-solution/problem-solution';
import { HowItWorks } from './how-it-works/how-it-works';
import { Features } from './features/features';
import { Pricing } from './pricing/pricing';
import { Faq } from './faq/faq';

@Component({
  selector: 'app-landing-page',
  imports: [
    SharedMaterialModule,
    HeroSection,
    ProblemSolution,
    HowItWorks,
    Features,
    Pricing,
    Faq
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {

}
