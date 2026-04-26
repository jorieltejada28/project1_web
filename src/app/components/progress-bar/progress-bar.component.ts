import { Component, inject, Input } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent {
  loadingService = inject(LoadingService);
  @Input() visible: boolean = false;
}
