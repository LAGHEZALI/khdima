import { Injectable } from '@angular/core';
import { ScreenService } from './screen.service';
import { LoadingService } from './loading.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private screen: ScreenService,
    private loading: LoadingService,
    private theme: ThemeService
  ) {
  }
}
