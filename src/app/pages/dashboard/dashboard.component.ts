import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Required for certain pipe/utility features
import { MainComponent } from '../../layouts/main/main.component';
import { SigninService } from '../../services/signin.service';
import { LineGraphComponent } from '../../components/line-graph/line-graph.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { DonutChartComponent } from '../../components/donut-chart/donut-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
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

  // Chart Data
  userTrends: any[] = [];
  revenueData: any[] = [];
  browserData: any[] = [];

  public stats = [
    {
      title: 'Total Users',
      value: '12,482',
      trend: '+12% from last month',
      colorClass: 'text-primary'
    },
    {
      title: 'Active Sessions',
      value: '1,204',
      trend: 'Live right now',
      colorClass: 'text-secondary'
    }
  ];

  // Audit Trail Data
  auditLogs: AuditLog[] = [];

  ngOnInit(): void {
    if (!this.signinService.isLoggedIn) {
      this.router.navigate(['/signin']);
      return;
    }

    this.userProfile = this.signinService.user;

    // Load Dashboard Data
    this.loadDummyData();
  }

  private loadDummyData(): void {
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

    // Initiate Audit Trail Data
    this.auditLogs = [
      {
        userName: 'Admin User',
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff',
        action: 'Login',
        actionClass: 'primary',
        description: 'Successfully authenticated from IP 192.168.1.1',
        time: '2 mins ago'
      },
      {
        userName: 'John Doe',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=7c3aed&color=fff',
        action: 'Export',
        actionClass: 'secondary',
        description: 'Exported User_Report.csv to local storage.',
        time: '1 hour ago'
      },
      {
        userName: 'Sarah Smith',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=f471b5&color=fff',
        action: 'Update',
        actionClass: 'accent',
        description: 'Modified user permissions for "Moderator" role.',
        time: '2 hours ago'
      },
      {
        userName: 'System Bot',
        avatar: 'https://ui-avatars.com/api/?name=SB&background=1fb2a6&color=fff',
        action: 'Backup',
        actionClass: 'info',
        description: 'Automated cloud backup completed successfully.',
        time: '5 hours ago'
      },
      {
        userName: 'Michael Chen',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=3b82f6&color=fff',
        action: 'Create',
        actionClass: 'primary',
        description: 'Created a new API key for the production environment.',
        time: '6 hours ago'
      },
      {
        userName: 'Emma Wilson',
        avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=ef4444&color=fff',
        action: 'Delete',
        actionClass: 'error',
        description: 'Removed inactive user account: user_9928.',
        time: '8 hours ago'
      },
      {
        userName: 'Database Manager',
        avatar: 'https://ui-avatars.com/api/?name=DB&background=f59e0b&color=fff',
        action: 'Optimize',
        actionClass: 'warning',
        description: 'Ran indexing optimization on the "registrations" table.',
        time: '10 hours ago'
      },
      {
        userName: 'Liam Garcia',
        avatar: 'https://ui-avatars.com/api/?name=Liam+Garcia&background=10b981&color=fff',
        action: 'Upload',
        actionClass: 'success',
        description: 'Uploaded new brand assets to the global CDN.',
        time: '12 hours ago'
      },
      {
        userName: 'Security Bot',
        avatar: 'https://ui-avatars.com/api/?name=Security&background=6366f1&color=fff',
        action: 'Block',
        actionClass: 'error',
        description: 'Automatically blocked IP 185.22.1.4 after 5 failed login attempts.',
        time: '14 hours ago'
      },
      {
        userName: 'Sophia Rodriguez',
        avatar: 'https://ui-avatars.com/api/?name=Sophia+R&background=ec4899&color=fff',
        action: 'Review',
        actionClass: 'accent',
        description: 'Approved 15 pending user registration requests.',
        time: '18 hours ago'
      },
      {
        userName: 'Noah Thompson',
        avatar: 'https://ui-avatars.com/api/?name=Noah+T&background=06b6d4&color=fff',
        action: 'Deploy',
        actionClass: 'info',
        description: 'Deployed version v2.4.1 to the staging server.',
        time: '1 day ago'
      },
      {
        userName: 'Olivia Martinez',
        avatar: 'https://ui-avatars.com/api/?name=Olivia+M&background=8b5cf6&color=fff',
        action: 'Patch',
        actionClass: 'secondary',
        description: 'Applied critical security patch to the auth middleware.',
        time: '1 day ago'
      },
      {
        userName: 'James Lee',
        avatar: 'https://ui-avatars.com/api/?name=James+Lee&background=22c55e&color=fff',
        action: 'Connect',
        actionClass: 'success',
        description: 'Successfully integrated Stripe Webhook listener.',
        time: '2 days ago'
      },
      {
        userName: 'System Monitor',
        avatar: 'https://ui-avatars.com/api/?name=Monitor&background=64748b&color=fff',
        action: 'Restart',
        actionClass: 'warning',
        description: 'PM2 process "api-gateway" restarted due to memory leak.',
        time: '2 days ago'
      }
    ];
  }
}
