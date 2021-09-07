let gamePattern=[];
let userClikedPattern=[];
let buttonColors =["green","red","yellow","blue"];
let started=false;
let level=0;
let index=0;

function nextSequence()
{
    let randomNumber;
    randomNumber=Math.random()*4;
    userClikedPattern=[];
    randomNumber=Math.floor(randomNumber);
    let randomChosenColor;
    randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    $("h1").text("Level "+level);
    level++;
    index=0;
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClikedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClikedPattern.length-1);
    index++;
});

function playSound(key)
{
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}

function animatePress(key)
{ 
    $("#"+key).addClass("pressed");
    setTimeout(function(){ $("#"+key).removeClass("pressed"); }, 100);
    
}



$(document).keypress(function(){
     if(started==false)
     {
         started=true;
         nextSequence();
     }
});

function checkAnswer(currentLevel)
{
     if(userClikedPattern[currentLevel]==gamePattern[currentLevel])
     {
        if(userClikedPattern.length==gamePattern.length)
        {
            setTimeout(nextSequence, 1000);
        }
     }
     else
     {
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        let aud=new Audio("sounds/wrong.mp3");
        aud.play();
        $("h1").text("Game Over,Press any key to restart");
        startOver();
     }
}

function startOver()
{
     level=0;
     gamePattern=[];
     started=false;
}