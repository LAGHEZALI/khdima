declare module Scripts {

    export interface Fullscreen {
        enterFullscreen(): void;
        exitFullscreen(): void;
        toggleFullscreen(): void;
    }
}

declare var Fullscreen: Scripts.Fullscreen;