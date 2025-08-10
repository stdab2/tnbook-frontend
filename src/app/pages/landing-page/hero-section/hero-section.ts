import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [SharedMaterialModule, RouterLink],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css'
})
export class HeroSection {

}
