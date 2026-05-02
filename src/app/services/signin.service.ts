import { Injectable, inject, signal, computed } from '@angular/core';
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
  private logoutTimer: any;

  private readonly apiUrl = `${environment.apiUrl}${AUTH_ENDPOINT}`;

  // Reactive token signal
  private tokenSignal = signal<string | null>(this.getStoredToken());

  /**
   * Computed logged in state - updates automatically when token changes
   */
  readonly isLoggedInSignal = computed(() => {
    const token = this.tokenSignal();
    return !!token && !this.isTokenExpired(token);
  });

  constructor() {
    const token = this.getStoredToken();

    if (token && !this.isTokenExpired(token)) {
      this.scheduleAutoLogout(token);
    }
  }

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
        this.tokenSignal.set(response.token);
        this.scheduleAutoLogout(response.token);
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
    const token = this.tokenSignal();
    if (!token) return null;

    try {
      return jwtDecode<UserPayload>(token);
    } catch {
      return null;
    }
  }

  /**
   * Check if user is logged in (backward compatibility)
   */
  get isLoggedIn(): boolean {
    return this.isLoggedInSignal();
  }

  /**
   * Logout user
   */
  logout(): void {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }

    localStorage.removeItem(TOKEN_KEY);
    this.tokenSignal.set(null);
    this.router.navigate(['/signin']);
  }

  /**
   * Get stored token
   */
  private getStoredToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Get token
   */
  getToken(): string | null {
    return this.tokenSignal();
  }

  /**
   * Check token expiration
   */
  isTokenExpired(token?: string | null): boolean {
    const validToken = token ?? this.tokenSignal();
    if (!validToken) return true;

    try {
      const decoded = jwtDecode<UserPayload>(validToken);
      const expirationTime = decoded.exp * 1000;
      return Date.now() > expirationTime;
    } catch {
      return true;
    }
  }

  private scheduleAutoLogout(token: string): void {
    try {
      const decoded = jwtDecode<UserPayload>(token);

      const expirationTime = decoded.exp * 1000;
      const timeout = expirationTime - Date.now();

      if (timeout <= 0) {
        this.logout();
        return;
      }

      this.logoutTimer = setTimeout(() => {
        this.logout();
      }, timeout);

    } catch {
      this.logout();
    }
  }
}
