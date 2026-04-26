import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse, UserPayload } from '../interfaces/auth.interface';

// Constants to avoid magic strings
const TOKEN_KEY = 'jwtToken';
const AUTH_ENDPOINT = '/auth';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly apiUrl = `${environment.apiUrl}${AUTH_ENDPOINT}`;

  /**
   * Send Google ID token to backend (Laravel)
   */
  async loginWithGoogle(idToken: string): Promise<AuthResponse> {
    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/google`, { idToken })
      );

      if (response?.token) {
        localStorage.setItem(TOKEN_KEY, response.token);
      }

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  /**
   * Get decoded user from JWT
   */
  get user(): UserPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<UserPayload>(token);
    } catch {
      return null;
    }
  }

  /**
   * Check if user is logged in
   */
  get isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/signin']);
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Check token expiration
   */
  isTokenExpired(token?: string | null): boolean {
    const validToken = token ?? this.getToken();
    if (!validToken) return true;

    try {
      const decoded = jwtDecode<UserPayload>(validToken);
      const expirationTime = decoded.exp * 1000;
      return Date.now() > expirationTime;
    } catch {
      return true;
    }
  }
}