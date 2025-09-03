import {Component, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {RouterOutlet} from "@angular/router";
import {ApiService} from "../../core/services/api.service";
import {AuthService} from "../../core/services/auth.service";
import {catchError, EMPTY, tap} from "rxjs";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-dashboard',
  imports: [
    MatToolbar,
    MatIcon,
    RouterOutlet,
    MatIconButton
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  constructor(
    private apiService: ApiService,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.loadCurrentlyLoggedInUser();
  }

  loadCurrentlyLoggedInUser() {
    this.apiService.getCurrentUser()
      .pipe(
        tap(response => {
          this.authService.authenticated = true;
        }),
        catchError(err => {
          return EMPTY;
        })
      )
  }

}
