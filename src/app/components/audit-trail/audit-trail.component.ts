import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditLogEntry } from '../../interfaces/audit.interface';

@Component({
  selector: 'app-audit-trail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-trail.component.html'
})
export class AuditTrailComponent {
  private readonly _auditLogs = signal<AuditLogEntry[]>([]);

  @Input({ required: true })
  set auditLogs(value: AuditLogEntry[]) {
    this._auditLogs.set(value ?? []);
    this.modalPage.set(1);
  }

  get auditLogs(): AuditLogEntry[] {
    return this._auditLogs();
  }

  readonly displayLogs = computed(() => this._auditLogs().slice(0, 7));

  readonly isModalOpen = signal(false);
  readonly modalPage = signal(1);
  readonly pageSize = 10;

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this._auditLogs().length / this.pageSize)));

  readonly paginatedModalLogs = computed(() => {
    const logs = this._auditLogs();
    const start = (this.modalPage() - 1) * this.pageSize;
    return logs.slice(start, start + this.pageSize);
  });

  readonly modalRange = computed(() => {
    const logs = this._auditLogs();
    const total = logs.length;
    const start = total ? (this.modalPage() - 1) * this.pageSize + 1 : 0;
    const end = total ? Math.min(this.modalPage() * this.pageSize, total) : 0;
    return { start, end, total };
  });

  openModal() {
    this.modalPage.set(1);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  nextPage() {
    if (this.modalPage() < this.totalPages()) {
      this.modalPage.update((page) => page + 1);
    }
  }

  prevPage() {
    if (this.modalPage() > 1) {
      this.modalPage.update((page) => page - 1);
    }
  }

  trackByLog(index: number, log: AuditLogEntry): string | number {
    return log.id ?? index;
  }
}
