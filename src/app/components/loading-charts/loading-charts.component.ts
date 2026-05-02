import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-charts',
  imports: [CommonModule],
  templateUrl: './loading-charts.component.html',
  styleUrl: './loading-charts.component.css',
})
export class LoadingChartsComponent {
  @Input({ required: true }) isLoading = false;
  @Input() height: string = '300px';
}
