import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [SharedMaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {

  private router = inject(Router);

  private _fb = inject(FormBuilder)

  public loginForm = this._fb.group({
    email: [''],
    password: ['']
  })

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  get LoginForm(): FormGroup {
    return this.loginForm as FormGroup;
  }
}
