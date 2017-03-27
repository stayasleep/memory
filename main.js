//collect all parent card class divs which will hold our card front and back
var get_card_class = document.getElementsByClassName('card');  //consider changing name to card_array
var card_class_mixer=[]; //puts the 18 classes into an array
var random_class=[];     //18 classes and randomly returned
//v0.5 global variables
var first_card_clicked  = null;
var second_card_clicked=null;
var total_possible_matches = 9;
var match_counter=0;
//v1.0 global variables
var attempts=0;
var accuracy=0;
var games_played=0;
//Once document is ready...
$(document).ready(initializeGame);
//Randomly generate the div position, attach click handlers and display stats
function initializeGame() {
    createAddRandomDivs();
    $('.back').click(handleClick);
    games_played=1;
    $('.reset').click(resetGame);
};
//Take the node list of classes, push them into a new array randomly and then assign each a child with css prop attached
function createAddRandomDivs(){
    for (var j=0; j<get_card_class.length;j++){
        var temp=get_card_class[j];
        console.log(temp);
        card_class_mixer.push(temp);
    }
    for (var d=0;d<card_class_mixer.length;){
        var x = Math.floor(Math.random()*card_class_mixer.length);
        random_class.push(card_class_mixer[x]);
        card_class_mixer.splice(x,1);
        console.log(random_class);
    }
    for (var i=0;i<random_class.length;i++){ //two loops length/2
        if (i<9){
            var front_div=document.createElement("DIV");
            front_div.className="front";
            front_div.style.backgroundImage = "url('image/card_"+i+".png')";
            var back_div = document.createElement("DIV");
            back_div.className="back";
            back_div.style.backgroundImage = "url('image/card_back.jpg')";
            random_class[i].appendChild(front_div);
            random_class[i].appendChild(back_div);
        } else {
            var z = i - 9;
            var front_div=document.createElement("DIV");
            front_div.className='front';
            front_div.style.backgroundImage="url('image/card_"+z+".png')";
            var back_div = document.createElement("DIV");
            back_div.className="back";
            back_div.style.backgroundImage = "url('image/card_back.jpg')";
            random_class[i].appendChild(front_div);
            random_class[i].appendChild(back_div);
        }
    }
};
//Once you start clicking the board, the display stats should occur automatically
function handleClick(){
    cardClick(this);
    displayStats();
    console.log("handleclick will log out after the cardClick function");
}
//grabs value of current stat and places the html inside the corresponding variable, occurs with each click
function displayStats(){
    var element = document.querySelector(".attempts .value");
    element.innerHTML=attempts;
    var accurate = document.querySelector(".accuracy .value");
    accurate.innerHTML=Math.round(accuracy*100)+"%";
    var played = document.querySelector(".games-played .value");
    played.innerHTML=games_played;
};

//Do this for each click
function cardClick(card_back){
    flipCard(card_back);
    if (first_card_clicked===null){
        first_card_clicked = card_back;
        console.log("value of first card clicked is no longer null");
    } else{
        second_card_clicked = card_back;
        attempts+=1;
        accuracy =match_counter/attempts;
        console.log(attempts);
        console.log("value of second card clicked is no longer null");
        var first_card = $(first_card_clicked).parent().find('.front').css("background-image");       //changed first_card_clicked
        var second_card = $(second_card_clicked).parent().find('.front').css("background-image"); //second_card_clicked
        if (first_card===second_card){  //first_c_c === sec_c_c
            match_counter++;
            accuracy = match_counter/attempts;
            $(first_card_clicked).fadeOut();
            $(second_card_clicked).fadeOut();
            first_card_clicked = null;
            second_card_clicked = null;
            console.log("these cards match...");
            if (match_counter === total_possible_matches){
                alert("Congratulations! You Win!");
            }
        } else {
            $('.back').off("click");
            setTimeout(function(){
                $(first_card_clicked).removeClass("flipped");
                $(second_card_clicked).removeClass("flipped");
                first_card_clicked=null;
                second_card_clicked=null;
                $('.back').on("click",handleClick);
            }, 2000);
            console.log("no match");
        }
    }
}
//When clicked, 'flip' the card back over to reveal what's underneath
function flipCard(card_back){
    $(card_back).addClass('flipped');
}
//Reset the board
function resetStats(){
    accuracy = 0;
    attempts = 0;
    match_counter = 0;
    games_played++;
    displayStats();
    card_class_mixer=[];
    random_class=[]
    removeOldDivs();
};
//things to happen for each game...reset stats (and board), apply dom elements, attach click
function resetGame(){
    resetStats();
    createAddRandomDivs();
    $('.back').click(handleClick);
}
function removeOldDivs() {
    var x = document.getElementsByClassName('front');
    var y = document.getElementsByClassName('back');
    for (var i = 0; i < get_card_class.length; i++) {
        get_card_class[i].removeChild(x[0]);
        get_card_class[i].removeChild(y[0]);
    }
}
var startTime = Date.now();
var interval = setInterval(function() {
    var elapsedTime = Date.now() - startTime;
    document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(2);
}, 100);

timeDifference();
