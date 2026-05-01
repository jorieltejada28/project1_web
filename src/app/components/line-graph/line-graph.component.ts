import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-graph',
  standalone: true,
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.css'
})
export class LineGraphComponent implements AfterViewInit, OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input({ required: true }) data: any[] = [];
  @Input({ required: true }) xKey: string = '';
  @Input({ required: true }) yKey: string = '';
  @Input() title: string = '';
  @Input() height: string = '300px';
  @Input() color: string = '#570df8'; // daisyUI primary default

  private chart: Chart | undefined;

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.chart) {
      this.updateChart();
    }
  }

  private initChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.map(d => d[this.xKey]),
        datasets: [{
          data: this.data.map(d => d[this.yKey]),
          borderColor: this.color,
          backgroundColor: this.createGradient(ctx),
          fill: true,
          tension: 0.4, // Smoothing the line
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: this.color
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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

  private createGradient(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, `${this.color}33`); // 33 is hex for ~20% opacity
    gradient.addColorStop(1, 'transparent');
    return gradient;
  }
}
