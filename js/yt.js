/*
 YouTube Audio Embed
 --------------------

 Author: Amit Agarwal
 Web: http://www.labnol.org/?p=26740
*/

let player;
let playerControlImg;

function setPlayerControlImg(play) {
    var a = play ? "IDzX9gL.png" : "quyUPXN.png";
    if (playerControlImg) {
        playerControlImg.setAttribute("src", "https://i.imgur.com/" + a);
    }
}

function onYouTubeIframeAPIReady() {
    console.log("iframe");

    var e = document.getElementById("youtube-audio"), t = document.createElement("img");

    playerControlImg = t;

    t.setAttribute("id", "youtube-icon");
    t.style.cssText = "cursor:pointer;cursor:hand";
    e.appendChild(t);

    var a = document.createElement("div");
    a.setAttribute("id", "youtube-player");
    e.appendChild(a);

    e.onclick = function () {
        let state =  player.getPlayerState();
        let playing = state  === YT.PlayerState.PLAYING || state === YT.PlayerState.BUFFERING;

        if (playing) {
            stopVideo();
        } else {
           startVideo();
        }
    };
    player = new YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: e.dataset.video,
        playerVars: {autoplay: e.dataset.autoplay, loop: e.dataset.loop},
        events: {
            onReady: function (e) {
                player.setPlaybackQuality("small");
                setPlayerControlImg(player.getPlayerState() !== YT.PlayerState.CUED);

            }, onStateChange: function (e) {
                e.data === YT.PlayerState.ENDED && setPlayerControlImg(!1);
            }
        }
    });

    console.log("iframe ok");
}

function startVideo() {
    if (player !== undefined) {
        player.playVideo();
        setPlayerControlImg(true);
    }
}

function stopVideo() {
    if (player !== undefined) {
        player.stopVideo();
        setPlayerControlImg(false);
    }
}

function setVideo(videoId, startTime=0) {
    console.log("set iframe video id: " + videoId + " startTime: " + startTime);
    if (player !== undefined && player.loadVideoById !== undefined) {
        player.videoId = videoId;
        player.loadVideoById(videoId, startTime, 'small');
        startVideo();

        if (startTime > 0) {
            console.log("seek to " + startTime)
            player.seekTo(startTime);
        }
    }
}
