import { Injectable } from '@angular/core';

const storage = localStorage;
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public get<T>(key: string): T {
    return JSON.parse(storage.getItem(key)) as T;
  }

  public getList<T>(key: string): T[] {
    const before = storage.getItem(key);
    return before ? (JSON.parse(before) as T[]) : [];
  }

  public set(key: string, value: any): void {
    if (!value && value === undefined) {
      return;
    }
    const arr = JSON.stringify(value);
    storage.setItem(key, arr);
  }
}
