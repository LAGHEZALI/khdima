import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

import * as WaveSurfer from 'wavesurfer.js';

let wavesurfer: WaveSurfer = Object.create(WaveSurfer);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  btn = 'play_arrow';

  constructor() { }

  ngOnInit() {



    wavesurfer = WaveSurfer.create({
      container: `#waveform`,
      waveColor: '#666',
      progressColor: '#e65100',
      height: 50,
      responsive: true
    });
    wavesurfer.load('assets/audio/dari.mp3');
  }

  ngAfterViewInit(): void {
  }

  on() {
    LoadingService.on('Loading ...');
  }

  off() {
    LoadingService.off();
  }



  play() {
    wavesurfer.playPause();
    this.btn = this.btn === 'play_arrow'  ? 'pause' : 'play_arrow';
  }

  stop() {
    wavesurfer.stop();
    this.btn = 'play_arrow';
  }


}
