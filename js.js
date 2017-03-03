/**
 * Created by Bri on 2/28/2017.
 */

var firstCardClicked=null;
var secondCardClicked=null;
$(document).ready(initializeGame);

function initializeGame(){
    initializeClickHandlers();
}
function initializeClickHandlers(){
    $('.back').click(handleClick);
}

function handleClick(){
    cardClick(this);
}
function cardClick(cardBack){
    flipCard(cardBack)
    if (firstCardClicked===null){
        console.log("first card flip");
        firstCardClicked=cardBack;
    } else {
        console.log("second card flip");
        secondCardClicked=cardBack;
        var firstCardClicked=$(firstCardClicked).parent().find('.front').css
        var secondCardClicked=$(secondCardClicked).parent().find('front').css

        if (firstCardClicked===secondCardClicked) {
            console.log("match");
        } else{
            console.log("no match"); //flip card back with time otherwise it is instant
            setTimeout(flipCardsBack, 2000);
            unflipCard(firstCardClicked);
            unflipCard(firstCardClicked);
        }
    }
}
setTimeout()

function flipCard(cardBack){
    $(cardBack).addClass('flipped');
}
