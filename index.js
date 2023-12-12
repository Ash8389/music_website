var songIndex = -1;
var playSong = new Audio('songs/1.mp3');
var playMaster = document.getElementById('playMaster');
var gif = document.getElementById('gif');
var progressBar = document.getElementById('range');
var forward = document.getElementById('forward');
var backward = document.getElementById('backward');
var masterSongName = document.getElementById('masterSongName');
var songItem = Array.from(document.getElementsByClassName('songListItem'));

var icon = document.getElementById('icons');

var songList = [
    {songName:"Iktara", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName:"Prem Ki Naiya", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"Kya Hua Tera Wada", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName:"Tu Jane Na", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"Aap Ka Aana Dil Dhadkana", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName:"Main Parwaana", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
]

songItem.forEach((element, i)=>{
    document.getElementsByClassName('coverimg')[i].src = songList[i].coverPath;
    document.getElementsByClassName('songName')[i].innerHTML = songList[i].songName;
})

const playForwadBackward = ()=>{
    gif.style.opacity = "1";
    playMaster.src = "circle-pause-regular.svg";
    playSong.src = songList[songIndex].filePath;
    makeplay1play();
    document.getElementById(songIndex+1).src = "circle-pause-regular.svg";
    masterSongName.innerText = songList[songIndex].songName;
    playSong.play();
}
//change song
forward.addEventListener('click', ()=>{
    if(songIndex>=5)
    {
        songIndex = 0;
    }
    else{
        songIndex++;
    }
    playForwadBackward();
})

backward.addEventListener('click', ()=>{
    if(songIndex<=0)
    {
        songIndex = 5;
    }
    else{
        songIndex--;
    }
    playForwadBackward();
})

//Play and Pause
playMaster.addEventListener('click', ()=>{
    if(playSong.paused || playSong.currentTime<=0)
    {   
        playSong.play();
        gif.style.opacity = "1";
        playMaster.src = "circle-pause-regular.svg";
        if(songIndex<0)
        {
            document.getElementById(songIndex+2).src = "circle-pause-regular.svg";
            masterSongName.innerText = songList[songIndex].songName;     
        }
        else
        {
            masterSongName.innerText = songList[songIndex].songName;     
            document.getElementById(songIndex+1).src = "circle-pause-regular.svg";
        }
    }
    else
    {
        playSong.pause();
        makeplay1play();
        gif.style.opacity = "0";
        playMaster.src = "circle-play-regular.svg";
    }
})

//Rangeset
playSong.addEventListener('timeupdate', ()=>{
    progress = parseInt((playSong.currentTime/playSong.duration)*100)
    progressBar.value = progress;
})

//Auto Play Next Song
playSong.addEventListener('ended',()=>{
    if(songIndex>=5)
    {
        songIndex = -1;
    }
    songIndex++;
    playForwadBackward();
})

progressBar.addEventListener('change', ()=>{
    playSong.currentTime = ((progressBar.value*playSong.duration)/100)
})

const makeplay1play = ()=>{
    Array.from(document.getElementsByClassName('play1')).forEach((e)=>{
        e.src = "circle-play-regular.svg"
        playSong.pause();
    })
}

//For each song button
Array.from(document.getElementsByClassName('play1')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        songIndex = (e.target.id)-1;
        if(e.target.src.endsWith("circle-play-regular.svg")){
            makeplay1play();
            e.target.src="circle-pause-regular.svg";
            playMaster.src = "circle-pause-regular.svg";
            playSong.src = songList[songIndex].filePath;
            gif.style.opacity = "1";
            masterSongName.innerText = songList[songIndex].songName;
            playSong.play();
        }
        else if(e.target.src.endsWith("circle-pause-regular.svg"))
        {
            e.target.src="circle-play-regular.svg";
            playMaster.src = "circle-play-regular.svg";
            gif.style.opacity = "0";
            playSong.pause();
        }
    })
});