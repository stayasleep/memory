/**
 * Created by Bri on 2/28/2017.
 */
//v0.5 global variables
var first_card_clicked  = null;
var second_card_clicked=null;
var total_possible_matches = 9;
var match_counter=0;
//v1.0 global variables
var attempts=0;
var accuracy=0;
var games_played=0;

// $(document).ready(initializeGame);
$(document).ready(function(){
    $('.back').click(handleClick);
    // games_played++;
    $('.reset').click(resetAll);
});
function resetAll(){
    resetStats();
    // games_played++;
}
// function initializeGame(){
//     $('.back').click(handleClick);
//     games_played=1;
//     // $('.reset').click(resetStats);
//     console.log("this should log out first");
// }
function handleClick(){
    cardClick(this);
    displayStats();
    console.log("handleclick will log out after the cardClick function");
}
// function resetAll(){
//     resetStats;
// }
//Display updated statistics for current game
function displayStats(){
        var element = document.querySelector(".attempts .value");
        element.innerHTML=attempts;
        var accurate = document.querySelector(".accuracy .value");
        accurate.innerHTML=accuracy;
        var played = document.querySelector(".games-played .value");
        played.innerHTML=games_played;
};
function cardClick(card_back){
    flipCard(card_back);
    if (first_card_clicked===null){
        first_card_clicked = card_back;
        console.log("value of first card clicked is no longer null");
    } else{
        second_card_clicked = card_back;
        attempts+=1;
        accuracy = match_counter/attempts;
        console.log(attempts);
        console.log("value of second card clicked is no longer null");
        var first_card = $(first_card_clicked).parent().find('.front').css("background-image");       //changed first_card_clicked
        var second_card = $(second_card_clicked).parent().find('.front').css("background-image"); //second_card_clicked
        if (first_card===second_card){  //first_c_c === sec_c_c
            match_counter++;
            accuracy = match_counter/attempts;
            first_card_clicked = null;
            second_card_clicked = null;
            console.log("these cards match...");
            if (match_counter === total_possible_matches){
                alert("Congratulations! You Win!");
            }
        } else {
            setTimeout(function(){
                $(first_card_clicked).removeClass("flipped");
                $(second_card_clicked).removeClass("flipped");
                first_card_clicked=null;
                second_card_clicked=null;
            }, 2000);
            console.log("no match");
        }
    }
}
function flipCard(card_back){
    $(card_back).addClass('flipped');
}

function resetStats(){
    accuracy = 0;
    attempts = 0;
    match_counter = 0;
    games_played++;
    // games_played+=1;
    displayStats();
};
//to work on for later
//collects node list and stores it into an empty array,
// storeCards();
// var array_cards=[];
// var card_collect=document.getElementsByClassName("front");
// function storeCards(){
//     for (var i=0; i<card_collect.length;i++){
//         var temp=card_collect[i];
//         console.log(temp);
//         array_cards.push(temp);
//     }
//     randomArray();
// };
// //takes in the array, randomly selects an index and adds it into a new array, then removes it from orig array
// var return_cards=[];
// function randomArray(){
//     for (var i=0;i<array_cards.length;){
//         var x = Math.floor(Math.random()*array_cards.length);
//         return_cards.push(array_cards[x]);
//         array_cards.splice(x,1);
//         console.log(return_cards);
//     }
// };
// removeReplaceAdd();
// //remove (or try replace method?) old node, add it on to the class back...but now it overlays on the cars back-_-
// function removeReplaceAdd(){
//     var x = document.getElementsByClassName('back'); //should be 18 elements
//     while (card_collect.length>0){
//         card_collect[0].parentNode.removeChild(card_collect[0]);
//     }
//     for(var i=0;i<return_cards.length;i++){
//         x[i].parentNode.appendChild(return_cards[i]); //appends the card front to the parent node of class back
//     }
// };