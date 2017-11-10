generateCardValues = function() {

  var wordsArray = ["blanco","white",
                    "rojo","red",
                    "naranja","orange",
                    "amarillo","yellow",
                    "verde","green",
                    "azul","blue",
                    "índigo","ingigo",
                    "violeta","violet"];
  let randomWords = [];
  for (i in wordsArray) {
    let randomNumber = Math.floor(Math.random()*wordsArray.length-1);
    randomWords.push(randomNumber);
  };
  return randomWords;
};

renderCards = function() {

}
