import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslationService } from './../../../shared/pipes/translation.service';
import * as WaveSurfer from 'wavesurfer.js';

let wavesurfer: WaveSurfer = Object.create(WaveSurfer);

@Component({
  selector: 'app-wavesurfer',
  templateUrl: './wavesurfer.component.html',
  styleUrls: ['./wavesurfer.component.scss']
})
export class WavesurferComponent implements OnInit {

  btn = 'play';
  btnPlayColor = 'primary';
  btnStopColor = 'accent';

  constructor(private translationService: TranslationService,
    public dialogRef: MatDialogRef<WavesurferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
  }

  ngOnInit() {
    this.initWaveSurfer();
  }

  initWaveSurfer() {
    wavesurfer = WaveSurfer.create({
      container: `#waveform`,
      waveColor: '#666',
      progressColor: '#e65100',
      responsive: true
    });
    wavesurfer.load(this.data);
  }

  play() {
    wavesurfer.playPause();
    this.btn = this.btn === 'play'  ? 'pause' : 'play';
    this.btnPlayColor = 'primary' ? 'accent' : 'primary';
    this.btnStopColor = 'primary';
  }

  stop() {
    wavesurfer.stop();
    this.btn = 'play';
    this.btnPlayColor = 'primary';
    this.btnStopColor = 'accent';
  }

  close(): void {
    wavesurfer.stop();
    this.dialogRef.close();
  }

}
