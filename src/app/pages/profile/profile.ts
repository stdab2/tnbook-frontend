import { Component, OnInit } from '@angular/core';
import { UserProfile } from "../../core/interfaces/user-profile";
import { AuthProvider } from "../../core/enum/auth-provider";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "../../core/services/api.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  authProvider: AuthProvider = AuthProvider.provider;
  token!: string;
  userInfo!: UserProfile;

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.authProvider = params.get('authProvider') as AuthProvider;
    });

    let item = localStorage.getItem(environment.accessTokenKey);
    if (item) {
      this.token = item;

      this.apiService.getUserInfo()
        .subscribe({
          next: (data) => {
            console.log(JSON.stringify(data));
            this.userInfo = data;
          },
          error: (error) => {
            this.toastrService.error(JSON.stringify(error.error.message, null, '\t'));
          }
        })
    } else {
      this.authService.logout();
    }
  }

  getAuthProviderDisplayName(authProvider: AuthProvider): string {
    switch (authProvider) {
      case AuthProvider.google:
        return 'Google';
      case AuthProvider.local:
        return 'Email/Password';
      default:
        return 'Unknown';
    }
  }

}
