
var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];
var flag=0;

$(document).keypress(function(event){

  if(started==false)
  {
    nextSequence();
    started=true;
  }

});

// var currentLevel = 0;

$(".btn").click(function ()
{
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkPattern(userClickedPattern.length - 1);
});

function checkPattern(cLevel)
{
      if(userClickedPattern[cLevel]==gamePattern[cLevel])
      {

        if(userClickedPattern.length==gamePattern.length)
        {
          setTimeout(function(){nextSequence();},1000);
        }
      }
      else{
        gameOver();

        startOver();
      }
}

function gameOver()
{
   $("body").addClass("game-over");
   playSound("wrong");
   $("h1").html("Game Over, Press Any Key to Restart ");

   setTimeout(function(){
     $("body").removeClass("game-over");
   },1000);
   flag=1;
}


function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");

    setTimeout(function (){
       $("#"+currentColour).removeClass("pressed");
    },100);
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").html("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name)
{
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function startOver()
{
    level=0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
