var buttonColors = ["red", "blue", "yellow", "green"];
var givenPattern = [];
var userPattern = [];
var level = 0;
let gameStarted = false;
let playing = true;

$(document).keydown(function(event){
    if(!gameStarted){
        startGame();
    }
})

function startGame(){
    if(!gameStarted){
        level++;
    }
    gameStarted = true;
    $("h1").text("Level " + level);
    nextSequence();
}


$(".btn").on("click",function(){
    var divThis = this;
    $("#" + divThis.id).addClass("pressed");
    //要注意this不能直接传进下面这个function里
    setTimeout(function(){
        $("#" + divThis.id).removeClass("pressed");
    },100);
    sounds(divThis.id);
    userPattern.push(buttonColors.indexOf(divThis.id));
    checkAnswer(userPattern.length - 1);
})

function checkAnswer(currentLevel){
        if(userPattern[currentLevel]  === givenPattern[currentLevel]){
            if(userPattern.length === givenPattern.length){
                nextSequence();
            }
        }else{
            gameOver();
        }
}

function gameOver(){
    $("h1").text("Game over, Press Any Key to Restart");
    var crash = new Audio("./sounds/wrong.mp3");
    crash.play();
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    },200);
    startOver();
}

function startOver(){
    gameStarted = false;
    level = 0;
    givenPattern = [];
}

//generate random number between 0-3
function nextSequence(){
    setTimeout(function(){
    $("h1").text("Level " + level);
    level++;
    userPattern = [];
    var outputNumber = Math.floor(4*(Math.random()))
    var colorOutput = buttonColors[outputNumber];
    $("#" + colorOutput).fadeOut(100).fadeIn(100);
    sounds(colorOutput);
    givenPattern.push(outputNumber);
    }, 1000)
}

function sounds(key){
    switch(key){
        case "red":
            var crash = new Audio("./sounds/red.mp3");
            crash.play();
        break;
        case "yellow":
            var crash = new Audio("./sounds/yellow.mp3");
            crash.play();
        break;
        case "blue":
            var crash = new Audio("./sounds/blue.mp3");
            crash.play();
        break;
        case "green":
            var crash = new Audio("./sounds/green.mp3");
            crash.play();
        break;
    }
}