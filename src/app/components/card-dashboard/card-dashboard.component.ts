import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStat } from '../../interfaces/stat.interface';

@Component({
  selector: 'app-card-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-dashboard.component.html',
  styleUrl: './card-dashboard.component.css',
})
export class CardDashboardComponent {
  @Input({ required: true }) stats: DashboardStat[] = [];
}
