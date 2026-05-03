import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audit-trail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-trail.component.html'
})
export class AuditTrailComponent {
  @Input({ required: true }) auditLogs: any[] = [];

  // Dashboard view: strictly the first 7 logs
  displayLogs = computed(() => this.auditLogs.slice(0, 7));

  protected readonly Math = Math;
  
  // Modal Pagination State
  isModalOpen = signal(false);
  modalPage = signal(1);
  pageSize = 10;

  totalPages = computed(() => Math.ceil(this.auditLogs.length / this.pageSize));

  // Sliced logs for the modal view
  paginatedModalLogs = computed(() => {
    const start = (this.modalPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.auditLogs.slice(start, end);
  });

  openModal() {
    this.modalPage.set(1); // Reset to page 1 when opening
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  nextPage() {
    if (this.modalPage() < this.totalPages()) this.modalPage.update(p => p + 1);
  }

  prevPage() {
    if (this.modalPage() > 1) this.modalPage.update(p => p - 1);
  }
}
