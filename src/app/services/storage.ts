import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  setLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getLocalStorage(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }}