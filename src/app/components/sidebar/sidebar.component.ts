import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { SigninService } from '../../services/signin.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  constructor(
    public sidebarService: SidebarService,
    private signinService: SigninService
  ) { }

  menuItems = [
    {
      label: 'Dashboard',
      iconPath: 'M3 13.125h4.5V21H3v-7.875zM8.25 6h4.5V21h-4.5V6zM13.5 10.125h4.5V21h-4.5v-10.875z',
      route: '/dashboard'
    },
    {
      label: 'Analytics',
      iconPath: 'M2.25 18L9 11.25l4.5 4.5L21.75 7.5M21.75 7.5V12m0-4.5H17.25',
      route: '/analytics'
    },
    {
      label: 'User Management',
      iconPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
      route: '/users'
    },
    {
      label: 'Settings',
      iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      route: '/settings'
    }
  ];

  handleSignOut() {
    this.signinService.logout();
  }
}
