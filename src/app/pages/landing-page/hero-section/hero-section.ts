import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../../shared/shared-material.module';

@Component({
  selector: 'app-hero-section',
  imports: [SharedMaterialModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css'
})
export class HeroSection {

}
