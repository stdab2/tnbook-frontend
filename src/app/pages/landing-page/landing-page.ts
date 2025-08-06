import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../shared/shared-material.module';

@Component({
  selector: 'app-landing-page',
  imports: [SharedMaterialModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {

}
