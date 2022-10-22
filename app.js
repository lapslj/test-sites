const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let firstCard = ""
let secondCard = ""
let firstClass = ""
let secondClass = ""
let score = 0
let matches = 0
let scoreboard = document.querySelector("#scoreboard")
let oldman = document.querySelector(".hidden")

function noThird(e){
  console.log("no third card!");
  e.preventDefault();
}

function youStink(){
  alert("5 tries!! you yourself admit it yourself that you stink");
}

function youWin(){
  alert("oh nice!");
}

function secondCardClick(event){
  //do all the same shit
  let clickCard2 = event.target.className;
  console.log(`you're clicking a second ${clickCard2} card`);
  secondCard = event.target;
  secondClass = event.target.className;
  if(firstCard === secondCard){}else{
    score ++;
    let setCards = document.querySelectorAll("div");  
    for(let i = 1; i <= 10; i++){
      setCards[i].removeEventListener("click",secondCardClick)
    }
    document.addEventListener("click",noThird);
    //change that card's color to clickedClass
    secondCard.style.backgroundColor = secondClass;
    //turn off the listener on all other cards
    //see if this matches the first card, if so, keep me up and return true
    console.log(`does ${firstClass} match ${secondClass}?`)
    scoreboard.innerText = score;

    if(firstClass === secondClass){
      for(let i = 1; i <= 10; i++){
        setCards[i].addEventListener("click",handleCardClick)
      }
      matches ++;
      console.log(`${matches} matches`)
      if (matches === 5){
        setTimeout(youWin,10);
        setTimeout(oldman.classList.toggle("hidden"),5);
      }
    }else{
      setTimeout(function(){
        firstCard.style.backgroundColor = "white";
        secondCard.style.backgroundColor = "white";
        firstCard = ""
        secondCard = ""
        firstClass = ""
        secondClass = ""
        for(let i = 1; i <= 10; i++){
          setCards[i].addEventListener("click",handleCardClick)
        }
        if(score === 5){youStink();
        }
      },1000)  
    }
  }
}

function handleCardClick(event) {
  // set clickedClass to the background color for card 1
  let clickedClass = event.target.className;
  console.log(`you clicked a first ${clickedClass} card`);
  firstCard = event.target;
  firstCard.style.backgroundColor = clickedClass;
  firstClass = clickedClass;
  //add Second Click function
  let allCards = document.querySelectorAll("div");
  for(let i = 1; i <= 10; i++){
    allCards[i].removeEventListener("click",handleCardClick)
  }
  for(let i = 1; i <= 10; i++){
    allCards[i].addEventListener("click",secondCardClick)
  }
  //after 1000 ms, remove docwide listener and switch back
}

//when two cards are clicked that match, hold them

// when the DOM loads
createDivsForColors(shuffledColors);
