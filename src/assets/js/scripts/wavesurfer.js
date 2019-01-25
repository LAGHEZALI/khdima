class Wavesurfer {

    static initMic() {

        WaveSurfer.wavesurfer;
        WaveSurfer.mediaRecorder;
        WaveSurfer.audioUrl = '';
        
        if (sessionStorage.getItem('audioUrl')) {
            WaveSurfer.wavesurfer = WaveSurfer.create({
                container: '#mic',
                waveColor: '#666',
                progressColor: '#e65100',
                height: 50,
                responsive: true
            });
            WaveSurfer.wavesurfer.load(sessionStorage.getItem('audioUrl'));
        }
    }

    static startRecording() {

        WaveSurfer.wavesurfer = WaveSurfer.create({
            container     : '#mic',
            interact      : false,
            cursorWidth   : 0,
            waveColor: '#e65100',
            height: 50,
            responsive: true,
            plugins: [
              WaveSurfer.microphone.create()
            ]
        });

        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            
            WaveSurfer.mediaRecorder = new MediaRecorder(stream);
            WaveSurfer.mediaRecorder.start();
            
            const audioChunks = [];
            WaveSurfer.mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            WaveSurfer.mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, {type : 'audio/mp3'});
                WaveSurfer.audioUrl = URL.createObjectURL(audioBlob);

                WaveSurfer.wavesurfer = WaveSurfer.create({
                    container: '#mic',
                    waveColor: '#666',
                    progressColor: '#e65100',
                    height: 50,
                    responsive: true
                    });
                WaveSurfer.wavesurfer.load(WaveSurfer.audioUrl);
            });
        });

        WaveSurfer.wavesurfer.microphone.start();
    }

    static stopRecording() {
        WaveSurfer.wavesurfer.microphone.stop();
        WaveSurfer.mediaRecorder.stop();
    }

    static play() {
        WaveSurfer.wavesurfer.playPause();
    }

    static stop() {
        WaveSurfer.wavesurfer.stop();
    }

    static getAudioUrl() {
        return WaveSurfer.audioUrl;
    }
}