// --- Elements Select Kar Rahe Hain ---
const audio = document.getElementById('myAudio');
const playPauseBtn = document.querySelector('.play-icon');
const progressBar = document.querySelector('.progress-bar');
const currTimeDisplay = document.querySelector('.curr-time');
const totTimeDisplay = document.querySelector('.tot-time');
const volumeBar = document.querySelector('.volume-bar');

// Naye Elements (Next, Prev, Title, Image ke liye)
const prevBtn = document.querySelector('.fa-backward-step');
const nextBtn = document.querySelector('.fa-forward-step');
const titleDisplay = document.querySelector('.album-title');
const artistDisplay = document.querySelector('.album-artist');
const coverImage = document.querySelector('.album-img');


const songs = [
    {
        title: "Daylight",
        artist: "Kishore Kumar",
        img: "assets/daylight.jpeg", 
        path: "assets/song4.mp3"      
    },
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        img: "assets/img-1.jpeg",
        path: "assets/song2.mp3"
    },
    {
        title: "Tum Hi Ho",
        artist: "Arijit Singh",
        img: "assets/img-9.jpg",
        path: "assets/song3.mp3"
    },
    {
        title: "Saiyara",
        artist: "Sachet Tandon, Parampara Thakur",
        img: "assets/img-6.jpeg",
        path: "assets/saiyara.mp3"
    }

];

let songIndex = 0; 
let isPlaying = false;

function loadSong(song) {
    titleDisplay.innerText = song.title;     
    artistDisplay.innerText = song.artist;   
    coverImage.src = song.img;               
    audio.src = song.path;                   
}


loadSong(songs[songIndex]);


function playSong() {
    isPlaying = true;
    playPauseBtn.classList.remove('fa-circle-play');
    playPauseBtn.classList.add('fa-circle-pause');
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playPauseBtn.classList.remove('fa-circle-pause');
    playPauseBtn.classList.add('fa-circle-play');
    audio.pause();
}


playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1; 
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0; 
    }
    loadSong(songs[songIndex]);
    playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


audio.addEventListener('ended', nextSong);


audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;

     
        let currentMin = Math.floor(audio.currentTime / 60);
        let currentSec = Math.floor(audio.currentTime % 60);
        if (currentSec < 10) currentSec = "0" + currentSec;
        currTimeDisplay.innerText = `${currentMin}:${currentSec}`;
    }
});


progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

 
audio.addEventListener('loadedmetadata', () => {
    let totalMin = Math.floor(audio.duration / 60);
    let totalSec = Math.floor(audio.duration % 60);
    if (totalSec < 10) totalSec = "0" + totalSec;
    totTimeDisplay.innerText = `${totalMin}:${totalSec}`;
});


volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
});