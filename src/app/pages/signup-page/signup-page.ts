import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from "../../core/services/api.service";
import  { AuthProvider } from "../../core/enum/auth-provider";
import { MatDialog } from '@angular/material/dialog';
import { VerifyCode } from '../../shared/verify-code/verify-code';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-signup-page',
  imports: [SharedMaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css'
})
export class SignupPage {

  private router = inject(Router);

  private _fb = inject(FormBuilder)

  protected readonly AuthProvider = AuthProvider;

  onVerificationMode = false;

  isSignupLoading = false;

  authProvider?: AuthProvider;

  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog,
    private apiService: ApiService
  ) {}

  public signupForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  get SignupForm(): FormGroup {
    return this.signupForm as FormGroup;
  }

  navigateToSignin() {
    this.router.navigate(['/login']);
  }

  onSignup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isSignupLoading = true;
    this.apiService.signup(this.signupForm.value)
      .subscribe({
        next: data => {
          this.onVerificationMode = true;
          this.isSignupLoading = false;
          this.openVerificationCodePopup();
        },
        error: error => {
          console.log(JSON.stringify(error));
          this.isSignupLoading = false;
        }
      });
  }

  signupWithProvider(provider: AuthProvider) {
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

  openVerificationCodePopup(): void {
      this.dialog.open(VerifyCode, {
        width: '600px',
        height: '200px',
        disableClose: true,
        closeOnNavigation: true,
        data: { 
          email: this.signupForm.get('email')?.value,
          password: this.signupForm.get('password')?.value
         }
      });
  }
  
}
