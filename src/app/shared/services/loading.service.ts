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

  static isLoading = new BehaviorSubject<boolean>(false);
  static message: string;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          LoadingService.on('Loading ...');
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

  static on(message: string) {
    LoadingService.message = message;
    LoadingService.isLoading.next(true);
  }

  static off() {
    LoadingService.message = null;
    LoadingService.isLoading.next(false);
  }
}
