declare module Scripts {

    export interface Fullscreen {
        enterFullscreen(): void;
        exitFullscreen(): void;
        toggleFullscreen(): void;
    }

    export interface Wavesurfer {
        initMic(): void;
        startRecording(): void;
        stopRecording(): void;
        play(): void;
        stop(): void;
        getAudioUrl(): string;
    }
}

declare var Fullscreen: Scripts.Fullscreen;
declare var Wavesurfer: Scripts.Wavesurfer;