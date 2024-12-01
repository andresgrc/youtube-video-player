let youtubePlayer;
const videoUrlInput = document.getElementById('video-url');
const loadVideoBtn = document.getElementById('load-video-btn');

// Initialize YouTube Player
window.onYouTubeIframeAPIReady = function () {
    youtubePlayer = new YT.Player('video-player', {
        height: '360',
        width: '640',
        playerVars: { autoplay: 0, controls: 1 },
        events: {
            onReady: () => console.log('YouTube Player is ready'),
            onStateChange: handlePlayerStateChange,
        },
    });
};

// Handle Player State Changes
function handlePlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        console.log('Video is playing');
    } else if (event.data === YT.PlayerState.PAUSED) {
        console.log('Video is paused');
    } else if (event.data === YT.PlayerState.ENDED) {
        console.log('Video has ended');
    }
}

// Load Video on Button Click
loadVideoBtn.addEventListener('click', () => {
    const url = videoUrlInput.value.trim();
    const videoId = extractVideoId(url);
    if (videoId) {
        youtubePlayer.loadVideoById(videoId);
        console.log(`Loading video with ID: ${videoId}`);
    } else {
        alert('Invalid YouTube URL. Please enter a valid URL.');
    }
});

// Extract Video ID from YouTube URL
function extractVideoId(url) {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\s]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Debugging Helper
function logPlayerState() {
    if (youtubePlayer) {
        const state = youtubePlayer.getPlayerState();
        console.log('Player State:', state);
    } else {
        console.error('YouTube Player is not initialized.');
    }
}
