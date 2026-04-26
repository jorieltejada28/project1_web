import { Component, inject, OnInit, NgZone } from '@angular/core';
import { MainComponent } from '../../layouts/main/main.component';
import { SigninService } from '../../services/signin.service';
import { Router } from '@angular/router';
import { GoogleCredentialResponse, GoogleCodeResponse } from '../../interfaces/auth.interface';
import { LoadingService } from '../../services/loading.service';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = '465132550032-li26na1kcldeeu8l6004cbscj4hirh9i.apps.googleusercontent.com';
const REDIRECT_ROUTE = '/dashboard';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MainComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  private signinService = inject(SigninService);
  private router = inject(Router);
  private ngZone = inject(NgZone);
  protected loadingService = inject(LoadingService);

  ngOnInit(): void {
    if (this.signinService.isLoggedIn) {
      this.router.navigate([REDIRECT_ROUTE]);
      return;
    }
    this.initializeGoogleSignIn();
  }

  private initializeGoogleSignIn(): void {
    if (this.isGoogleLoaded()) {
      this.setupGoogleIdProvider();
    }
  }

  private isGoogleLoaded(): boolean {
    // @ts-ignore
    return typeof google !== 'undefined' && google.accounts?.id != null;
  }

  private setupGoogleIdProvider(): void {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response: GoogleCredentialResponse) => this.handleCredentialResponse(response),
      use_fedcm: true,
      itp_support: true,
    });
  }

  handleGoogleLogin(): void {
    if (!this.isGoogleOAuthLoaded()) {
      console.warn('Google OAuth not loaded');
      return;
    }

    // @ts-ignore
    const client = google.accounts.oauth2.initCodeClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'openid profile email',
      ux_mode: 'popup',
      callback: (response: GoogleCodeResponse) => {
        if (response.code) {
          this.handleCredentialResponse({ credential: response.code });
        }
      },
    });

    client.requestCode();
  }

  private isGoogleOAuthLoaded(): boolean {
    // @ts-ignore
    return typeof google !== 'undefined' && google.accounts?.oauth2 != null;
  }

  private handleCredentialResponse(response: GoogleCredentialResponse | GoogleCodeResponse): void {
    const idToken = (response as GoogleCredentialResponse).credential
                  ?? (response as GoogleCodeResponse).code;

    if (idToken) {
      // Start loading when sending to backend
      this.loadingService.isLoading.set(true);
      this.authenticateWithBackend(idToken);
    } else {
      console.error('No valid token or code received from Google');
    }
  }

  private async authenticateWithBackend(idToken: string): Promise<void> {
    try {
      const result = await this.signinService.loginWithGoogle(idToken);
      if (result) {
        this.loadingService.isLoading.set(false);
        this.ngZone.run(() => {
          this.router.navigate([REDIRECT_ROUTE]);
        });
      } else {
        this.loadingService.isLoading.set(false);
      }
    } catch (error) {
      console.error('Backend authentication failed:', error);
      this.loadingService.isLoading.set(false);
    }
  }
}
