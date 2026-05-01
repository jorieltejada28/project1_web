import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainComponent } from '../../layouts/main/main.component';
import { SigninService } from '../../services/signin.service'; // Adjust path if necessary
import { LineGraphComponent } from '../../components/line-graph/line-graph.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MainComponent, LineGraphComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private signinService = inject(SigninService);
  private router = inject(Router);

  userProfile: any = null;

  // 1. Define the missing properties
  userTrends: any[] = [];
  revenueData: any[] = [];

  ngOnInit(): void {
    if (!this.signinService.isLoggedIn) {
      this.router.navigate(['/signin']);
      return;
    }

    this.userProfile = this.signinService.user;

    // 2. Initialize with data (In a real app, you'd fetch this from a service)
    this.userTrends = [
      { date: '2024-05-01', total: 10 },
      { date: '2024-05-02', total: 25 },
      { date: '2024-05-03', total: 15 },
      { date: '2024-05-04', total: 45 },
      { date: '2024-05-05', total: 30 },
    ];

    this.revenueData = [
      { month: 'Jan', amount: 1200 },
      { month: 'Feb', amount: 2100 },
      { month: 'Mar', amount: 800 },
      { month: 'Apr', amount: 1600 },
    ];
  }
}
