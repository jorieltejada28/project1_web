import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sidebarService = inject(SidebarService);

  menuItems = [
    {
      label: 'Homepage',
      iconPath: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8 M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
      route: '/home'
    },
    {
      label: 'Settings',
      iconPath: 'M20 7h-9 M14 17H5 M17 17a3 3 0 1 0-6 0 3 3 0 0 0 6 0z M7 7a3 3 0 1 0-6 0 3 3 0 0 0 6 0z',
      route: '/settings'
    }
  ];
}
