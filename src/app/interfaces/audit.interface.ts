export interface AuditLogEntry {
  id?: string | number;
  avatar?: string;
  userName: string;
  actionClass?: string;
  action: string;
  description: string;
  time: string;
}

export type AuditLog = AuditLogEntry;
