import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  static data = new BehaviorSubject<{}>({
    isLoading: false,
    message: '',
    uploadPerc: 0
  });

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          LoadingService.on();
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          LoadingService.off();
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  static on() {
    LoadingService.data.next({
      isLoading: true,
      message: 'Loading...',
      uploadPerc: 0
    });
  }

  static update(message: string, uploadPerc: number) {
    LoadingService.data.next({
      isLoading: true,
      message: message,
      uploadPerc: uploadPerc
    });
  }

  static off() {
    LoadingService.data.next({
      isLoading: false,
      message: '',
      uploadPerc: 0
    });
  }
}
