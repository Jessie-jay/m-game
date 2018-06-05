var cardDeck = document.getElementById("card-deck");
var openCards = [];

let starsList = document.querySelectorAll(".stars li");
var stars = document.querySelectorAll(".fa fa-star");

let moves = 0;
let counter = document.querySelector(".moves");
let timer = document.querySelector(".timer");

let card = document.getElementsByClassName("card");
let cards = [...card]

// var test = ["Joshua", "Jaycintha"];
// function testfn(param1, param2){
//     console.log(param1 + " " + param2);
// }
//  testfn(...test);

var arrayOfCards = [...cards];
console.log(arrayOfCards);

var matchedCardList = [];
var modal = document.getElementById("popup1");

function shuffle(inputArray) {
    for (var currentIndex = 0; currentIndex < inputArray.length; currentIndex++) {
        var temporaryValue = inputArray[currentIndex];
        var randomIndex = Math.floor(Math.random() * currentIndex);
        inputArray[currentIndex] = inputArray[randomIndex];
        inputArray[randomIndex] = temporaryValue;
    }
    return inputArray;
}

function startGame(){
    cardDeck.innerHTML = " ";
    arrayOfCards = shuffle(arrayOfCards);
    for (var i = 0; i < arrayOfCards.length; i++) {
        cardDeck.appendChild(arrayOfCards[i]);
        arrayOfCards[i].addEventListener("click", displayCard);
        arrayOfCards[i].addEventListener("click", cardOpen);
        //arrayOfCards[i].addEventListener("click", matchedCards)
        //call back functions
        arrayOfCards[i].classList.remove("open");
        arrayOfCards[i].classList.remove("show");
        arrayOfCards[i].classList.remove("match");
        arrayOfCards[i].classList.remove("disabled");
    }
        // reset moves
    moves = 0;
    counter.innerHTML = moves;
    
    
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    
    }


document.body.onload = startGame;
// document.getElementById("paly-again") = playAgain;

function displayCard() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}


function cardOpen() {
    openCards.push(this);
    if (openCards.length == 2) {
        moveCounter();
            if (openCards[0].type == openCards[1].type) {
            matchedCards(...openCards);
            openCards =[];
               
        } else {
            unmatchedCards(...openCards);
            openCards =[];
        }
    }
}


function moveCounter(){    
    moves++;    
    counter.innerHTML = moves;
    // start timer
    if(moves == 1){
        seconds = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    
}

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);

}

function matchedCards(firstCard, secondCard) {
    firstCard.classList.add("match", "disabled");
    secondCard.classList.add("match", "disabled");
    firstCard.classList.remove("open", "show");
    secondCard.classList.remove("open", "show");
    matchedCardList.push(firstCard, secondCard);
    openCards = [];
    congrats(); 
    
}

function unmatchedCards(firstCard, secondCard) {
    firstCard.classList.add("unmatched", "open", "show");
    secondCard.classList.add("unmatched", "open", "show");
    disabled();
    setTimeout(function () {
        firstCard.classList.remove("unmatched", "open", "show", "disabled");
        secondCard.classList.remove("unmatched", "open", "show", "disabled");
        enabled();
        openCards = [];
    }, 1000);
    
}



function disabled() {
    arrayOfCards.forEach(function (card) {
        card.classList.add("disabled");
    });
};

function enabled() {
    arrayOfCards.forEach(function (card) {
        card.classList.remove("disabled");
    });
    matchedCardList.forEach(function (card) {
        card.classList.add('disabled')
    })
};

// function testCallbackFn(name, callback){
//   callback(name);
//   }
//   testCallbackFn("Repository", function(something){
//   console.log(something);
//   })



function congrats() {
    if (matchedCardList.length == arrayOfCards.length) {
        modal.classList.add("show");

        closeModal();
        
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("totalTime").innerHTML = timer;
        clearInterval(interval);
    }

}

function closeCongrats() {
    modal.classList.remove("show");
    // declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    startGame();
}

function playAgain(){
    modal.classList.remove("show");
    startGame();
    
}

function closeModal(){
    closeicon.addEventListener("click", function(){
        modal.classList.remove("show");
        startGame();
    });
}

let closeicon = document.querySelector(".close");




