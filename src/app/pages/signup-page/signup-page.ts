import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  imports: [SharedMaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css'
})
export class SignupPage {
  private router = inject(Router);
  private _fb = inject(FormBuilder)

  public signupForm = this._fb.group({
    email: [''],
    password: ['']
  })

  

  navigateToSignin() {
    this.router.navigate(['/login']);
  }

  get SignupForm(): FormGroup {
    return this.signupForm as FormGroup;
  }
}
