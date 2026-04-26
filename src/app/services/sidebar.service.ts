import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly STORAGE_KEY = 'sidebar_state';

  isOpen = signal<boolean>(this.getInitialState());

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.isOpen()));
    });
  }

  private getInitialState(): boolean {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : true;
  }

  toggle() {
    this.isOpen.update(val => !val);
  }
}
