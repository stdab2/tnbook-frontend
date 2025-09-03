import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { UserProfile } from "../interfaces/user-profile";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private request(options: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return this.http.request(options.method, options.url, options)
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  getCurrentUser(): Observable<any> {
    return this.request({
      url: `${environment.apiBaseUrl}/user/me`,
      method: 'GET'
    });
  }

  signup(signupRequest: any): Observable<any> {
    return this.request({
      url: `${environment.apiBaseUrl}/auth/signup`,
      method: 'POST',
      body: JSON.stringify(signupRequest)
    });
  }

  verify(verifyRequest: any): Observable<any> {
    return this.request({
      url: `${environment.apiBaseUrl}/auth/verify`,
      method: 'POST',
      body: JSON.stringify(verifyRequest)
    });
  }

  resend(resendRequest: any): Observable<any> {
    return this.request({
      url: `${environment.apiBaseUrl}/auth/resend`,
      method: 'POST',
      body: JSON.stringify(resendRequest)
    });
  }

  login(loginRequest: any): Observable<any> {
    return this.request({
      url: `${environment.apiBaseUrl}/auth/login`,
      method: 'POST',
      body: JSON.stringify(loginRequest)
    });
  }

  getUserInfo(): Observable<UserProfile> {
    return this.request({
      url: `${environment.apiBaseUrl}/user/me`,
      method: 'GET'
    });
  }

}