import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { AuthProvider } from "../../core/enum/auth-provider";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-oauth2-redirect-handler',
  imports: [],
  templateUrl: './oauth2-redirect-handler.html',
  styleUrl: './oauth2-redirect-handler.css'
})
export class Oauth2RedirectHandler implements OnInit {
  private destroyRef = inject(DestroyRef);
  
  token?: string;
  error?: string;
  authProvider: AuthProvider = AuthProvider.provider;
  isSignup!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('OAuth2RedirectHandler initialized');
    console.log('Current URL:', this.router.url);
    console.log('Route snapshot:', this.route.snapshot);
    if(this.router.url.includes('signup')) {
      this.isSignup = true;
      console.log('is signing up: ', this.isSignup);
    } else {
      this.isSignup = false;
      console.log('is not signing up: ', this.isSignup);
    }
    
    this.processOAuth2Callback();
  }

  private processOAuth2Callback(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const provider = params.get('provider');
        if (provider) {
          this.authProvider = provider as AuthProvider;
          console.log('Provider:', this.authProvider);
        }
      });

    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        console.log(params);
        this.token = params['token'];
        this.error = params['error'];

        this.handleAuthCallback();
      });
  }

  private handleAuthCallback(): void {
    if (this.token) {
      this.handleAuthSuccess();
    } else if (this.error) {
      this.handleAuthError();
    } else {
      this.handleUnknownError();
    }
  }

  private handleAuthSuccess(): void {
    try {
      this.authService.isAuthenticated();
      
      this.authService.setAuthentication(this.token!);

      this.authService.isAuthenticated();
      
      console.log('Current user:', this.authService.getCurrentUser());
      
      this.toastrService.success('Login successful!', 'Welcome');
      
      // Wait for authentication to be fully processed
      setTimeout(() => {
        this.router.navigate(
          ['/dashboard/profile', this.authProvider],
          { 
            state: { 
              from: this.router.routerState.snapshot.url,
              loginMethod: 'oauth2',
              provider: this.authProvider 
            }
          }
        ).then(success => {
          if (!success) {
            this.router.navigate(['/dashboard']);
          }
        }).catch(error => {
          this.router.navigate(['/dashboard']);
        });
      }, 300);
      
    } catch (error) {
      this.toastrService.error('Failed to process login', 'Authentication Error');
      this.redirectToLogin('Token processing failed');
    }
  }

  private handleAuthError(): void {
    const errorMessage = this.getUserFriendlyErrorMessage(this.error!);
    this.toastrService.error(errorMessage, 'Login Failed');
    this.redirectToLogin(this.error!);
  }

  private handleUnknownError(): void {
    const errorMessage = 'No authentication token or error information received';
    this.toastrService.error('Authentication failed', 'Login Error');
    this.redirectToLogin(errorMessage);
  }

  private redirectToLogin(error: string): void {
    setTimeout(() => {
      this.router.navigate(['/login'], { 
        state: { 
          from: this.router.routerState.snapshot.url, 
          error: error,
          provider: this.authProvider 
        }
      });
    }, 2000);
  }

  private getUserFriendlyErrorMessage(error: string): string {
    switch (error?.toLowerCase()) {
      case 'access_denied':
        return 'Login was cancelled. Please try again if you want to sign in.';
      case 'unauthorized_client':
        return 'Application is not authorized for this login method.';
      case 'invalid_request':
        return 'Invalid login request. Please try again.';
      case 'server_error':
        return 'Server error occurred during login. Please try again later.';
      case 'temporarily_unavailable':
        return 'Login service is temporarily unavailable. Please try again later.';
      default:
        return `Login failed: ${error}`;
    }
  }
}
