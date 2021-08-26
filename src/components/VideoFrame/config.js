export default {
  script: '/videoJs/video.min.js',
  link: '/videoJs/video-js.min.css',
  options: {
    autoplay: false,
    controls: true,
    muted: false,
    bigPlayButton: true,
    textTrackDisplay: false,
    posterImage: false,
    errorDisplay: false,
    fullscreen: {
      options: { navigationUI: 'hide' }
    }
  }
};
