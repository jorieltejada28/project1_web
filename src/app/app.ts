import {
  Component,
  inject,
  signal
} from '@angular/core';
import {
  RouterOutlet,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { LoadingService } from './services/loading.service';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');

  private router = inject(Router);
  public loadingService = inject(LoadingService);
  private isInitialLoad = true;

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!this.isInitialLoad) {
          this.loadingService.isLoading.set(true);
        }
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loadingService.isLoading.set(false);
        this.isInitialLoad = false; // After the first navigation ends, allow future loads
      }
    });
  }
}
