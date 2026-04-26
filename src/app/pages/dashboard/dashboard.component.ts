import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainComponent } from '../../layouts/main/main.component';
import { SigninService } from '../../services/signin.service'; // Adjust path if necessary

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MainComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // Injecting dependencies using the inject() function
  private signinService = inject(SigninService);
  private router = inject(Router);

  // You can store the user profile here to display their name/email in the UI
  userProfile: any = null;

  ngOnInit(): void {
    // 1. Security Check: If not logged in, boot them to sign-in
    if (!this.signinService.isLoggedIn) {
      this.router.navigate(['/signin']);
      return;
    }

    // 2. Load user data from the decoded JWT
    this.userProfile = this.signinService.user;
  }

  /**
   * Handles the logout process
   */
  handleSignOut(): void {
    this.signinService.logout();
    // The service handles the removal of the token and navigation
  }
}