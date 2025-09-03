import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from "../../core/services/auth.service";
import { ApiService } from "../../core/services/api.service";
import  {AuthProvider } from "../../core/enum/auth-provider";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedMaterialModule } from '../../shared/shared-material.module';


@Component({
  selector: 'app-verify-code',
  imports: [
    SharedMaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './verify-code.html',
  styleUrl: './verify-code.css'
})
export class VerifyCode {

  private router = inject(Router);
  public verificationCode!: FormControl;
  public email!: string;
  public password!: string;

  onVerificationMode = true;
  isVerifyLoading = false;
  isResendingLoading = false;

  authProvider?: AuthProvider;

  timeLeft = 30;
  downloadTimer: any;
  isTimerStarted = false;

  constructor(
    private dialogRef: MatDialogRef<VerifyCode>,
    @Inject(MAT_DIALOG_DATA) public data: {email: string, password: string},
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    this.email = this.data.email;
    this.password = this.data.password;
    this.verificationCode = new FormControl('');
  }

  startTimer() {
      this.isTimerStarted = true;
      this.downloadTimer = setInterval( () => {
          if (this.timeLeft === 0) {
            clearInterval(this.downloadTimer);
            this.isTimerStarted = false;
            this.timeLeft = 30;
          } else {
            this.timeLeft -= 1;
          }
      }, 1000)
  }


  onVerify() {
    this.verificationCode.setValidators(Validators.required);
    this.verificationCode.updateValueAndValidity();
    if (this.verificationCode.invalid) {
      this.verificationCode.markAllAsTouched();
      return;
    }

    const data = {
      email: this.email,
      verificationCode: this.verificationCode.value
    }
    
    this.isVerifyLoading = true;
    this.apiService.verify(data)
      .subscribe({
        next: data => {
          this.login();
        },
        error: error => {
          this.isVerifyLoading = false;
        }
      });
  }

  onResendCode() {
    this.verificationCode.clearValidators();
    this.verificationCode.updateValueAndValidity();

    this.isResendingLoading = true;
    this.startTimer();
    
    this.apiService.resend(this.email)
      .subscribe({
        next: data => {
          this.showInfoToast('new code sent');
          this.isResendingLoading = false;
        },
        error: error => {
          this.isResendingLoading = false;
        }
      });
  }

  login() {
    this.apiService.login(this.data)
      .subscribe({
        next: data => {
          const accessToken = data.token;
          if (accessToken) {
            this.authProvider = AuthProvider.local;
            this.authService.setAuthentication(accessToken);
            this.isVerifyLoading = false;
            this.onVerificationMode = false;
            this.dialogRef.close(true);
            this.router.navigate(['/dashboard/profile', this.authProvider], {state: {from: this.router.routerState.snapshot.url}});
          } else {
            this.isVerifyLoading = false;
          }
        },
        error: error => {
          this.dialogRef.close(true);
          this.showErrorToast('Authentication failed');
          this.isVerifyLoading = false;
        }
      });
  }

  showErrorToast(errorMessage: string): void {
    this.toastr.error(errorMessage, "Error");
  }

  showInfoToast(infoMessage: string): void {
    this.toastr.info(infoMessage, "Info");
  }
}
