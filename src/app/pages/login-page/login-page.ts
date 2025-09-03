import { Component, inject } from '@angular/core';
import  { AuthProvider } from "../../core/enum/auth-provider";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../core/services/auth.service";
import { environment } from '../../../environments/environment';
import { ApiService } from "../../core/services/api.service";
import { SharedMaterialModule } from '../../shared/shared-material.module';


@Component({
  selector: 'app-login-page',
  imports: [SharedMaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {

  private router = inject(Router);

  private _fb = inject(FormBuilder)

  protected readonly AuthProvider = AuthProvider;

  authProvider?: AuthProvider;

  loading = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  public loginForm = this._fb.group({
    email: ['dabiresteeve1@gmail.com', Validators.required],
    password: ['qwerty', Validators.required]
  })

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  get LoginForm(): FormGroup {
    return this.loginForm as FormGroup;
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.apiService.login(this.loginForm.value)
      .subscribe({
        next: data => {
          const accessToken = data.token;
          if (accessToken) {
            this.authProvider = AuthProvider.local;
            this.authService.setAuthentication(accessToken);
            this.loading = false;
            this.router.navigate(['/dashboard/profile', this.authProvider], {state: {from: this.router.routerState.snapshot.url}});
          } else {
          }
        },
        error: error => {
          this.loading = false;
        }
      });
  }

  loginWithProvider(provider: AuthProvider) {
    switch (provider) {
      case AuthProvider.google:
        window.location.href = environment.googleAuthUrl;
        break;
      default:
        this.showErrorToast('Unknown provider')
    }
  }

  showErrorToast(errorMessage: string): void {
    this.toastr.error(errorMessage, "Error");
  }
}
