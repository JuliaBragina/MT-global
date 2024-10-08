const videos = [
    './img/video4.mp4',
];

let currentVideo = 0;

function changeVideos() {
    const videoContainers = document.querySelectorAll('.main__video-container');
    videoContainers.forEach(container => {
        const video = container.querySelector('.main__video');
        video.src = videos[currentVideo];
        video.load();
        video.play();
    });

    currentVideo = (currentVideo + 1) % videos.length;
}

setInterval(changeVideos, 5000);
