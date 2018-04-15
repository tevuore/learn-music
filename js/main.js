
console.log("entry: " + entries[0]);

let currentItem = 0;
let time = 0;

function initializeApp() {
    // initialization
    $('#next-button').hide();
    $('.answer').hide();

    $( '.widget input[type=submit], .widget a, .widget button' ).button();
    $( '#show-answer-button' ).click( function( event ) {
        showAnswerButtonClicked();
    } );

    $( '#next-button' ).click( function( event ) {
        nextButtonClicked();
    } );

    shuffle(entries);

    // set first
    setItem(entries[0]);
    console.log("init ok");

    $( '#time').text(time +  " seconds");

    scheduleTime();
}

function scheduleTime() {
    setTimeout(() => {
        time++;
        $( '#time').text(time);
        scheduleTime();
    }, 1000);
}

function showAnswerButtonClicked() {
    console.log("show answer button clicked");

    event.preventDefault();
    $('.answer').show();
    $('#show-answer-button').hide();
    $('#next-button').show();
}

function nextButtonClicked() {
    console.log("next button clicked");

    event.preventDefault();
    $('.answer').hide();
    $('#show-answer-button').show();
    $('#next-button').hide();

    stopVideo();
    nextItem();
}

function nextItem() {
    console.log("nextItem() called");

    currentItem++;
    if (currentItem === entries.length) {
        shuffle(entries);
        currentItem = 0;
    }

    time = 0;
    setItem(entries[currentItem]);
}


function setItem(item) {
    console.log(`Taking '${item.internalName}' into use`);

    setVideo(item.videoId, item.startTime);

    // this just for default and later for reference
    $('#youtube-audio').attr('data-video', item.videoId);

    $('#sample-index-text').text(item.index);

    $('#music-style-text').text(item.style);
    $('#music-type-text').text(item.type);
    $('#music-instruments-text').text(item.instruments);
    $('#music-composer-text').text(item.composer);
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
