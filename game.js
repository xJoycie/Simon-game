var userClickedPattern = []; //lege array waar de op geklikte kleuren in gepushed worden

var buttonColours = ["red", "blue", "green", "yellow"]; //array waar de kleuren zijn opgeslagen

var gamePattern = []; //lege array waar de random gekozen kleuren in gepushed worden

var level = 0; //level begint bij 0

var started = false; //de game is nog niet gestart op level 0

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id"); //variable waar de attribute "id" wordt geselecteerd
    userClickedPattern.push(userChosenColour); //variable wordt gepushed naar userClickedPattern

    playSound(userChosenColour); //uitvoer van de playSound functie hieronder
    animatePress(userChosenColour); //uitvoer van de animatePress functie hieronder
    checkAnswer(userClickedPattern.length-1); //kijkt naar de array met antwoorden of je goed klikt
})

$(document).keydown(function () { //start de game door een keypress
    if (!started) { //als de game gestart is
        $("#level-title").text("Level " + level); //veranderd de tekst naar level 0 na een keypress
        nextSequence(); //called de functie nextSequence
        started = true; //start is true
    }

})

function checkAnswer(currentLevel) { //functie om de antwoorden te checken
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //checkt tegen elkaar
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() { //1 seconde wachttijd tot next level
                nextSequence();
            }, 1000);
        }
        
    } else { //wat te doen bij een fout antwoord
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key To Restart");

        startOver();
    }
}

function nextSequence() { //functie waar er een random nummer gekozen wordt die corronspondeert
    //met een van de 4 kleuren uit de buttonColours array en daarna in de gamePattern wordt gepushed.

    userClickedPattern = []; //maakt de array leeg voor het volgende level

    level++; //laat de levels omhoog gaan
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); //nummer tussen 0-3 wordt gecreeërd
    var randomChosenColour = buttonColours[randomNumber]; //randomNumber kiest de kleur
    gamePattern.push(randomChosenColour); //random gekozen kleur wordt in gamePattern gepushed


    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //animatie van flash

    playSound(randomChosenColour); //uitvoer van de playSound functie hieronder
}

function playSound(nameColour) { //functie om gelud te spelen
    var audio = new Audio("sounds/" + nameColour + ".mp3"); //gebruikt nameColour voor input
    audio.play();
}

function animatePress(currentColour) { //functie om animatie af te spelen

    $("#" + currentColour).addClass("pressed"); //selecteer de kleur en voeg de class toe

    setTimeout(function () { //functie om 100 miliseconden vertraging toe te passen
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() { //functie om alles te resetten
    level = 0;
    gamePattern = [];
    started = false;
}





