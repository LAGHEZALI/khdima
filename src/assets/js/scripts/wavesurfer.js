class Wavesurfer {

    static wavesurfer;

    static initMic() {
        
        WaveSurfer.wavesurfer = WaveSurfer.create({
            container     : '#wavemic',
            waveColor     : 'black',
            interact      : false,
            cursorWidth   : 0,
            plugins: [
              WaveSurfer.microphone.create()
            ]
        });

        WaveSurfer.wavesurfer.microphone.on('deviceReady', function(stream) {
            console.log('Device ready!', stream);
        });
        WaveSurfer.wavesurfer.microphone.on('deviceError', function(code) {
            console.warn('Device error: ' + code);
        });
    }

    static record() {
        // start the microphone
        console.warn('al7waaa');
    }
}