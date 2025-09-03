import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';
import { jwtDecode } from "jwt-decode";

@Injectable({
    providedIn: 'root'
}) 
export class AuthService {

    parsedToken: any;
    authenticated: boolean = false;
    currentUser: any;

    constructor(public router: Router) {
        // Check if user is already authenticated on app startup
        this.initializeAuthState();
    }

    private initializeAuthState(): void {
        const token = this.getToken();
        if (token) {
            try {
                this.parsedToken = jwtDecode(token);
                
                const currentTime = Date.now() / 1000;

                if (this.parsedToken.exp && this.parsedToken.exp > currentTime) {
                    this.authenticated = true;
                    this.currentUser = this.parsedToken;
                } else {
                    this.clearAuthState();
                }
            } catch (error) {
                this.clearAuthState();
            }
        } else {
            console.log('No token found during initialization');
        }
    }

    getToken(): string | null {
        return localStorage.getItem(environment.accessTokenKey);
    }

    setAuthentication(accessToken: string): void {
        try {
            localStorage.setItem(environment.accessTokenKey, accessToken);
            
            this.parsedToken = jwtDecode(accessToken);
            
            const currentTime = Date.now() / 1000;
            if (this.parsedToken.exp && this.parsedToken.exp > currentTime) {
                this.authenticated = true;
                this.currentUser = this.parsedToken;
            } else {
                this.clearAuthState();
                throw new Error('Token is expired');
            }
            
        } catch (error) {
            console.error('Error setting authentication:', error);
            this.clearAuthState();
            throw error;
        }
    }

    isAuthenticated(): boolean {
        if (!this.authenticated) {
            return false;
        }

        const token = this.getToken();
        if (!token || !this.parsedToken) {
            this.authenticated = false;
            return false;
        }

        const currentTime = Date.now() / 1000;
        if (this.parsedToken.exp && this.parsedToken.exp <= currentTime) {
            this.clearAuthState();
            return false;
        }

        return true;
    }

    getCurrentUser(): any {
        return this.currentUser;
    }

    private clearAuthState(): void {
        localStorage.removeItem(environment.accessTokenKey);
        this.authenticated = false;
        this.currentUser = null;
        this.parsedToken = null;
    }

    logout(): void {
        this.clearAuthState();
        this.router.navigate(['/login']);
    }

}