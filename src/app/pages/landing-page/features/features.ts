import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-features',
  imports: [SharedMaterialModule, RouterLink],
  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class Features {

}
