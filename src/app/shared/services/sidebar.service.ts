import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  static isOpen = new BehaviorSubject<boolean>(false);

  constructor() { }

  static open() {
    SidebarService.isOpen.next(true);
  }

  static close() {
    SidebarService.isOpen.next(false);
  }
}
