import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges, signal } from '@angular/core';
import Chart from 'chart.js/auto';
import { LoadingChartsComponent } from '../loading-charts/loading-charts.component';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [LoadingChartsComponent],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.css',
})
export class DonutChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input({ required: true }) data: any[] = [];
  @Input({ required: true }) labelKey: string = '';
  @Input({ required: true }) valueKey: string = '';
  @Input() title: string = '';
  @Input() height: string = '300px';

  // Soft, professional tones (Indigo, Teal, Violet, Rose, Sky)
  @Input() colors: string[] = ['#6366f1', '#2dd4bf', '#8b5cf6', '#fb7185', '#38bdf8'];

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
      type: 'doughnut',
      data: {
        labels: this.data.map(d => d[this.labelKey]),
        datasets: [{
          data: this.data.map(d => d[this.valueKey]),
          backgroundColor: this.colors,
          hoverOffset: 12,
          borderWidth: 0,
          spacing: 5
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
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              color: '#9ca3af',
              padding: 20,
              font: { size: 11, weight: 500 }
            }
          }
        }
      }
    });
  }

  private updateChart() {
    if (!this.chart) return;
    this.chart.data.labels = this.data.map(d => d[this.labelKey]);
    this.chart.data.datasets[0].data = this.data.map(d => d[this.valueKey]);
    this.chart.update();
  }
}
