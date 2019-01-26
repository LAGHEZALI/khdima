import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadsService } from 'src/app/shared/services/uploads.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit, AfterViewInit {

  isRecording = false;
  isPlaying = false;
  readyToPlay = false;
  recIcon = 'microphone';
  playIcon = 'play';

  recColor = 'primary';
  playColor = 'accent';
  stopColor = 'accent';

  old = false;

  constructor(
    public dialogRef: MatDialogRef<RecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadService: UploadsService
  ) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('audioUrl')) {
      this.recIcon = 'microphone';
      this.readyToPlay = true;
      this.recColor = 'primary';
      this.playColor = 'primary';
      this.old = true;
    }
  }

  ngAfterViewInit(): void {
    Wavesurfer.initMic();
  }

  record() {
    if (!this.isRecording) {
      Wavesurfer.startRecording();
      this.recIcon = 'microphone-slash';
      this.recColor = 'accent';
    } else {
      Wavesurfer.stopRecording();
      this.recIcon = 'microphone';
      this.readyToPlay = true;
      this.recColor = 'primary';
      this.playColor = 'primary';
    }
    this.isRecording = !this.isRecording;
  }

  play() {
    if (!this.isPlaying) {
      this.playIcon = 'pause';
      this.playColor = 'accent';
      this.stopColor = 'primary';
    } else {
      this.playIcon = 'play';
      this.playColor = 'primary';
      this.stopColor = 'primary';
    }
    Wavesurfer.play();
    this.isPlaying = !this.isPlaying;
  }

  stop() {
    this.isPlaying = false;
    this.playIcon = 'play';
    this.stopColor = 'accent';
    this.playColor = 'primary';
    Wavesurfer.stop();
  }

  save() {
    sessionStorage.setItem('audioUrl', Wavesurfer.getAudioUrl());
    this.uploadService.recordUrl = Wavesurfer.getAudioUrl();
    this.dialogRef.close();
  }

  erase() {
    sessionStorage.clear();
    this.uploadService.recordUrl = '';
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
