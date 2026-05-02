import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainComponent } from '../../layouts/main/main.component';
import { SigninService } from '../../services/signin.service';
import { LineGraphComponent } from '../../components/line-graph/line-graph.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { DonutChartComponent } from '../../components/donut-chart/donut-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MainComponent,
    LineGraphComponent,
    BarChartComponent,
    DonutChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private signinService = inject(SigninService);
  private router = inject(Router);

  userProfile: any = null;

  // Line Graph Properties
  userTrends: any[] = [];
  revenueData: any[] = [];
  browserData: any[] = [];

  ngOnInit(): void {
    if (!this.signinService.isLoggedIn) {
      this.router.navigate(['/signin']);
      return;
    }

    this.userProfile = this.signinService.user;

    // Initiate Dummy Data
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

    this.browserData = [
      { browser: 'Chrome', users: 4500 },
      { browser: 'Safari', users: 2100 },
      { browser: 'Firefox', users: 1200 },
      { browser: 'Edge', users: 800 },
      { browser: 'Other', users: 400 }
    ];
  }
}
