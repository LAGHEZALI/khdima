import { Injectable, NgZone} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  static isMobile = new Subject<boolean>();

  static isFullScreen = false;

  static toggleFullscreen() {
    Fullscreen.toggleFullscreen();
  }

  constructor(
    private ngZone: NgZone,
  ) {
    ScreenService.isMobile.next(this.isMobile());
    this.startResizeListener();
  }

  startResizeListener() {
    window.onresize = (e) => {
      this.ngZone.run(() => {
          ScreenService.isMobile.next(this.isMobile());
      });
    };
  }

  isMobile(): boolean {
    return window.innerWidth <= 430;
  }
}
