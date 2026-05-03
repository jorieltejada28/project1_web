import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audit-trail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-trail.component.html',
  styleUrl: './audit-trail.component.css',
})
export class AuditTrailComponent {
  @Input({ required: true }) auditLogs: AuditLog[] = [];
}
