// Global Variables here///////
var MatchGame = {};          //
var matchCounter = 0;        //
var loadTime = new Date();
const wordsObject = { blanco: "white",
                      white: "blanco",
                      rojo: "red",
                      red: "rojo",
                      naranja: "orange",
                      orange: "naranja",
                      verde: "green",
                      green: "verde",
                      azul: "blue",
                      blue: "azul",
                      purple: "morado",
                      morado: "purple",
                      violeta: "violet",
                      violet: "violeta",
                      yellow: "amarillo",
                      amarillo: "yellow" };

//////////////////////////////

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(),$('div.cardsContainer'));
  setInterval(function() {
    generateTimes($('div#timerBox'))},1000);
  $('div.card').click(function() { flipCard($(this),$('div.cardsContainer'))});

});

// Generate a random integer between two integers, inclusive

 function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
 };

 /*
   Generates and returns an array of matching card values.
  */

MatchGame.generateCardValues = function() {

  var wordsArray = ["blanco","white",
                    "rojo","red",
                    "naranja","orange",
                    "amarillo","yellow",
                    "verde","green",
                    "azul","blue",
                    "purple","morado",
                    "violeta","violet"];
  let randomWords = [];
  while (wordsArray.length > 0) {
    let randomNumber = Math.floor(Math.random()*wordsArray.length);
    randomWords.push(wordsArray[randomNumber]);
    wordsArray.splice(randomNumber, 1);
  };
  return randomWords;
};

renderCards = function() {

}

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
    $game.empty();
    $game.data('flippedCards',[]);
    var cardColors = ["hsl(25,85%,65%)","hsl(55,85%,65%)","hsl(90,85%,65%)",
    "hsl(160,85%,65%)","hsl(220,85%,65%)","hsl(265,85%,65%)","hsl(310,85%,65%)",
    "hsl(360,85%,65%)"];
    for (var i = 0; i<cardValues.length; i++) {
      var $card = $('<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 card"></div>');
      $card.data('value',cardValues[i]);
      $card.data('flipped',false);
      $card.data('color', cardColors[Number(cardValues[i]-1)]);
      $card.data('id', i)
      $game.append($card);
//      $('div.card').click(function() { flipCard($(this),$('div.cardsContainer'))});
  };
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

 flipCard = function($card, $game) {
    if ($card.data('flipped')==true) {
        return;
      } else {
        $card.css('background-color', $card.data('color'));
        $card.text($card.data('value'));
        $card.data('flipped',true);
        $game.data('flippedCards').push($card);
        console.log("flippedCards array: "+$game.data('flippedCards')[0].data('value'));
        console.log($game.data('flippedCards'));
        if ($game.data('flippedCards').length == 2) {
          let firstFlippedCardValue = $game.data('flippedCards')[0].data('value');
          let secondFlippedCardValue = $game.data('flippedCards')[1].data('value');
          if (wordsObject[firstFlippedCardValue] === secondFlippedCardValue) {
              console.log("flippedCards array: "+$game.data('flippedCards')[0]);
              console.log("flippedCards array: "+$game.data('flippedCards')[1]);
              console.log($game.data('flippedCards').length);
              $game.data('flippedCards')[0].css("background-color","rgb(153,153,154)");
              $game.data('flippedCards')[0].css("color", "rgb(204,204,204)");
              $game.data('flippedCards')[0].css("border", "4px solid #ffffff");
              $game.data('flippedCards')[1].css("background-color","rgb(153,153,154)");
              $game.data('flippedCards')[1].css("color", "rgb(204,204,204)");
              $game.data('flippedCards')[1].css("border", "4px solid #ffffff");
              $game.data('flippedCards',[]);
              matchCounter = matchCounter + 1;
              if (matchCounter == 8) {
                setTimeout(function() {
                  $("#victoryBox").show();
                  $("#game").css("visibility", "hidden")}, 350);
              };
            } else {
              setTimeout(function() {
                console.log("flippedCards array: "+toString($game.data('flippedCards')[1]));
                $game.data('flippedCards')[0].data('flipped', false);
                $game.data('flippedCards')[0].css("background-color", "rgb(35,64,86)");
                $game.data('flippedCards')[0].text("");
                $game.data('flippedCards')[1].data('flipped', false);
                $game.data('flippedCards')[1].css("background-color", "rgb(35,64,86)");
                $game.data('flippedCards')[1].text("");
                $game.data('flippedCards',[]);
              }, 350);
            };
          };
        };
      };

//  Generate values for seconds and minutes that appear as if they were on a digital clock display

generateDisplayTime = function(number) {
  if (number < 10) {
    return "0"+number;
  } else {
    return number;
  };
};

generateTimes = function(element) {
var currentTime = new Date();
var totalSeconds = (currentTime - loadTime)/1000;
var minutes = Math.floor(totalSeconds/60);
totalSeconds = totalSeconds % 60;
var seconds = Math.floor(totalSeconds);

minutes = generateDisplayTime(minutes);
seconds = generateDisplayTime(seconds);

element.text(minutes+":"+seconds);
};
