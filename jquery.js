/**
 * Created by Bri on 2/28/2017.
 */
var first_card_clicked  = null;
var second_card_clicked=null;
var total_possible_matches = 9; //change to 9
var match_counter = 0;

$(document).ready(initializeGame);

function initializeGame(){
    $('.back').click(handleClick);
    console.log("im checking to see if im initialized and calling handleClick");
}

function handleClick(){
    cardClick(this);
    console.log("this clicked div sets the element to 'this', gets printed after cC runs");
}

function cardClick(card_back){
    flipCard(card_back);
    if (first_card_clicked===null){
        first_card_clicked = card_back;
        console.log("first card clicked is null, value now set!");
    } else{
        second_card_clicked = card_back;
        console.log("second card is clicked and value is set!");
        var first_card = $(first_card_clicked).parent().find('.front').css("background-image");       //changed first_card_clicked
        var second_card = $(second_card_clicked).parent().find('.front').css("background-image"); //second_card_clicked
        if (first_card===second_card){  //first_c_c === sec_c_c
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            console.log("these cards match...");
            if (match_counter === total_possible_matches){
                alert("Congratulations! You Win!");
            }
        } else {
            // setTimeout(returnCard,0);
           // returnCard(first_card_clicked,second_card_clicked);
            // returnCard(second_card_clicked);
            // first_card_clicked = null;
            // second_card_clicked = null;
            // var reset_first = first_card_clicked.slice(0,first_card_clicked.length);
            // var reset_second = second_card_clicked.slice(0, second_card_clicked.length);
            setTimeout(function(){
                $(first_card_clicked).removeClass("flipped");
                $(second_card_clicked).removeClass("flipped");
                // if ($('div').hasClass('flipped')){
                //     $('div').removeClass('flipped');
                // }
                first_card_clicked=null;
                second_card_clicked=null;
            }, 2000);
            console.log("no match");
        }
    }
}
//this would add a class to this div that was set to this...and that class would tell it to display:none , so the front card img shows now
function flipCard(card_back){
    $(card_back).addClass('flipped');
}
// setTimeout(function(){
//     returnCard();
// }, 2000);
// function returnCard(card_back){
//     function returnCard(first,second){
//         $(this).removeClass("flipped");
//         $(this).removeClass("flipped");
//         first_card_clicked=null;
//         second_card_clicked=null;
//         console.log("removed");
//     // $(this).removeClass('flipped');  //thi
// }



