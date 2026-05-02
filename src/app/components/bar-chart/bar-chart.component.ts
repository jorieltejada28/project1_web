import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges, signal } from '@angular/core';
import Chart from 'chart.js/auto';
import { LoadingChartsComponent } from '../loading-charts/loading-charts.component';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [LoadingChartsComponent],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input({ required: true }) data: any[] = [];
  @Input({ required: true }) xKey: string = '';
  @Input({ required: true }) yKey: string = '';
  @Input() title: string = '';
  @Input() height: string = '300px';
  @Input() color: string = '#570df8';

  isLoading = signal(true);

  private chart: Chart | undefined;

  ngAfterViewInit() {
    setTimeout(() => this.initChart(), 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.chart) {
      this.isLoading.set(true);
      this.updateChart();
    }
  }

  private initChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar', // Changed from 'line' to 'bar'
      data: {
        labels: this.data.map(d => d[this.xKey]),
        datasets: [{
          data: this.data.map(d => d[this.yKey]),
          backgroundColor: this.color, // Bars usually look better with solid colors
          borderRadius: 6, // Gives bars a modern rounded look
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animations: {
          update: {
            duration: 800,
            easing: 'easeOutQuart'
          }
        },
        animation: {
          onComplete: () => this.isLoading.set(false)
        },
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
          y: { grid: { color: 'rgba(156, 163, 175, 0.1)' }, ticks: { color: '#9ca3af' } }
        }
      }
    });
  }

  private updateChart() {
    if (!this.chart) return;
    this.chart.data.labels = this.data.map(d => d[this.xKey]);
    this.chart.data.datasets[0].data = this.data.map(d => d[this.yKey]);
    this.chart.update();
  }
}
