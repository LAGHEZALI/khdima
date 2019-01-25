declare module Scripts {

    export interface Fullscreen {
        enterFullscreen(): void;
        exitFullscreen(): void;
        toggleFullscreen(): void;
    }

    export interface Wavesurfer {
        initMic(): void;
        record(): void;
    }
}

declare var Fullscreen: Scripts.Fullscreen;
declare var Wavesurfer: Scripts.Wavesurfer;